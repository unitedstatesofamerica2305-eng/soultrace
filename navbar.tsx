export default function Navbar({
  dark,
  setDark
}: {
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  return (
    <nav className="nav">
      <h2>CODEWITH-FLEXYSOUL</h2>
      <button onClick={() => setDark(!dark)}>
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}