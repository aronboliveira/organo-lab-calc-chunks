declare global {
  interface Window {
    elementorFrontend?: any;
    ForminatorValidationErrors?: any;
    ForminatorFormHider?: any;
    ForminatorFormNewTabRedirect?: any;
  }
  interface JQuery<TElement = HTMLElement> {
    forminatorFront(options?: any): JQuery<TElement>;
  }
}
export {};
