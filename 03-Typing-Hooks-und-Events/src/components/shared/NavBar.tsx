/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import { useRef } from 'react';
import { NavLink } from 'react-router';
import { useBooking } from '../../contexts/BookingContext.js';
import { useTheme } from '../../contexts/ThemeContext.js';
// 'type' Keyword beim Import: nur der Type wird importiert (wird zur Laufzeit entfernt)
import type { UsableThemes } from '../../contexts/ThemeContext.js';

const NavBar = () => {
  // Generic <HTMLDialogElement> gibt an, auf welches DOM-Element der Ref zeigt
  // null als Startwert, weil das Element erst beim Rendern verfügbar ist
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Types hier durch korrektes Typing in Context schon verfügbar
  const { theme, changeTheme } = useTheme();
  const {
    bookingState: { premium },
  } = useBooking();
  console.log('RENDERING: NAV');

  return (
    <div data-theme={theme} className='navbar bg-base-100 shadow-sm'>
      {/* Optional Chaining (?.) verhindert Fehler, falls current null ist */}
      <button onClick={() => dialogRef.current?.showModal()} type='button'>
        Modal
      </button>
      {/* ref={} verknüpft Element mit Hook */}
      <dialog ref={dialogRef} id='my-dialog' className='inset-1/2 bg-indigo-700 p-3 border-cyan-500'>
        Hallo vom Dialog
      </dialog>

      <div className='flex-1'>
        <a className='btn btn-ghost text-xl' href='/'>
          Travel Agency
        </a>
        {/* Type Assertion (as UsableThemes): sagt TS, dass e.target.value ein UsableThemes ist */}
        <select className='select' defaultValue={theme} onChange={(e) => changeTheme(e.target.value as UsableThemes)}>
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
