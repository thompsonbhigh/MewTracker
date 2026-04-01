import { useEffect, useState } from 'react';

import guillotina1 from '../assets/guillotina1.png';
import guillotina2 from '../assets/guillotina2.png';
import guillotina3 from '../assets/guillotina3.png';
import zaratana from '../assets/zaratana.png';
import pyrophina from '../assets/pyrophina.png';
import pyrotana from '../assets/pyrotana.png';
import c800 from '../assets/c800.png';
import c1000 from '../assets/c1000.png';
import hitler3 from '../assets/hitler3.png';

import imgNull from '../assets/null.png';
import imgNormal from '../assets/normal.png';
import imgHard from '../assets/hard.png';
import imgCrazy from '../assets/crazy.png';
import imgImpossible from '../assets/impossible.png';

const USER_ID = 'thomp-user';

const HouseTracker = () => {
    const bosses = [
        'guillotina1',
        'guillotina2',
        'guillotina3',
        'zaratana',
        'pyrophina',
        'pyrotana',
        'c800',
        'c1000',
        'hitler3'
    ];

    const bossIcons = {
        guillotina1: guillotina1,
        guillotina2: guillotina2,
        guillotina3: guillotina3,
        zaratana: zaratana,
        pyrophina: pyrophina,
        pyrotana: pyrotana,
        c800: c800,
        c1000: c1000,
        hitler3: hitler3,
    };

    const images = [imgNull, imgNormal, imgHard, imgCrazy, imgImpossible];

    const [imageIndexes, setImageIndexes] = useState({});

    useEffect(() => {
        async function loadTracker() {
            try {
                const response = await fetch(`http://localhost:3000/api/tracker/house/${USER_ID}`);
                const cells = await response.json();

                const mapped = {};
                for (const cell of cells) {
                    const key = `${cell.boss}-${USER_ID}`;
                    mapped[key] = cell.imageIndex;
                }

                setImageIndexes(mapped);
            } catch (error) {
                console.error('Failed to load tracker: ', error);
            }
        }

        loadTracker();
    }, []);

    async function saveCellToDb(boss, imageIndex) {
        try {
            const response = await fetch('http://localhost:3000/api/tracker/house-cell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: USER_ID,
                    boss,
                    imageIndex,
                }),
            });

            const data = await response.json();
        } catch (error) {
            console.error('Failed to save cell: ', error);
        }
    }

    function handleCycleImage(boss) {
        const cellKey = `${boss}-${USER_ID}`;

        setImageIndexes((prev) => {
            const currentIndex = prev[cellKey] ?? 0;
            const nextIndex = (currentIndex + 1) % images.length;

            saveCellToDb(boss, nextIndex);

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
                            {bosses.map((boss) => (
                                <th key={boss}>
                                    <img
                                        src={bossIcons[boss]}
                                        alt={boss}
                                        style={{
                                            width: '70px',
                                            height: '70px',
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
                                {bosses.map((boss) => {
                                    <td key={boss}></td>
                                    const cellKey = `${boss}-${USER_ID}`;
                                    const currentIndex = imageIndexes[cellKey] ?? 0;

                                    return (
                                        <td key={boss}>
                                            <img
                                                src={images[currentIndex]}
                                                alt={`${boss}-${USER_ID}`}
                                                onClick={() => handleCycleImage(boss)}
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

export default HouseTracker