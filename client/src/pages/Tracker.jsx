import { NavLink, Outlet } from 'react-router-dom';

const Tracker = (progress) => {
    const percentage = `${progress.progress}%`;
    
    return (
        <main>
            <div className='manuscript-grid manuscript-grid--2'>
                <section className='section' style={{justifySelf: 'center', textAlign: 'center'}}>
                    <h1 className='display-title'>Completion Log</h1>
                </section>

                <div className='card'>
                    <div className='card__header'>
                        <h2 className='card-title'>Completion Progress</h2>
                    </div>
                    <div className='card__body'>
                        <div className='progress'>
                            <div className='progress__meta'>
                                <span className='progress__value'>{percentage}</span>
                            </div>

                            <div className='progress__track'>
                                <div className='progress__fill' style={{ width: `${percentage}` }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='page-divider-space'/>

            <header className='navbar'>
                <nav className='navbar__links'>
                    <NavLink to='/tracker/classes' end className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Classes</NavLink>
                    <NavLink to='/tracker/house' className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>House</NavLink>
                    <NavLink to='/tracker/npcs' className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>NPCs</NavLink>
                    <NavLink to='/tracker/quests' className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>Quests</NavLink>
                </nav>
            </header>
            <Outlet />
        </main>
    )
}

export default Tracker