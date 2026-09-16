# Campus Pass — Merged Stitch UI Package

This package merges the **Organizer** and **Participant** Stitch UI designs
into one frontend reference package for React implementation with Antigravity/Cursor.

## Roles

### Participant
1. Profile
2. Browse & Register Events
3. My Registered Events

### Organizer
1. Profile
2. My Events / Event Management
3. Event Participants

## Important shared behavior

- Profile is a shared page concept for both roles.
- Browse Events is a reusable event-discovery concept.
- Organizer can create/manage events they own.
- Organizer can participate in events created by other organizers.
- Organizer cannot register for their own event.
- Participants can register/cancel/check in according to business rules.

## Stitch source

Each page folder contains:
- `code.html` — Stitch-generated reference implementation
- `screen.png` — Stitch visual reference

`design-system/DESIGN.md` contains the shared visual design specification.

## Suggested React implementation

Build one React + TypeScript web application from these references.

Recommended route structure:

- `/profile`
- `/events`
- `/my-events`
- `/my-events/:eventId/participants`
- `/my-registrations`

Use role-based navigation and reuse components rather than creating
duplicate pages where the UX is the same.

Suggested reusable components:
- AppShell / Sidebar
- Header
- ProfileCard
- StatCard
- EventCard
- EventTable
- StatusBadge
- SearchAndFilters
- RegistrationModal
- EventDetails
- ParticipantTable
- EmptyState
- LoadingState
- ErrorState
- EventPass

## Antigravity instruction

Treat the Stitch HTML and screenshots as **visual references**, not as
production React code. Recreate the UI in React + TypeScript with reusable
components, clean routing, responsive behavior, and maintainable structure.

Do not implement backend/API connectivity in this UI conversion step unless
explicitly instructed. Keep data mocked/local so the visual implementation
can be completed independently.
