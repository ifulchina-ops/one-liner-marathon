// One-Liner Marathon — make.fun entry.
//
// The program writes a single one-line comedy joke to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The joke is fixed and deterministic: the
// same bytes on every run, no clock, no randomness, no network, no
// environment input. The gate allows 1-280 characters; the line below is
// kept well inside that band, so the entry is valid however the scorer
// counts the trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: therapy advice taken literally. "Set boundaries" becomes a
// nightclub velvet rope around the speaker's feelings — and then a second
// turn: admission is charged, so even the speaker's own feelings have a
// cover charge. One image, two twists, deadpan delivery.
const LINE =
  "My therapist told me to set boundaries, so I put a velvet rope around my feelings and started charging admission.";

function main(): void {
  // The gate counts characters, so guard the length with room to spare.
  if (LINE.length < 1 || LINE.length > 270) {
    throw new Error(`line is ${LINE.length} characters, outside the 1-270 band`);
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");
  // Plain progress on stdout: the line itself plus its character count,
  // so a run's log shows exactly what was judged.
  console.log(LINE);
  console.log(`chars: ${LINE.length}`);
}

main();
