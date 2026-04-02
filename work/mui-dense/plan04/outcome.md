# Plan04 Outcome

`plan04` added a second, explicitly more fragile density layer to the MUI hodgepodge page.

The page now has a working "Advanced Density Controls" panel that applies Set 3 compaction on top of the current Set 1 state for:

- button and chip padding
- icon button box size
- input shell and text padding
- list and menu row height
- accordion summary spacing
- table cell padding
- Data Grid cell and header padding
- Data Grid toolbar and quick-filter compaction
- Tree View item layout and stateful rows

Skipped candidate knobs:

- None. All representative knob families called for by `plan04` were implemented on demos where the effect is visible at normal browser zoom.

Additional note:

- No standalone variant-based Set 3 controls were added, because none of the desired compaction behaviors naturally mapped to an existing public prop combination already present on the page.
- The plan04 amendments also moved the full control surface into a separately scrollable sidebar on wider screens and gave the component gallery its own adjacent scroll pane, while keeping Set 1 and Set 3 visually separated and preserving their independent reset behavior.
- The later `Fix Reversed "Tighten" Controls` amendment was completed. Those advanced toggles now derive their compaction from the active Set 1 baseline so they continue moving in the compact direction under `Default`, `Dense`, and `Dense+`, and the input compaction no longer enlarges text or breaks the floating-label geometry.
