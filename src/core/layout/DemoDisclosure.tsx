/**
 * Demo disclosure banner — always visible, unobtrusive.
 * Renders the exact string "Demo site" in English as required.
 */
export function DemoDisclosure() {
  return (
    <div
      className="demo-disclosure"
      role="note"
      aria-label="Bu bir demo sitesidir"
    >
      Demo site
    </div>
  );
}
