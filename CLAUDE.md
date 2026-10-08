# CLAUDE.md

Project-wide instructions for Claude Code sessions working in this repo.

## Prompt-master assist

This repo vendors the `prompt-master` skill (`.claude/skills/prompt-master/`). On top of its own
trigger rule, apply this standing behavior in every session:

- For each user request, judge whether it would benefit from `prompt-master` — i.e. the user is
  asking (explicitly or implicitly) to write, fix, improve, or adapt a prompt for a specific AI
  tool (an LLM, Cursor, Midjourney, an image/video AI, a coding agent, etc.).
- If it would: don't run it silently and don't block on it. Offer it as an option — tell the user
  you can run the request through `prompt-master` to produce an optimized, tool-specific prompt,
  and ask if they want to see it.
- If they say yes, invoke `prompt-master`, show them the resulting prompt, and let them check it
  against their intent before treating it as final — adjust if it doesn't match.
- If the request is ordinary conversation, coding, or document work with no prompt-engineering
  angle, don't mention `prompt-master` at all.
