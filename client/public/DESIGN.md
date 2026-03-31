# Design System Documentation

## 1. Overview & Creative North Star

### The Creative North Star: "The Obsidian Sketchbook"
This design system moves away from the sterile perfection of modern SaaS interfaces and embraces the raw, tactile energy of a dark-ink illustrator’s journal. It is a "High-End Editorial Sketchbook"—a space where gritty, hand-drawn aesthetics meet the sophisticated structure of a premium digital experience.

By utilizing a desaturated, cool-grey palette instead of traditional warm parchment, we create a "gritty-modern" atmosphere. The system breaks the "template" look through **intentional asymmetry**, **variable line weights**, and **overlapping paper-stack layouts**. We treat the screen not as a grid of pixels, but as a series of physical scraps, taped and layered with purpose.

---

## 2. Colors

The color palette is rooted in monochromatic depth, using high-contrast "Ink" blacks against "Ash" greys.

* **Primary (#000000):** Our "Ink." Used for heavy outlines, primary text, and defining the character of hand-drawn elements.
* **Background (#f7f9fd):** The "Ash." A cool, desaturated grey that provides a crisp, professional foundation for the ink to sit upon.
* **Surface Tiers (Nesting):** We create depth through tonal shifts rather than shadows.
* `surface-container-lowest (#ffffff)`: Used for the topmost "scraps of paper."
* `surface-container (#eceef2)`: The secondary layer, used for grouped content.
* `surface-dim (#d8dade)`: Background elements or "distant" layers.

### The "No-Line" Rule (Sectioning)
Standard 1px solid borders are strictly prohibited for sectioning. To separate high-level regions, use **background color shifts** or **hand-drawn ink strokes** (see Elevation).

### The "Glass & Gradient" Rule
While the vibe is "sketchy," we add a premium finish by using semi-transparent `surface` colors with a **backdrop-blur (12px - 20px)** for floating menus. This creates a "frosted vellum" effect that feels expensive and intentional.

### Signature Textures
Apply a subtle linear gradient from `primary` (#000000) to `primary-container` (#343b4c) on large CTAs. This prevents the black from feeling "dead" and adds a silken, ink-like sheen.

---

## 3. Typography

The typography strategy relies on the tension between structured editorial sans-serifs and raw, expressive handwriting.

* **Display & Headlines (Epilogue):** This is our "Editorial Voice." Epilogue’s geometric but quirky terminals provide a solid structure that anchors the hand-drawn elements. Use `display-lg` (3.5rem) with tight letter-spacing for a bold, "ink-heavy" look.
* **Body & Titles (Plus Jakarta Sans):** Used for maximum legibility. These clean fonts act as the "printed" text in the sketchbook, providing a professional counterweight to the doodles.
* **Handwritten Accents (Signature Font):** Use a custom handwritten font sparingly for helper text, "scribbled" notes, or decorative labels to reinforce the notebook aesthetic.

---

## 4. Elevation & Depth

In this system, depth is **physical**. We do not use "drop shadows"; we use **Tonal Layering** and **Ambient Occlusion**.

* **The Layering Principle:** Stack `surface-container-lowest` cards on `surface-container` sections. The contrast defines the edge.
* **Ambient Shadows:** For elements that must float (like Tooltips), use a vastly diffused shadow: `box-shadow: 0 10px 40px rgba(25, 28, 31, 0.06)`. It should feel like a soft glow of "grime" rather than a sharp shadow.
* **The "Ghost Border" Fallback:** If a container requires a border, use `outline-variant` at **15% opacity**. It should be felt, not seen.
* **Ink Outlines:** Critical interactive elements (Buttons, Active Cards) use a **2px to 3px solid Ink (#000000) border**. These borders should feel slightly imperfect—never perfectly symmetrical if the asset allows.

---

## 5. Components

### Buttons
* **Primary:** Solid `primary` background, `on-primary` text, with a 2px offset "heavy ink" border.
* **Secondary:** `surface-container-lowest` background with a thick 2px black outline.
* **Interaction:** On hover, the button should "wiggle" (a 1-2 degree rotation) to mimic a hand-drawn feel.

### Cards & Lists
* **Constraint:** No divider lines. Separate list items using `8px` (spacing 2) of vertical white space or a subtle shift from `surface` to `surface-container-low`.
* **The "Taped" Aesthetic:** Top-level cards should appear to be "taped" or "pinned" to the background using small, hand-drawn doodle assets in the corners.

### Input Fields
* **Styling:** Only a bottom border (2px Ink). The focus state should transform the bottom border into a slightly "shaky" hand-drawn line.
* **Labels:** Use `label-md` in `on-surface-variant` (#474747) for a muted, pencil-sketched look.

### Additional Components: "The Doodle Overlay"
* **Scratches & Marks:** Decorative "X" marks or "scribble" SVGs should be used as background ornaments near headers to break the digital grid.

---

## 6. Do's and Don'ts

### Do
* **Embrace Asymmetry:** Align text left, but let containers have slightly different widths to feel like stacked paper.
* **Use Variable Weights:** Mix thick 3px ink strokes for containers with thin 1px lines for internal iconography.
* **Layering:** Treat every screen as a composition of 3-4 physical layers of grey paper.

### Don't
* **No Perfect Grids:** Avoid perfectly centered, perfectly square layouts. If a card is "floating," give it a -0.5 degree rotation.
* **No Standard Shadows:** Never use `rgba(0,0,0,0.5)` shadows. They look "cheap." Use low-opacity tints of your `on-surface` color.
* **No Default Dividers:** Never use a straight grey line to separate content. Use space or a "torn paper" edge asset.

### Accessibility
* Maintain a minimum contrast ratio of 4.5:1 for all body text.
* Ensure that "handwritten" fonts are never used for critical instructions or long-form reading; they are for aesthetic emphasis only.