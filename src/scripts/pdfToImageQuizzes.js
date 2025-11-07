/*
  Optional: Generate image-quiz activities from local PDF photo reports.
  Requires: poppler utils (pdftoppm). On macOS: `brew install poppler`.

  Run: node src/scripts/pdfToImageQuizzes.js
  - Converts first N pages of each PDF to PNG into `public/generated/photos/<folder>`
  - Appends an image-quiz activity into module9.json (or chosen module)
*/
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfFolder = '/Users/a21/Desktop/Sales Rep Resources/Rep Reports & Photo Examples';
const outRoot = path.join(process.cwd(), 'public', 'generated', 'photos');
const modulePath = path.join(process.cwd(), 'src', 'data', 'modules', 'module9.json');
const MAX_PAGES = 6; // limit per PDF

function hasPdftoppm() { try { execSync('pdftoppm -v', { stdio: 'ignore' }); return true; } catch { return false; } }
function hasQlmanage() { try { execSync('qlmanage -v', { stdio: 'ignore' }); return true; } catch { return false; } }

function convertPdf(pdfPath) {
  const base = path.basename(pdfPath).replace(/\s+/g, '_').replace(/\.pdf$/i,'');
  const outDir = path.join(outRoot, base);
  fs.mkdirSync(outDir, { recursive: true });
  const outPrefix = path.join(outDir, base);
  if (hasPdftoppm()) {
    try {
      execSync(`pdftoppm -png -f 1 -l ${MAX_PAGES} "${pdfPath}" "${outPrefix}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error('pdftoppm failed for', pdfPath);
    }
  } else if (hasQlmanage()) {
    // Fallback: generate a large thumbnail from first page using macOS qlmanage
    try {
      execSync(`qlmanage -t -s 1600 -o "${outDir}" "${pdfPath}"`, { stdio: 'inherit' });
    } catch (e) {
      console.error('qlmanage failed for', pdfPath);
    }
  } else {
    console.warn('No PDF-to-image tool found (install poppler or use qlmanage on macOS).');
  }
  const files = fs
    .readdirSync(outDir)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .map(f => `/generated/photos/${base}/${f}`);
  return { base, outDir, images: files };
}

// Deterministic selection helper for variety across repeated runs
function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i), h |= 0;
  return Math.abs(h);
}
function pick(seed, arr) { return arr[seed % arr.length]; }

function buildQNAFor(src, index) {
  const lower = src.toLowerCase();
  const mk = (question, options, correct, explanation) => ({ question, options, correctAnswer: correct, explanation });

  const seed = hashCode(src + '|' + index);

  // Page-position heuristics
  if (index === 0) {
    const q = pick(seed, [
      'What is the best first step for this inspection set?',
      'To begin this photo report, what should you do first?',
      'How do you start an orderly inspection sequence?'
    ]);
    return mk(
      q,
      [
        'Capture an overview and set the photo sequence order',
        'Take a random close-up and upload later',
        'Skip photos and write a summary only',
        'Start with collateral and ignore elevations'
      ],
      'Capture an overview and set the photo sequence order',
      'Begin with mailbox/house number and overviews; establish consistent photo flow.'
    );
  }

  if (index === 1 || index === 2) {
    // Encourage identification on pages 2–3
    if (/(hail|impact|bruise|divot)/.test(lower)) {
      return mk(
        'What type of damage is shown?',
        ['Hail impact', 'Wind damage', 'Normal wear', 'No damage'],
        'Hail impact',
        'Circular divots and granule displacement indicate hail.'
      );
    }
    if (/(wind|crease|tab|lift)/.test(lower)) {
      return mk(
        'What type of damage is shown?',
        ['Wind damage', 'Hail impact', 'Thermal blistering', 'No damage'],
        'Wind damage',
        'Creased/lifted tabs point to wind uplift.'
      );
    }
    // Generic early close-up prompt
    return mk(
      pick(seed, ['What are you likely documenting here?', 'Identify the focus of this photo.']),
      ['Damage close-up', 'Random scenery', 'Invoice screenshot', 'Permit form'],
      'Damage close-up',
      'Pages 2–3 typically capture first damage close-ups for the report.'
    );
  }

  // Page 3–4: components/collateral focus if hinted by filename
  if (index === 3 || index === 4) {
    if (/(downspout|gutter|soft metal|metal cap|flashing)/.test(lower)) {
      return mk(
        'Best practice for collateral documentation?',
        [
          'Close-ups with scale + label as collateral',
          'Skip and focus on roof only',
          'Only note in estimate text',
          'Shoot one distant photo'
        ],
        'Close-ups with scale + label as collateral',
        'Collateral dents corroborate storm; include scale and labels.'
      );
    }
    if (/(screen|window|garage)/.test(lower)) {
      return mk(
        'How do you make cosmetic impacts visible?',
        ['Use angled/raking light photos', 'Flash direct only', 'No photos needed', 'Video only'],
        'Use angled/raking light photos',
        'Shallow dimples/pitting reveal best under angled lighting.'
      );
    }
  }

  // Content-based heuristics (filename hints)
  if (/(hail|impact|bruise|divot|spatter)/.test(lower)) {
    return mk('What type of damage is shown?', ['Hail impact', 'Wind damage', 'Normal wear', 'No damage'], 'Hail impact', 'Circular divots and granule displacement indicate hail.');
  }
  if (/(wind|crease|tab|lift|edge|shingle tab)/.test(lower)) {
    return mk('What type of damage is shown?', ['Wind damage', 'Hail impact', 'Thermal blistering', 'No damage'], 'Wind damage', 'Creased or lifted tabs indicate wind uplift.');
  }
  if (/(granule|gutter)/.test(lower)) {
    return mk('What do granules in gutters indicate?', ['Accelerated deterioration/UV exposure', 'Normal debris', 'Installation error', 'No concern'], 'Accelerated deterioration/UV exposure', 'Granule loss exposes asphalt mat and accelerates aging.');
  }
  if (/(downspout|dent|soft metal|ac|condenser)/.test(lower)) {
    return mk('What is the proper documentation step?', ['Close-ups with scale + label as collateral', 'Skip and focus on roof only', 'Only note in estimate text', 'Shoot one distant photo'], 'Close-ups with scale + label as collateral', 'Collateral strengthens storm-related claim evidence.');
  }
  if (/(screen)/.test(lower)) {
    return mk('Best documentation for torn/pitted screens?', ['Macro photos + include brand/serial if present', 'Ignore unless homeowner requests', 'Video only', 'One distant photo'], 'Macro photos + include brand/serial if present', 'Macro photos make pitting visible and verifiable.');
  }
  if (/(garage)/.test(lower)) {
    return mk('What reveals garage door hail dimples best?', ['Angled lighting photos', 'Flash direct only', 'Write cosmetic only', 'Skip as non-roof item'], 'Angled lighting photos', 'Shallow dimples are best seen in raking/angled light.');
  }
  if (/(chalk|test square)/.test(lower)) {
    return mk('Why chalk damage?', ['To reveal impact points for adjuster clarity', 'To hide wear', 'To fill cracks', 'To seal shingles'], 'To reveal impact points for adjuster clarity', 'Chalk outline improves visibility and consistency.');
  }
  if (/(chimney|flashing|pipe|boot|ridge|valley|vent|drip edge|soffit|fascia)/.test(lower)) {
    return mk(
      'How should you document this component?',
      ['Overview + close-ups with scale/labels', 'Only a distant overview', 'Skip if not damaged', 'Describe in text only'],
      'Overview + close-ups with scale/labels',
      'Capture an overview for context and close-ups with scale and labels.'
    );
  }

  // Generic fallback
  return mk(
    pick(seed, [
      'What is the best next step?',
      'How should you proceed with this photo?',
      'Choose the best documentation action.'
    ]),
    [
      'Take clear close-ups with scale',
      'Skip photo and move on',
      'Only submit a note',
      'Use only video'
    ],
    'Take clear close-ups with scale',
    'Clear, scaled documentation improves outcomes.'
  );
}

function appendImageQuiz(images, title) {
  const mod = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
  const section =
    mod.interactiveLearning?.[0] ||
    (mod.interactiveLearning = [
      {
        id: 'generated-quizzes',
        title: 'Generated Image Quizzes',
        content: 'Auto-generated quizzes from PDFs',
        activities: [],
      },
    ])[0];
  section.activities ||= [];
  const imgObjects = images.slice(0, 6).map((src, i) => {
    const qa = buildQNAFor(src, i);
    return {
      id: `p${i}`,
      imageUrl: src,
      question: qa.question,
      options: qa.options,
      correctAnswer: qa.correctAnswer,
      explanation: qa.explanation,
    };
  });
  const activity = {
    id: `pdf-quiz-${Date.now()}`,
    title: title || 'PDF Photo Quiz',
    description: 'Identify what you see and select the most accurate answer.',
    type: 'image-quiz',
    points: 12,
    data: { images: imgObjects },
    agnesTip: 'Use angled light, scale objects, and clear labels to make evidence undeniable.',
  };
  section.activities.push(activity);
  fs.writeFileSync(modulePath, JSON.stringify(mod, null, 2));
  console.log('Appended image-quiz to module9:', activity.id);
}

function main() {
  if (!hasPdftoppm() && !hasQlmanage()) {
    console.warn('No rasterizer available. Install with: brew install poppler (pdftoppm) or rely on macOS qlmanage.');
    process.exit(0);
  }
  const pdfs = fs.readdirSync(pdfFolder).filter(f => f.toLowerCase().endsWith('.pdf'));
  if (pdfs.length === 0) {
    console.log('No PDFs found in', pdfFolder);
    return;
  }
  fs.mkdirSync(outRoot, { recursive: true });
  pdfs.forEach(pdf => {
    const full = path.join(pdfFolder, pdf);
    const res = convertPdf(full);
    if (res.images.length) appendImageQuiz(res.images, `Photo Quiz — ${res.base}`);
  });
}

main();
