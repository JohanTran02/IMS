import { Link, Outlet } from "react-router-dom"


export function Layout() {
    return (
        <>
            <nav className="bg-red-300 flex flex-col px-4 pt-2">
                <Link to="/">Overview</Link>
                <Link to="/products">Products</Link>
                <Link to="/products/edit">Edit</Link>
            </nav>
            <div className="bg-blue-300 w-full p-3">
                <Outlet />
            </div>
        </>
    )
}