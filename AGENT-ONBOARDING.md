# AGENT-ONBOARDING — Event Serve

## Welcome, AGENT
This document defines the constraints and patterns for the Event Serve project.

## Architecture & Conventions
- **Framework:** Vite + React (TypeScript).
- **Styling:** Tailwind CSS.
- **Client-Side:** Extensive use of PDF.js for ticket generation and QR scanning libraries.
- **Integration:** Mobile-first, designed for low-latency scanning and check-in via EventSaaS.

## Critical Workflows
- **QR Performance:** Scanner implementation must be optimized for various lighting conditions and camera qualities.
- **Offline Reliability:** Use local storage to queue check-ins if the connection is lost.
- **Sync:** The project status is automatically synced to the Namka Mission Control dashboard via `PROJECT-SYNC.json` generated on every push to `main`.

## Verification Loop
1. Run `npm run lint` before committing.
2. Verify QR scanning and PDF generation in the browser.
3. Validate and update `Master.md` and `AI_CHANGELOG.md` for each significant change.
