# Antigravity React Handoff Prompt

You are implementing the Campus Pass frontend from the Stitch UI package.

## Goal
Convert the six Stitch-designed pages into one production-quality responsive
React + TypeScript web application.

## Source of truth
Use:
- `stitch-ui/*/screen.png` for visual appearance
- `stitch-ui/*/code.html` for layout/content clues
- `stitch-ui/design-system/DESIGN.md` for the shared design system

## Pages
Participant:
- `/profile`
- `/events`
- `/my-registrations`

Organizer:
- `/profile`
- `/my-events`
- `/my-events/:eventId/participants`

## Requirements
- React + TypeScript
- Reusable components
- Responsive desktop-first web UI
- React Router for navigation
- Mock/local data only for now
- Preserve Stitch visual hierarchy, spacing, typography, cards, tables,
  badges, modals and responsive behavior
- Do not invent a different visual style
- Do not implement backend integration yet
- Use role-aware navigation
- Keep Profile reusable between Organizer and Participant
- Keep event discovery components reusable where appropriate

## Business rules visible in UI
- Organizer can create/manage owned events.
- Organizer can participate in other organizers' events, but not their own.
- Participant can register once per event.
- Full events cannot be registered for.
- Registered users can view their event pass.
- Cancellation is available before the event according to the UI state.
- Only registered users can check in, and check-in happens once.

First inspect all six Stitch pages and the design system before coding.
Then create the React project structure and implement the pages consistently.
