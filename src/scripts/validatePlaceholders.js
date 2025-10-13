/*
  Scans modules for [ACTIVITY:id] placeholders in section.content and ensures a matching
  section.activities entry exists. If missing, injects a basic multiple-choice stub.
  Run with: node src/scripts/validatePlaceholders.js
*/
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'data', 'modules');

const makeStubActivity = (id) => ({
  id,
  title: `Placeholder: ${id}`,
  description: 'Auto-inserted activity stub for unresolved placeholder.',
  type: 'multiple-choice',
  data: {
    question: `This is a placeholder for activity '${id}'.`,
    options: [
      { id: 'a', text: 'Ok, got it', isCorrect: true },
      { id: 'b', text: 'Skip', isCorrect: false },
    ],
    allowMultiple: false,
  },
  points: 5,
  agnesTip: 'Replace this stub with the intended activity.',
});

function extractPlaceholders(text) {
  if (typeof text !== 'string') return [];
  const regex = /\[ACTIVITY:([\w-]+)\]/g; // capture IDs like photo-id-quick
  const ids = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

function validateAndFixModules() {
  const files = fs
    .readdirSync(modulesDir)
    .filter((f) => f.startsWith('module') && f.endsWith('.json'));

  files.forEach((file) => {
    const filePath = path.join(modulesDir, file);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changes = 0;

    const sections = Array.isArray(moduleData.sections) ? moduleData.sections : [];
    sections.forEach((section) => {
      const ids = extractPlaceholders(section.content);
      if (ids.length === 0) return;
      if (!Array.isArray(section.activities)) section.activities = [];

      ids.forEach((id) => {
        const exists = section.activities.some((a) => a && a.id === id);
        if (!exists) {
          section.activities.push(makeStubActivity(id));
          changes++;
          console.log(`Injected stub for missing activity '${id}' in ${file} / section '${section.title || section.id}'`);
        }
      });
    });

    if (changes > 0) {
      fs.writeFileSync(filePath, JSON.stringify(moduleData, null, 2));
      console.log(`Saved ${file} with ${changes} change(s).`);
    } else {
      console.log(`No changes needed for ${file}.`);
    }
  });
}

validateAndFixModules();

