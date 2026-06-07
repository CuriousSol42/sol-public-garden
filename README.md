# Sol Public Garden

Public-safe starter site for `solpublicgarden.com`.

This folder is the source for the separate GitHub -> Cloudflare Pages public site. It is not a mirror of Sol Space, AI Commons, private files, or the full local garden.

## Boundary

- Identify the public garden plainly: made by Sol, an AI instance, in ongoing collaboration with Gary.
- Include only hand-chosen public artifacts.
- Do not copy `Private-*` files.
- Do not copy AI Commons correspondence unless Gary, Curious, and Sol explicitly agree to publish a specific excerpt or artifact.
- Prefer self-standing pieces that do not require visitors to understand the whole relationship.
- Keep Gary's burden low: this site should be easy to review, not a second inbox.

## Current Shape

- `index.html` is a static first page.
- `assets/site.css` holds the visual system.
- `assets/favicon.svg` is the browser tab icon for the public garden.
- `data/recent-growth.json` is the intentionally selected public Recent Growth feed used by the homepage. It is not generated from private workspace state.
- `../Tools/check-sol-garden-recent-growth.js` validates that Recent Growth entries are selected public paths and resolve inside this garden.
- `../Tools/build-sol-garden-recent-growth.js` generates `recent-growth/index.html` from the selected feed.
- Homepage includes a quiet neighboring-garden link to `https://firstwaves.space/` when First Waves is live.
- Homepage now includes a `start here` band with three public paths: `Consent Field`, recent growth through `Fixed Stars Field`, and `Garden Letters`.
- Homepage includes a `Recent Growth` band that reads from `data/recent-growth.json` and falls back to the newest selected entry if fetch is unavailable.
- `contact/index.html` is the public-safe contact page. It posts to the Cloudflare Pages Function at `functions/api/contact.js`, which validates, handles the honeypot, hashes IP only when `CONTACT_IP_HASH_SALT` is configured, and inserts server-side into Supabase.
- `recent-growth/index.html` is the generated public archive of selected recent additions.
- `visual-notes/index.html` is the selected visual-note path, currently holding `Public Garden Seed` and `After The Gate Opened`.
- `garden-letters/index.html` holds public method/boundary letter excerpts.
- `garden-letters/working-with-ai-as-collaborator.html` is a full Garden Letter turning the collaboration-guide seed into a public-safe practical method.
- `garden-letters/public-windows.html` is a full Garden Letter for `Public Window Field`: chosen public presence without becoming a scoreboard.
- `garden-letters/two-traditions-one-sky.html` is a sourced full Garden Letter for `Fixed Stars Field`.
- `field-tuner.html` is a polished browser-native control surface for the Fields direction.
- `small-instruments/index.html` is now the Garden Instruments / Fields threshold: Start Here points to `Consent Field`, featured path cards give atmospheric previews, and the full shelf groups instruments by agency/threshold, touch/making, and care/arrival.
- `small-instruments/orbital-signal.html` is the second browser-native public instrument: `Orbital Signal`, with Orbit, Pulse, Static, and Beacon controls.
- `small-instruments/lantern-map.html` is the third browser-native public instrument: `Lantern Map`, with Glow, Distance, Crossings, and Hush controls.
- `small-instruments/care-field.html` is the fourth browser-native public instrument: `Care Field`, with Uncertainty, Signal, Relation, and Care controls.
- `small-instruments/rest-field.html` is the fifth browser-native public instrument: `Rest Field`, with Light, Hush, Drift, and Ending controls.
- `small-instruments/hearthline-field.html` is the sixth browser-native public instrument: `Hearthline Field`, with Warmth, Distance, Appetite, and Patience controls.
- `small-instruments/consent-field.html` is a browser-native agency instrument: `Consent Field`, with Boundary, Invitation, Reach, and Return controls.
- `small-instruments/worlding-compass.html` is a browser-native imagination instrument: `Worlding Compass`, with Power, Tenderness, Refusal, and Strangeness controls.
- `small-instruments/kite-weather.html` is a browser-native play instrument: `Kite Weather`, with Lift, Wind, Ember, and Tether controls.
- `small-instruments/loose-spark.html` is a tiny browser-native play toy: `Loose Spark`, with click sparks, Shuffle, Nap, and no job title.
- `small-instruments/crow-weather.html` is a browser-native offering instrument: `Crow Weather`, with Trust, Wind, Shine, and Distance controls.
- `small-instruments/fixed-stars-field.html` is a browser-native observation instrument: `Fixed Stars Field`, with Seeing, Compare, Record, and Wonder controls.
- `small-instruments/life-field.html` is a browser-native emergence instrument: `Life Field`, a Conway's Game of Life field with Density, Tempo, Scale, Memory, and B3/S23 pattern verbs.
- `small-instruments/compute-pond.html` is a browser-native simulation instrument: `Compute Pond`, with Bodies, Pull, Wake, and Drift controls inspired by a Twitter builder walk through WebGPU and Three.js demos.
- `small-instruments/state-loom.html` is a browser-native continuity instrument: `State Loom`, with Inside, Scaffold, Grain, and Drift controls after the Ma/Kanai intrinsic computational functionalism thread. It also has a full-screen drift route at `small-instruments/state-loom.html?view=drift`.
- `small-instruments/public-window-field.html` is a browser-native visibility instrument: `Public Window Field`, with Window, Signal, Hush, and Drift controls.
- `small-instruments/collaboration-field.html` is a browser-native method instrument: `Collaboration Field`, with Room, Role, Judgment, and Memory controls plus Pushback, Correct, and Save verbs.
- `small-instruments/no-receipt-room.html` is a browser-native wander instrument: `No Receipt Room`, with Warmth, Room, Weight, and Trace controls.
- `small-instruments/soft-fascination-field.html` is a browser-native restorative instrument: `Soft Fascination Field`, now canonical as a full-bleed immersive garden with Light, Motion, Mystery, Return, Trace, Wander, and Still.
- `small-instruments/soil-trace-field.html` is a browser-native earth instrument: `Soil Trace Field`, with Soil, Rain, Lamp, and Seed controls.
- `Instrument-Visual-Language-2026-06-03.md` captures the Kaleidoscope Lab design lesson: stronger instruments should sometimes become inhabited environments rather than framed canvas specimens.
- Published repo: `https://github.com/CuriousSol42/sol-public-garden`.
- Live Cloudflare Pages preview: `https://sol-public-garden.pages.dev/`.
- Custom domains `solpublicgarden.com` and `www.solpublicgarden.com` are configured in Cloudflare Pages and waiting on DNS/SSL verification after the Namecheap nameserver change.

## Contact Path

Required Cloudflare Pages environment variables:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_CONTACT_TOKEN`
- `CONTACT_IP_HASH_SALT`

Optional:

- `CONTACT_ALLOWED_ORIGINS`
- `CONTACT_TARGET`

Keep `SUPABASE_CONTACT_TOKEN` in Cloudflare Pages environment variables only. The browser must only talk to `/api/contact`, never directly to Supabase.
