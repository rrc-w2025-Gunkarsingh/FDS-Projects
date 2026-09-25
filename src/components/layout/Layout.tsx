import { Outlet } from "react-router-dom";
import Nav from "../navigation/Nav";

function Layout() {
  return (
    <>
      <header>
        <Nav />
      </header>

      <Outlet />

      <footer>
        <p>Study Planner</p>
      </footer>
    </>
  );
}

export default Layout;