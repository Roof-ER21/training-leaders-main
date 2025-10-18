# Handoff: TRD Training — 16‑Module Rollout

This handoff summarizes what’s live, where the code lives, and what to do next. It’s optimized for a new Codex to continue seamlessly.

## Status

- Expanded to 16 modules with the client‑approved order.
- Replaced legacy content with new JSONs and mapped modules accordingly.
- Preserved Agnes, InteractiveModuleSystem, activities, analytics.
- Role‑play activities can deep‑link into full CustomerRoleplaySystem scenarios.
- Discontinued Products module includes downloadable templates and code/manufacturer PDFs from Sales Rep Resources.

## Key Files

- Module mapping/order: `src/components/InteractiveModuleSystem.tsx`
  - Import list for module JSONs
  - `loadModuleContent` mapping for IDs 1–16
- Agnes grid labels/descriptions: `src/components/AgnesIntegratedTraining.tsx`
- New content JSONs:
  - `src/data/modules/module1_welcome.json`
  - `src/data/modules/module2_commitment.json`
  - `src/data/modules/module3_roofing.json`
  - `src/data/modules/module4_shingle_types_materials.json`
  - `src/data/modules/module5_initial_pitch.json`
  - `src/data/modules/module6_initial_pitch_objections.json`
  - `src/data/modules/module5_post_inspection_presentation.json`
  - `src/data/modules/module7_adjuster_meeting.json`
  - `src/data/modules/module9_post_inspection_objections.json`
  - `src/data/modules/module10_damage_identification_new.json`
  - `src/data/modules/module11_filing_claim_closing.json`
  - `src/data/modules/module12_closing_objections.json`
  - `src/data/modules/module13_discontinued.json`
  - `src/data/modules/module14_sales_cycle_job_flow.json`
  - `src/data/modules/module15_roleplay.json`
  - `src/data/modules/module16_final_exam.json`
- Role‑play deep link bridge:
  - `src/components/AgnesIntegratedTraining.tsx` (window event `openRoleplayScenario`)
  - `src/components/InteractiveLearningActivity.tsx` (role‑play activity button)
- Discontinued module resources:
  - Templates: `public/assets/templates/…`
  - Docs/PDFs: `public/assets/docs/…`

## What’s Live/Deployed

- Branch: `develop` (Railway production tracks this)
- Merged PRs:
  - #1: 16‑module expansion + quiz engine upgrades
  - #2: Role‑play deep links + template downloads
  - #3: Module 13 documents (matching + code references)
  - #4: Exact module order + new content (1,2,5,6) + mapping

## Next Priorities

1) Fill any remaining content gaps
   - Module 1: leadership bios modals implemented via `[BIOS]` placeholder in section content and `leadershipBios` in JSON. Add real photos to `public/assets/images/leadership` to replace placeholders.
   - Module 4: add brand‑specific ID examples (GAF, CertainTeed, OC) if images available.
   - Module 7: add demo video embedding (if assets provided), ensure safety flows are comprehensive.
2) Enrich Module 15 (AI Role‑Play)
   - More activities added with `openCustomerRoleplayId` mappings (door-to-door initial, post-inspection, insurance objections, non-storm intro, storm intro, objection-tree, multi-path, difficult customer).
   - In-module transcript export implemented:
     - CustomerRoleplaySystem: header “Export” button downloads Markdown transcript of the conversation + results.
     - AgnesRoleplaySystem: header “Export” + session-complete “Download Transcript”.
   - Deep links supported: pass `?m=15&s=<scenarioId>` (or `#m=15&s=<scenarioId>`) to auto-open Module 15 and launch a specific scenario.
3) Final Exam (Module 16)
   - Review distribution (40 MCQ, 5 SA, 5 FIB) and tweak weights/pass bar as needed.
   - “Retake missed only” mode implemented in quiz engine (results screen shows both Retake Missed Only and Retake Full Quiz). Gating unchanged: module completion still requires passing per current threshold.
4) Consistency pass
   - Ensure all module durations reflect brief format (15–60m as designed).
   - Remove any legacy references in `AgnesIntegratedTraining.tsx` descriptions.
5) Assets
   - Leadership photos: place at `public/assets/images/leadership/{owner.jpg, gm.jpg, sales_director.jpg}` (filenames can be changed; update `photoUrl` fields in `module1_welcome.json`).

## How to Run Locally

```bash
npm install
npm start  # CRA dev server on default port 3000
```

## How to Deploy

- Merge to `develop` — Railway is configured to deploy from that branch.

## Notes

- Placeholder augmentation for modules 4–9 is disabled intentionally to avoid generic filler. Build content directly in JSONs.
- Keep Agnes features intact; role‑play deep links rely on scenario IDs in `CustomerRoleplaySystem.tsx`.
- Quiz engine now supports “Retake Missed Only” for any module with a quiz (including Module 16). Button is visible after submitting; disabled when there are no missed questions.
