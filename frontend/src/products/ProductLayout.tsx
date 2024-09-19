import { Outlet } from "react-router-dom";

export function ProductLayout() {
    return (
        <>
            <div className="bg-blue-300 h-full flex flex-col gap-4">
                <div className="bg-green-300 h-40 flex p-3">Header</div>
                <Outlet />
            </div>
        </>
    )
}

