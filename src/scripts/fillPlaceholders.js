/*
  Fills known [ACTIVITY:...] placeholders with substantive, branded activities.
  Run: node src/scripts/fillPlaceholders.js
*/
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(process.cwd(), 'src', 'data', 'modules');
const photoManifestPath = path.join(process.cwd(), 'src', 'data', 'media', 'photoManifest.json');

function loadPhotos() {
  try {
    const manifest = JSON.parse(fs.readFileSync(photoManifestPath, 'utf8'));
    const photos = (manifest && manifest.photos) || [];
    const byTag = photos.reduce((acc, p) => {
      const tag = p.tag || 'unknown';
      (acc[tag] ||= []).push(p);
      return acc;
    }, {});
    return { photos, byTag };
  } catch (e) {
    return { photos: [], byTag: {} };
  }
}

function pick(byTag, tag) {
  const pool = byTag[tag] || [];
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

function buildActivities(byTag) {
  const hail = pick(byTag, 'hail');
  const wind = pick(byTag, 'wind');
  const nodmg = pick(byTag, 'no-damage');
  const collateral = pick(byTag, 'collateral');
  const images = [];
  if (hail) images.push({ id: 'hail-1', imageUrl: hail.imageUrl, correctAnswer: 'Hail impact' });
  if (wind) images.push({ id: 'wind-1', imageUrl: wind.imageUrl, correctAnswer: 'Wind damage' });
  if (nodmg) images.push({ id: 'nodmg-1', imageUrl: nodmg.imageUrl, correctAnswer: 'No' });
  if (collateral) images.push({ id: 'collateral-1', imageUrl: collateral.imageUrl, correctAnswer: 'Gutter dents and downspout damage' });

  const photoIdQuick = {
    type: 'image-quiz',
    title: 'Photo ID — Quick Check',
    description: 'Identify the damage type or best action from each photo.',
    points: 10,
    data: { images }
  };

  const doubleLayerCode = {
    type: 'multiple-choice',
    title: 'Double-Layer Roofing — Code Compliance',
    description: 'Decide the proper action when an existing roof has multiple layers.',
    points: 10,
    data: {
      question: 'You discover the roof has two existing layers of shingles. What is the correct action under most building codes and manufacturer specs?',
      options: [
        { id: 'a', text: 'Install the third layer if decking is sound', isCorrect: false, explanation: 'A third layer is typically prohibited and voids warranty.' },
        { id: 'b', text: 'Remove all layers to decking before installing new roof', isCorrect: true, explanation: 'Tear-off to decking is the standard requirement for code/manufacturer compliance.' },
        { id: 'c', text: 'Overlay only the damaged slopes', isCorrect: false, explanation: 'Partial overlays violate code/manufacturer requirements and lead to failures.' },
        { id: 'd', text: 'Patch visible issues and leave existing layers', isCorrect: false, explanation: 'Patching over multiple layers is non-compliant and unsafe.' }
      ],
      allowMultiple: false
    }
  };

  const collateralTimed = {
    type: 'timed-challenge',
    title: 'Collateral Documentation — Timed Drill',
    description: 'Choose the best response under time pressure for common collateral situations.',
    points: 12,
    data: {
      timeLimit: 25,
      scenarios: [
        {
          objection: `You see dents on the downspouts and soft metal.\nWhat should you do?`,
          correctResponse: 'Photograph close-ups with a coin for scale and label as collateral evidence',
          incorrectResponses: ['Skip collateral and focus only on roof surface','Ask homeowner to describe dents later','Only video record; no still photos']
        },
        {
          objection: `Window screens show tears and pitting. Best documentation?`,
          correctResponse: 'Take macro photos, capture serial/brand if present, and include in report',
          incorrectResponses: ['Note verbally in the estimate only','Ignore screens unless homeowner requests replacement','Only take a single distant photo']
        },
        {
          objection: `Garage door has impact marks consistent with hail.`,
          correctResponse: 'Capture angled lighting photos to show dimples; include multiple elevations',
          incorrectResponses: ['Use flash only and take one photo','Report as cosmetic and move on','Wait for adjuster to document']
        }
      ]
    }
  };

  const photoSequence = {
    type: 'drag-drop-sequence',
    title: 'Inspection Photo Sequence',
    description: 'Arrange the standard inspection photo flow in order.',
    points: 10,
    data: {
      items: [
        { id: 'mailbox', text: 'Mailbox/House Number' },
        { id: 'house-overview', text: 'Overview of House from Street' },
        { id: 'front-collateral', text: 'Front Elevation Collateral' },
        { id: 'right-collateral', text: 'Right Elevation Collateral' },
        { id: 'rear-collateral', text: 'Rear Elevation Collateral' },
        { id: 'left-collateral', text: 'Left Elevation Collateral' },
        { id: 'roof-collateral', text: 'Roof Overview Collateral' },
        { id: 'hail-closeups', text: 'Circle Hail Hits (Close-ups)' },
        { id: 'wind-closeups', text: 'Slash Wind Damage (if applicable)' },
        { id: 'chalked-overview', text: 'Overview of Chalked Damage' },
        { id: 'granules', text: 'Granules in Gutters/Downspouts' }
      ],
      correctOrder: ['mailbox','house-overview','front-collateral','right-collateral','rear-collateral','left-collateral','roof-collateral','hail-closeups','wind-closeups','chalked-overview','granules']
    }
  };

  return { photoIdQuick, doubleLayerCode, collateralTimed, photoSequence };
}

function fill() {
  const { byTag } = loadPhotos();
  const content = buildActivities(byTag);
  const files = fs.readdirSync(modulesDir).filter(f => f.startsWith('module') && f.endsWith('.json'));
  let totalChanges = 0;

  files.forEach(file => {
    const filePath = path.join(modulesDir, file);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changes = 0;

    (moduleData.sections || []).forEach(section => {
      if (!Array.isArray(section.activities)) return;
      section.activities = section.activities.map(act => {
        if (!act || !act.id) return act;
        switch (act.id) {
          case 'photo-id-quick':
            changes++; return { id: 'photo-id-quick', agnesTip: 'Speed ID photos—use angled light where helpful.', ...content.photoIdQuick };
          case 'double-layer-code':
            changes++; return { id: 'double-layer-code', agnesTip: 'Most specs require full tear-off.', ...content.doubleLayerCode };
          case 'collateral-timed':
            changes++; return { id: 'collateral-timed', agnesTip: 'Collateral strengthens coverage decisions.', ...content.collateralTimed };
          case 'photo-sequence':
            changes++; return { id: 'photo-sequence', agnesTip: 'Consistency reduces adjuster friction.', ...content.photoSequence };
          default:
            return act;
        }
      });
    });

    if (changes > 0) {
      fs.writeFileSync(filePath, JSON.stringify(moduleData, null, 2));
      console.log(`Filled ${changes} placeholder(s) in ${file}`);
      totalChanges += changes;
    } else {
      console.log(`No placeholders to fill in ${file}`);
    }
  });

  console.log(`Total placeholders filled: ${totalChanges}`);
}

fill();
