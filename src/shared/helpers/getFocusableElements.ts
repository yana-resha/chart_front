export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const SELECTORS = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'details>summary:first-of-type',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(',')

  return Array.from(root.querySelectorAll<HTMLElement>(SELECTORS)).filter(
    (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length,
  )
}
