# Engineering Brief — Holiday Planner

## Outcome
A read-only SPA that connects to a user's Google Calendar, identifies booked holidays and bank holidays, and presents a 12-month rolling view that surfaces both burnout-risk gaps (too long without a break) and planning opportunities (where to consider booking leave next).

## In Scope
- 12-month rolling view: 2 months back, 10 months forward from today
- Month blocks showing: month name, holiday presence, gap status
- Gap highlighting: label showing working-day count between holidays + month tinting by status
- Status bands: **All good** / **Watch out** / **Burn out** (configurable threshold via slider)
- User-provided Google OAuth client ID (stored in localStorage, never baked into code)
- Calendar picker: user selects which calendar(s) to read after OAuth
- Google Calendar "Holidays in United Kingdom" calendar used as bank holiday source
- Holiday detection: all-day or multi-day events on selected calendar(s)
- Colour coding per source calendar (matching Google Calendar colours)
- Helpful, specific error messages for auth failures, API errors, empty results
- localStorage for client ID and OAuth token only — no other persistence

## Out of Scope
- Creating or editing calendar events
- Sub-day / hourly holiday tracking
- Non-UK public holiday locales (MVP)
- Team/multi-user comparison views
- Server-side data of any kind
- Historical data beyond 2 months back

## Key Flows

### First-time setup
1. User lands on `/holiday`
2. Prompted to enter their Google Cloud OAuth client ID
3. Client ID saved to localStorage
4. User clicks "Connect Google Calendar"
5. Google OAuth popup — user grants read-only calendar access
6. OAuth token saved to localStorage
7. Calendar picker shown — lists all user's calendars
8. User selects one or more calendars (can include "Holidays in United Kingdom")
9. Selection saved to localStorage
10. 12-month view renders

### Returning user
1. User lands on `/holiday`
2. Client ID + token loaded from localStorage
3. If token valid: calendar view renders immediately
4. If token expired: silent re-auth or prompt to reconnect

### Viewing the planner
1. 12 month blocks displayed (2 back, 10 forward)
2. Each block shows: month name + year, holiday indicators, gap status tint
3. Between holiday blocks: working-day gap count shown
4. Blocks in a "Watch out" or "Burn out" gap are tinted amber/red respectively
5. Slider at top lets user adjust max gap threshold (default: 6 weeks)
6. Threshold changes re-render gap statuses instantly (no re-fetch)

## Gap Status Logic
- **All good**: gap is less than (threshold − 1 week) working days
- **Watch out**: gap is within 1 week of the threshold
- **Burn out**: gap equals or exceeds the threshold
- Default threshold: 6 weeks (30 working days)
- Slider range: 2–12 weeks

## Holiday Detection Rules
- Source: all-day or multi-day events on the user-selected calendar(s)
- Half-day events: included if the event is marked as all-day (Google's half-day = full all-day event)
- Events under 1 full day: excluded
- Bank holidays: sourced from the "Holidays in United Kingdom" Google Calendar — treated as breaks but visually distinguished from booked holiday
- A bank holiday alone counts as a break (resets the gap counter), displayed as "long weekend" in the UI
- Working days = Monday–Friday, excluding bank holidays

## Edge Cases and Error Handling
| Scenario | Behaviour |
|---|---|
| Invalid / revoked client ID | Clear error: "Your Google Client ID is invalid. Please check your Google Cloud Console." |
| API rate limited or down | "Google Calendar is unavailable right now. Try again shortly." |
| No holidays found on selected calendars | Empty view with message: "No holidays found. Try selecting a different calendar." |
| No holidays yet in the view window | View renders but all gaps show working-day counts from start of window |
| Token expired | Prompt to reconnect; client ID pre-filled |
| User selects no calendars | Prompt: "Select at least one calendar to continue." |

## Tech Stack
- **Language/Framework**: Vanilla HTML, CSS, JavaScript — no build step
- **Styling**: Tailwind CSS via CDN
- **Auth**: Google Identity Services (GSI) — `accounts.google.com/gsi/client`
- **API**: Google Calendar API v3 — loaded via `https://apis.google.com/js/api.js`
- **Platform**: Static — GitHub Pages, part of `vibe-spa` repo
- **Deployment target**: `/holiday/index.html` within the vibe-spa deploy
- **Constraints**: Single HTML file, all styles inline, no npm/bundler, no server

## Non-Functional Requirements
| Area | Requirement |
|---|---|
| Performance | Initial render within 2s on a normal connection; calendar fetch should show a loading state |
| Security | OAuth token is read-only scoped (`https://www.googleapis.com/auth/calendar.readonly`); localStorage acceptable for this use case; no third-party scripts beyond Google APIs and Tailwind CDN |
| Scalability | Client-side only — scales to zero |
| Resilience | All error states handled gracefully with user-friendly messages |
| Observability | None required |
| Compliance | User's calendar data never leaves their browser; no analytics, no tracking |

## Integration Points
| Dependency | Protocol | Failure Mode |
|---|---|---|
| Google Identity Services | JS SDK / OAuth 2.0 | Show auth error, prompt retry |
| Google Calendar API v3 | REST via GAPI JS client | Show API error message |
| Tailwind CDN | CDN script tag | Unstyled fallback (acceptable) |

## Domain Nomenclature
| Term | Definition |
|---|---|
| Holiday | A booked all-day or multi-day personal event on a selected calendar |
| Bank holiday | A UK public holiday sourced from the "Holidays in United Kingdom" Google Calendar |
| Gap | The number of working days between the end of one break and the start of the next |
| All good | Gap status: gap is below the threshold by more than 1 week |
| Watch out | Gap status: gap is within 1 week of the configured threshold |
| Burn out | Gap status: gap equals or exceeds the configured threshold |
| Max gap | The user-configurable threshold (in weeks) that defines when a gap becomes a "Burn out" |
| Break | Any holiday or bank holiday event — the unit that resets the gap counter |
| Calendar picker | The UI component where the user selects which Google calendars to read |

## Open Risks / Unknowns
- Half-day events in Google Calendar are represented as all-day events with a custom property — detection may need refinement after seeing real data
- "Holidays in United Kingdom" calendar must be added by the user to their Google Calendar for it to appear in the picker — we should surface a prompt if it's not found
- Google OAuth for a public app requires the app to go through Google verification if it exceeds 100 users — noted as a future concern, not MVP blocker

## Definition of Done
- [ ] `/holiday/index.html` renders correctly at `http://localhost:3000/holiday/`
- [ ] User can enter and save a Google OAuth client ID
- [ ] OAuth flow connects to Google Calendar successfully
- [ ] Calendar picker lists all available calendars including "Holidays in United Kingdom"
- [ ] 12-month rolling view renders (2 back, 10 forward)
- [ ] Holiday events appear correctly in their respective month blocks
- [ ] Bank holidays are visually distinguished from booked holidays
- [ ] Working-day gap counts display between breaks
- [ ] Gap status tinting works: All good / Watch out / Burn out
- [ ] Max gap slider adjusts thresholds and re-renders instantly
- [ ] Source calendar colours are reflected in holiday indicators
- [ ] All error states produce helpful messages
- [ ] No calendar data persists beyond localStorage token/client ID
- [ ] Page matches vibe-spa design aesthetic
- [ ] Works on mobile
