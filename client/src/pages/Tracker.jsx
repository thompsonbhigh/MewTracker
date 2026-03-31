import { useEffect, useState } from 'react';
import imgNull from '../assets/null.png';
import imgNormal from '../assets/normal.png';
import imgHard from '../assets/hard.png';
import imgCrazy from '../assets/crazy.png';
import imgImpossible from '../assets/impossible.png';

const STORAGE_KEY = 'tracker-image-indexes';

const Tracker = () => {
    const classes = [
    'Collarless',
    'Fighter',
    'Hunter',
    'Mage',
    'Tank',
    'Cleric',
    'Thief',
    'Necro',
    'Tinkerer',
    'Butcher',
    'Druid',
    'Psychic',
    'Monk',
    'Jester',
    ];

    const zones = [
        'Caves',
        'Boneyard',
        'Domain',
        'Core',
        'Moon',
        'Rift',
        'Jurassic',
        'End',
        'Infinity'
    ];

    const images = [imgNull, imgNormal, imgHard, imgCrazy, imgImpossible];

    const [imageIndexes, setImageIndexes] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Failed to load saved tracker state: ', error);
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(imageIndexes));
        } catch (error) {
            console.error('Failed to save tracker state: ', error);
        }
    }, [imageIndexes]);

    function handleCycleImage(zone, className) {
        const cellKey = `${zone}-${className}`;

        setImageIndexes((prev) => {
            const currentIndex = prev[cellKey] ?? 0;

            return {
                ...prev,
                [cellKey]: (currentIndex + 1) % images.length,
            };
        });
    }

    return (
        <main>
            <section className='section' style={{justifySelf: 'center', textAlign: 'center'}}>
                <h1 className='display-title'>Completion Log</h1>
            </section>

            <div className='table-wrap'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            {classes.map((className) => (
                                <th key={className}>{className}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {zones.map((zone) => (
                            <tr key={zone}>
                                <td>{zone}</td>

                                {classes.map((className) => {
                                    const cellKey = `${zone}-${className}`;
                                    const currentIndex = imageIndexes[cellKey] ?? 0;

                                    return (
                                        <td key={className}>
                                            <img
                                                src={images[currentIndex]}
                                                alt={`${zone}-${className}`}
                                                onClick={() => handleCycleImage(zone, className)}
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
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Tracker