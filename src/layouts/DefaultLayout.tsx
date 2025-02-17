import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="w-screen h-screen flex flex-col bg-background text-on-background" dir="rtl">
      <header className="bg-primary text-on-primary p-4">
        <span className="text-xl font-bold">Percentage Trader</span>
      </header>
      <main className="flex-1 p-6">
        <div className="bg-primary-container p-4 rounded-lg shadow-md h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DefaultLayout;
