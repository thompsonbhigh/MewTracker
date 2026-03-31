import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
            <header className='navbar'>
                <nav className='navbar__links'>
                    <NavLink to='/' end className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Home</NavLink>
                    <NavLink to='/tracker' className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Tracker</NavLink>
                </nav>

                <div className='navbar__actions'>
                    <button className='btn btn--secondary'>Login</button>
                </div>

            </header>
    )
}

export default Navbar