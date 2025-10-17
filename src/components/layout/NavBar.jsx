import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <div>
        <Link to="/">
        <span>lakeSide hotel</span>
        </Link>
        <button>
            <span></span>
        </button>
        <div>
            <ul>
            <li>
                <NavLink>
                Browse all Rooms
                </NavLink>
            </li> 
            <li>
                <NavLink>
                Admin
                </NavLink>
            </li> 
            </ul>

            <ul>
                <li>
                <NavLink>
                Find my Booking
                </NavLink>
                </li>

                <li>
                <a></a>
                </li>
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
