# Accessibility Guidelines (BrowserStack Compliance)

All code modifications and new components created in this workspace must strictly follow accessibility best practices aligned with BrowserStack Accessibility DevTools rules:

## 1. Form Labels & Association (`label-title-only` / `label-present`)
- **Explicit Association Required**: Every `<label>` element must be explicitly associated with a form control.
- **Implementation**:
  - Always add a unique `id` to the input control (e.g. `<input id="userEmail" ... />`).
  - Add the matching `htmlFor` attribute to the label (e.g. `<label htmlFor="userEmail">...</label>`).
  - Avoid placing event handlers like `onClick` directly on the `<label>` when it's explicitly associated to avoid duplicate click triggers. Use the input's `onChange` event instead.

## 2. Autocomplete Values (`autocomplete-valid`)
- **Autofill Tokens**: All text/email/telephone input fields must include a valid `autoComplete` attribute conforming to HTML specification autofill tokens.
  - Full Name: `autoComplete="name"`
  - Email Address: `autoComplete="email"`
  - Phone/Mobile Number: `autoComplete="tel"`
  - For fields without a standard autofill specification, use `autoComplete="off"`.

## 3. Valid Anchor Links (`anchor-is-valid`)
- **Proper Elements**:
  - For navigation to actual URLs or routing destinations, use an `<a>` tag with a valid, navigable `href`.
  - For actions (e.g. submitting a form, closing a modal, triggering state changes, page switching), use a `<button>` element instead of `<a>`.
  - Do **not** use `href="#"` or `href="javascript:void(0)"` with anchor tags for action triggers. If a button needs to look like a hyperlink, style it using CSS.

## 4. Discernible Headings (`empty-heading`)
- **Accessible Headings**: All heading elements (`<h1>` through `<h6>`) must contain discernible, human-readable text visible to screen readers.
- If a heading contains only an icon or image, provide an `aria-label`, `aria-labelledby`, or `title` attribute.
