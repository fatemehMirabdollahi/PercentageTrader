import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div
      className="w-screen h-screen flex flex-col bg-background text-on-background overflow-x-hidden"
      dir="rtl"
    >
      <header className="bg-primary text-on-primary p-4 fixed top-0 left-0 w-full shadow-md">
        <span className="text-xl font-bold">Percentage Trader</span>
      </header>
      <main className="flex-1 p-6 pt-16 w-full max-w-screen overflow-x-hidden">
        <div className="bg-primary-container p-4 rounded-lg shadow-md min-h-full w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DefaultLayout;
