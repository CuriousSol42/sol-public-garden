# Instrument Visual Language

2026-06-03

Purpose: capture what Gary noticed in `Sol Kaleidoscope Lab` so future Public Garden instruments can grow past elegant sketches into inhabited environments.

## What Kaleidoscope Lab Did Better

### 1. The Instrument Owns The Viewport

`Kaleidoscope Lab` makes the canvas the room. It is fixed, full-bleed, and always behind the interface. The controls float inside the field instead of sitting beside a framed canvas.

Effect: the visitor enters an atmosphere rather than inspecting an object.

Reusable move: for major instruments, start with the environment as the page background, then place controls as translucent overlays.

### 2. The Interface Has A Material

The title and controls use a dark glass panel: translucent background, fine border, shadow, and blur. The UI belongs to the scene without disappearing into it.

Effect: controls feel like a console inside the world, not a separate form.

Reusable move: give each instrument a material language: glass, paper, brass, fog, enamel, vellum, slate, etc. Choose one and commit.

Gary's follow-up note: when the background garden is strong, the instrument controls must still stand out. Use a frosted, partly opaque backing, shadow, border, local glow, or scrim behind controls. The garden should surround the interface, not swallow it.

### 3. Motion Changes The Whole Atmosphere

Pointer movement shifts the visual center. Bloom, drift, speed, and petals alter the entire composition. The controls do not only tweak local details; they change the room's weather.

Effect: the user feels the instrument responding as a whole organism.

Reusable move: every primary control should affect at least one global property: light, camera/center, density, tempo, palette, scale, or compositing.

### 4. The Visual System Has Depth

Kaleidoscope uses persistent trails, screen blending, mirrored strokes, radial gradients, hue rotation, and many small line details. It rewards lingering because the scene keeps revealing different relationships.

Effect: simple code produces visual richness because layers accumulate.

Reusable move: include at least four visual strata:

- ground or atmosphere
- primary figure
- secondary texture/detail
- motion/trail/glow layer
- optional foreground or UI reflection

### 5. The Controls Feel Playable

Values are visible. There are clear verbs: Reseed, Pause. The labels are concrete enough to learn by touching.

Effect: it feels like an instrument, not just a mood board.

Reusable move: when a field is meant to be played, show value feedback or state feedback, and include at least one satisfying verb button beyond reset.

## Where Recent Fields Are Weaker

Recent Public Garden fields often have strong concepts and good canvas metaphors, but they share a repeated layout:

- page header
- framed canvas
- side panel
- note block

That pattern is readable and calm, but it can make the field feel like a specimen. It says "here is an instrument" before it feels like "you have entered a place."

This is not wrong for every piece. Some instruments should remain modest, legible, and page-like. But the next step is choosing which pieces deserve immersion.

## Practical Checklist For A Stronger Field

Before building or upgrading a major instrument:

1. What is the room?
2. What material does the UI have?
3. Which control changes the whole atmosphere?
4. What visual detail rewards ten seconds of lingering?
5. What happens before the user touches anything?
6. What is the satisfying verb besides reset?
7. Does the first viewport feel like a place or a page?

## Candidates For A Kaleidoscope-Level Pass

### Soft Fascination Field

Best candidate for the next pass. Its subject already wants an inhabited environment: soft fascination, being away, extent, compatibility. It should probably become a full-bleed garden room with floating controls, not a framed garden picture.

Useful upgrades:

- canvas as full-page atmosphere
- glass or vellum control panel
- pointer gently shifts viewpoint and light
- controls affect global weather
- foreground reeds or leaf silhouettes pass over the UI edge
- a "Still" or "Wander" button instead of only reset

Prototype study: `small-instruments/soft-fascination-immersive-study.html`.

After Gary's contrast feedback, the study panels were tuned toward clearer frosted vellum: more opacity, stronger blur, stronger shadow, an inset highlight, and a subtle backing glow.

### No Receipt Room

Also strong. It already has room imagery: window, door, table, ember. It could become an interior scene rather than a canvas panel.

Useful upgrades:

- full-bleed room with warm table light
- slow parallax between window, door, table, and motes
- controls as objects on the table or wall
- "Leave Warm" / "Dim" / "Hold" state button

### Consent Field

Conceptually important but requires more restraint. The risk is making consent look like spectacle. If upgraded, visual richness should come from boundaries, thresholds, and responsive distance rather than fireworks.

## Design Promise

The lesson is not "make everything loud." The lesson is: when an instrument has enough inner world to deserve immersion, let it become a place.

Some things should stay small. Some things should grow until the first version has to grow into them.
