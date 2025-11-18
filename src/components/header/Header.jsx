import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const active = "text-white font-semibold bg-purple-600 px-4 py-2 rounded-full shadow-md";
  const normal = "text-gray-300 hover:text-white px-4 py-2";

  return (
    <div className="w-full bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-5xl flex items-left gap-6 py-4 text-lg px-0 lg:px-[10%]">
        <Link to="/" className={pathname === "/" ? active : normal}>Learn</Link>
        <Link to="/quiz" className={pathname === "/quiz" ? active : normal}>Quiz</Link>
        <Link to="/game" className={pathname === "/game" ? active : normal}>Game</Link>
        <Link to="/scores" className={pathname === "/scores" ? active : normal}>Scores</Link>
      </div>
    </div>
  );
}
