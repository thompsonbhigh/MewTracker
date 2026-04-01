import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Login, Tracker, Home, Navbar, ClassTracker, HouseTracker, NPCTracker, QuestTracker } from './pages';
// import './sketchbook.css';
import './manuscript.css';

function App() {
    const [progress, setProgress] = useState(0);

    return (
        <BrowserRouter>
            <div className='app-shell'>
                <main className='page'>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/tracker' element={<Tracker progress={progress} />} >
                            <Route path='classes' element={<ClassTracker setProgress={setProgress} />} />
                            <Route path='house' element={<HouseTracker setProgress={setProgress} />} />
                            <Route path='npcs' element={<NPCTracker setProgress={setProgress} />} />
                            <Route path='quests' element={<QuestTracker setProgress={setProgress} />} />
                        </Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
