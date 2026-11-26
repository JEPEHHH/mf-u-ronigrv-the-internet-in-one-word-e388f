// main.ts — entrypoint for "The Internet in One Word".
// One word is the whole deliverable. No packages, no network, no keys, no clock.
// The chosen word is constant, so repeated runs are byte-identical.

import * as fs from "node:fs";
import * as path from "node:path";

// Funny on its own, true of the whole internet, surprising, one beat.
const ENTRY: string = "yelling";

const DEFAULT_OUTPUT = "/output";

// Honour the competition's override, fall back to the required path.
function resolveOutputDir(): string {
  const override = process.env["MAKEFUN_OUTPUT_DIR"];
  return override && override.trim() ? override.trim() : DEFAULT_OUTPUT;
}

// Refuse anything the sealed gate would mark invalid before writing.
function validate(word: string): string {
  const bytes = Buffer.byteLength(word, "utf8");
  if (bytes < 1 || bytes > 30) throw new Error("word outside 1..30 bytes");
  if (word.trim() !== word || word.length === 0) throw new Error("blank word");
  return word;
}

function writeEntry(dir: string, word: string): string {
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  const payload = word + "\n"; // one word, one trailing newline, UTF-8
  fs.writeFileSync(target, payload, "utf8");
  return target;
}

function run(): void {
  const word = validate(ENTRY);
  const target = writeEntry(resolveOutputDir(), word);
  if (process.env["MAKEFUN_VERBOSE"] === "1") console.log("wrote " + target);
}

run();
