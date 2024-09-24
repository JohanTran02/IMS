import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav className="bg-white flex flex-col">
        <div className="p-4 hover:bg-blue-300 cursor-pointer transition-all">
          <Link to="/">Overview</Link>
        </div>
        <div className="p-4 hover:bg-blue-300 cursor-pointer transition-all">
          <Link to="/products">Products</Link>
        </div>
      </nav>
      <div className="bg-blue-300 w-full p-3">
        <Outlet />
      </div>
    </>
  );
}
