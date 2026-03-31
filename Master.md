# Master — Event Serve

## Project Vision
A lightweight, mobile-first web application for event staff and attendees. Features include digital pass (QR) scanning, PDF ticket generation, and real-time check-in synchronization with EventSaaS. Designed for speed and reliability at entry points.

## Metadata
- **Project ID:** Event-Serve
- **Status:** Active Development
- **Version:** 1.0.1
- **Last Sync:** 2026-03-31
- **Stack:** TypeScript / Vite / Tailwind / PDF.js

## Roadmap & Progress
### Phase 1 — Pass Generation
- [x] QR code generation logic
- [x] PDF ticket template design
- [x] Client-side PDF generation (PDF.js)
- [x] Basic attendee data interface

### Phase 2 — Check-in Logic
- [/] QR scanner integration (camera access)
- [/] Real-time check-in API (integrated with EventSaaS)
- [ ] Offline check-in queue
- [ ] Staff authentication and role-based access

### Phase 3 — UX Polish
- [ ] Dark mode support
- [ ] Animated check-in feedback
- [ ] Batch processing for high-volume entry

## Deployment Strategy
- **Target:** Hostinger VPS (Nginx)
- **Environment:** Production
- **Build:** `npm run build`

## Related Documents
- [README.md](README.md): Project setup and development guide.
