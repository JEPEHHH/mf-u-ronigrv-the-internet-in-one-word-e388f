# The Internet in One Word

A deterministic, dependency-free entry: it writes a single word to
`/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt` when set).

Run with Node 22.18+:

    node main.ts

The word is fixed in source, so every run produces the same UTF-8 output,
well within the contest's 1–30 character gate. No network, no API keys,
no packages, no clock — the program only uses built-in `fs` and `path`.

Licensed under MIT; see LICENSE.
