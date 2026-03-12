# BUGLOG.md
# SignFlow Nepal — Bug Tracking

Log bugs here as they are discovered. Include context so they are easy to reproduce and fix.

---

## Bug Template

```
### BUG-[NUMBER]: Short description
- **Status:** Open | In Progress | Fixed
- **Severity:** Critical | High | Medium | Low
- **Discovered:** Date
- **Fixed:** Date (if applicable)
- **Screen/Component:** Which screen or component
- **Steps to reproduce:**
  1. Step one
  2. Step two
- **Expected:** What should happen
- **Actual:** What actually happens
- **Root cause:** (fill in when known)
- **Fix:** (fill in when resolved)
```

---

## Known Issues at Project Start

### BUG-001: react-pdf worker path must be explicitly configured
- **Status:** Open (pre-emptive note)
- **Severity:** Critical
- **Screen/Component:** `main.tsx`, `PDFViewer.tsx`
- **Steps to reproduce:** Render any PDF without configuring the worker
- **Expected:** PDF renders correctly
- **Actual:** "Setting up fake worker" warning, PDFs fail to render in production build
- **Root cause:** react-pdf requires `pdfjs-dist` worker to be pointed to correct path
- **Fix:** In `main.tsx`, add:
  ```typescript
  import { pdfjs } from 'react-pdf'
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
  ```

### BUG-002: dnd-kit field coordinates are relative to viewport, not PDF canvas
- **Status:** Open (pre-emptive note)
- **Severity:** High
- **Screen/Component:** `CanvasContainer.tsx`, `onDragEnd` handler
- **Steps to reproduce:** Drag a field onto the PDF and then scroll — field position is wrong
- **Expected:** Field stays fixed relative to the PDF page position
- **Actual:** Field position calculated relative to viewport includes scroll offset
- **Root cause:** Must subtract `canvasRef.current.getBoundingClientRect()` top/left from drop coordinates
- **Fix:** Use `getBoundingClientRect()` of the canvas container and subtract from `over.rect` coordinates in `onDragEnd`

### BUG-003: Dark mode flash on page load
- **Status:** Open (pre-emptive note)
- **Severity:** Low
- **Screen/Component:** `App.tsx`
- **Steps to reproduce:** Set dark mode, refresh page
- **Expected:** Page loads in dark mode immediately
- **Actual:** Brief flash of light mode before dark class is applied
- **Root cause:** Theme class applied in React render cycle, after initial HTML paint
- **Fix:** Add inline script in `index.html` `<head>` to read localStorage and apply dark class before React loads:
  ```html
  <script>
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
    }
  </script>
  ```
