import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {" | "}
      <NavLink to="/courses">Courses</NavLink>
      {" | "}
      <NavLink to="/assignments">Assignments</NavLink>
      {" | "}
      <NavLink to="/goals">Goals</NavLink>
    </nav>
  );
}

export default Nav;