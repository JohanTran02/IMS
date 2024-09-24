import { Outlet } from "react-router-dom";

export function ProductLayout() {
  return (
    <>
      <div className="h-full flex flex-col gap-4">
        <Outlet />
      </div>
    </>
  );
}
