import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>Menu</nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
