import { useEffect, useState } from 'react';

import imgNull from '../assets/null.png';
import imgNormal from '../assets/normal.png';
import imgHard from '../assets/hard.png';
import imgCrazy from '../assets/crazy.png';
import imgImpossible from '../assets/impossible.png';

import collarless from '../assets/collarless.webp';
import fighter from '../assets/fighter.webp';
import hunter from '../assets/hunter.webp';
import mage from '../assets/mage.webp';
import tank from '../assets/tank.webp';
import cleric from '../assets/cleric.webp';
import thief from '../assets/thief.webp';
import necro from '../assets/necro.webp';
import tinkerer from '../assets/tinkerer.webp';
import butcher from '../assets/butcher.webp';
import druid from '../assets/druid.webp';
import psychic from '../assets/psychic.webp';
import monk from '../assets/monk.webp';
import jester from '../assets/jester.webp';

import caves from '../assets/Caves.webp';
import boneyard from '../assets/Boneyard.webp';
import domain from '../assets/Domain.webp';
import core from '../assets/Core.webp';
import moon from '../assets/Moon.webp';
import rift from '../assets/Rift.webp';
import jurassic from '../assets/Jurassic.webp';
import end from '../assets/End.webp';
import infinite from '../assets/Infinite.webp';

const USER_ID = 'thomp-user';

const ClassTracker = ({setProgress}) => {

    async function getProgress() {
        try {
            const response = await fetch(`http://localhost:3000/api/tracker/total/${USER_ID}`);
            const total = await response.json();

            setProgress(total.total);
        } catch (error) {
            console.error('Failed to fetch total: ', error);
        }
    }

    const classes = [
        'collarless',
        'fighter',
        'hunter',
        'mage',
        'tank',
        'cleric',
        'thief',
        'necro',
        'tinkerer',
        'butcher',
        'druid',
        'psychic',
        'monk',
        'jester',
    ];

    const classIcons = {
        collarless: collarless,
        fighter: fighter,
        hunter: hunter,
        mage: mage,
        tank: tank,
        cleric: cleric,
        thief: thief,
        necro: necro,
        tinkerer: tinkerer,
        butcher: butcher,
        druid: druid,
        psychic: psychic,
        monk: monk,
        jester: jester,
    };

    const zones = [
        'Caves',
        'Boneyard',
        'Domain',
        'Core',
        'Moon',
        'Rift',
        'Jurassic',
        'End',
        'Infinite'
    ];

    const zoneIcons = {
        Caves: caves,
        Boneyard: boneyard,
        Domain: domain,
        Core: core,
        Moon: moon,
        Rift: rift,
        Jurassic: jurassic,
        End: end,
        Infinite: infinite,
    };

    const images = [imgNull, imgNormal, imgHard, imgCrazy, imgImpossible];

    const [imageIndexes, setImageIndexes] = useState({});

    useEffect(() => {
        async function loadTracker() {
            try {
                const response = await fetch(`http://localhost:3000/api/tracker/${USER_ID}`);
                const cells = await response.json();

                const mapped = {};
                for (const cell of cells) {
                    const key = `${cell.zone}-${cell.className}`;
                    mapped[key] = cell.imageIndex;
                }

                setImageIndexes(mapped);
            } catch (error) {
                console.error('Failed to load tracker: ', error);
            }
        }

        loadTracker();
        getProgress();
    }, []);

    async function saveCellToDb(zone, className, imageIndex) {
        try {
            const response = await fetch('http://localhost:3000/api/tracker/cell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: USER_ID,
                    zone,
                    className,
                    imageIndex,
                }),
            });

            const data = await response.json();
        } catch (error) {
            console.error('Failed to save cell: ', error);
        }
    }

    function handleCycleImage(zone, className) {
        const cellKey = `${zone}-${className}`;

        setImageIndexes((prev) => {
            const currentIndex = prev[cellKey] ?? 0;
            const nextIndex = (currentIndex + 1) % images.length;

            saveCellToDb(zone, className, nextIndex);
            getProgress();

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
                            <th></th>
                            {classes.map((className) => (
                                <th key={className}>
                                    <img
                                        src={classIcons[className]}
                                        alt={className}
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
                        {zones.map((zone) => (
                            <tr key={zone}>
                                <td>
                                    <img
                                        src={zoneIcons[zone]}
                                        alt={zone}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </td>

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

export default ClassTracker;