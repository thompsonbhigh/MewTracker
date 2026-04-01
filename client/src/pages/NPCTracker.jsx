import { useEffect, useState } from 'react';

import beanies from '../assets/beanies.svg';
import butch from '../assets/butch.webp';
import frank from '../assets/frank.svg';
import tink from '../assets/tink.svg';
import tracy from '../assets/tracy.webp';
import jack from '../assets/jack.svg';
import zombie from '../assets/zombie.svg';

import imgNull from '../assets/null.png';
import imgNormal from '../assets/normal.png';
import imgHard from '../assets/hard.png';
import imgCrazy from '../assets/crazy.png';
import imgImpossible from '../assets/impossible.png';

const USER_ID = 'thomp-user';

const NPCTracker = () => {
    const npcIcons = [
        { name: 'Beanies', icon: beanies },
        { name: 'Butch', icon: butch },
        { name: 'Frank', icon: frank },
        { name: 'Tink', icon: tink },
        { name: 'Tracy', icon: tracy },
        { name: 'Jack', icon: jack },
        { name: 'Zombie', icon: zombie },
    ];

    const images = [imgNull, imgNormal, imgHard, imgCrazy, imgImpossible];

    const [imageIndexes, setImageIndexes] = useState({});

    useEffect(() => {
        async function loadTracker() {
            try {
                const response = await fetch(`http://localhost:3000/api/tracker/npc/${USER_ID}`);
                const cells = await response.json();

                const mapped = {};
                for (const cell of cells) {
                    const key = `${cell.npc}-${USER_ID}`;
                    mapped[key] = cell.imageIndex;
                }

                setImageIndexes(mapped);
            } catch (error) {
                console.error('Failed to load tracker: ', error);
            }
        }

        loadTracker();
    }, []);

    async function saveCellToDb(npc, imageIndex) {
        try {
            const response = await fetch('http://localhost:3000/api/tracker/npc-cell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: USER_ID,
                    npc,
                    imageIndex,
                }),
            });

            const data = await response.json();
        } catch (error) {
            console.error('Failed to save cell: ', error);
        }
    }

    function handleCycleImage(npc) {
        const cellKey = `${npc}-${USER_ID}`;

        setImageIndexes((prev) => {
            const currentIndex = prev[cellKey] ?? 0;
            const nextIndex = (currentIndex + 1) % images.length;

            saveCellToDb(npc, nextIndex);

            return {
                ...prev,
                [cellKey]: nextIndex,
            };
        });
    }

    return (
        <main>
            <div className='table-wrap'>
                <table className='table'>
                    <thead>
                        <tr>
                            {npcIcons.map((npc) => (
                                <th key={npc.name}>
                                    <img
                                        src={npc.icon}
                                        alt={npc.name}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                            <tr>
                                {npcIcons.map((npc) => {
                                    <td key={npc.name}></td>
                                    const cellKey = `${npc.name}-${USER_ID}`;
                                    const currentIndex = imageIndexes[cellKey] ?? 0;

                                    return (
                                        <td key={npc.name}>
                                            <img
                                                src={images[currentIndex]}
                                                alt={`${npc.name}-${USER_ID}`}
                                                onClick={() => handleCycleImage(npc.name)}
                                                style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    objectFit: 'contain',
                                                    cursor: 'pointer',
                                                    display: 'block',
                                                    margin: '0 auto',
                                                }}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default NPCTracker