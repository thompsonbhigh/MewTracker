import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login, Tracker, Home, Navbar, ClassTracker, HouseTracker, NPCTracker } from './pages';
// import './sketchbook.css';
import './manuscript.css';

function App() {
    const [message, setMessage] = useState({});

    async function callHelloApi() {
        try {
            const response = await fetch('http://localhost:3000/api/hello');
            if (!response.ok) {
                throw new Error('HTTP error');
            }
            const data = await response.json();
            setMessage(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <BrowserRouter>
            <div className='app-shell'>
                <main className='page'>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/tracker' element={<Tracker />} >
                            <Route path='classes' element={<ClassTracker />} />
                            <Route path='house' element={<HouseTracker />} />
                            <Route path='npcs' element={<NPCTracker />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
