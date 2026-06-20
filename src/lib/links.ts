// One definition of "should this link open in a new tab?", shared by the
// project and honors pages so the ↗ (new tab) vs → (same tab) signal is
// consistent everywhere.
//
// New tab for anything that leaves the normal in-site page flow:
//   • an external URL (http(s)://…)
//   • a standalone file under public/ (has a file extension, e.g. game.html,
//     certificate.pdf), even though it's same-origin.
// Same tab only for in-site page navigation (a path with no extension, e.g.
// /honors/foo or /projects/pythonworkshops/home).
export const opensInNewTab = (url: string): boolean =>
  /^https?:\/\//.test(url) || /\.\w+($|[?#])/.test(url);
