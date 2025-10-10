import { useState } from 'react';
import { NavLink } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useBooking } from '../../contexts/BookingContext.jsx';

const NavBar = () => {
  const { theme, changeTheme } = useTheme();
  const {
    bookingState: { premium },
  } = useBooking();
  console.log('RENDERING: NAV');

  return (
    <div data-theme={theme} className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl' href='/'>
          Travel Agency
        </a>
        <select className='select' defaultValue={theme} onChange={(e) => changeTheme(e.target.value)}>
          <option value='halloween'>Halloween</option>
          <option value='nord'>Nord</option>
          <option value='caramellatte'>Caramellatte</option>
          <option value='dim'>Dim</option>
        </select>
        {premium && <span> NOICE!! - Thanks</span>}
      </div>
      <nav className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/destinations' className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}>
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
