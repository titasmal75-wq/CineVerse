
import "../Bar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="gn-08-frame">
      <div className="gn-08-bar">
        <NavLink className="gn-08-brand" to="/">
          Prism
        </NavLink>

        <nav aria-label="Primary">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/favourite">Favourite</NavLink>
            </li>
            <li>
              <NavLink to="/watchlist">Watch list</NavLink>
            </li>
            <li>
              <NavLink to="/recommendations">Find your Type</NavLink>
            </li>
          </ul>
        </nav>

        <div className="gn-08-actions">
          <NavLink
            className={({ isActive }) =>
              `gn-08-profile-btn ${isActive ? "active" : ""}`
            }
            to="/profile"
            aria-label="View Profile"
          >
            <span className="gn-08-profile-avatar" aria-hidden="true">
              M
            </span>
            <span className="gn-08-profile-label">Profile</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}


