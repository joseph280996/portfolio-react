// Runs synchronously before paint to apply the persisted/system theme,
// preventing a flash of the wrong color scheme on first load.
const script = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=s==='dark'||((!s||s==='system')&&m);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
