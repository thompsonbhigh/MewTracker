import { useEffect, useState } from 'react';

import butch from '../assets/butch.webp';
import frank from '../assets/frank.svg';
import tink from '../assets/tink.svg';
import tracy from '../assets/tracy.webp';
import jack from '../assets/jack.svg';
import zombie from '../assets/zombie.svg';

import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';
import seven from '../assets/seven.png';
import eight from '../assets/eight.png';
import nine from '../assets/nine.png';
import ten from '../assets/ten.png';
import eleven from '../assets/eleven.png';
import twelve from '../assets/twelve.png';
import thirteen from '../assets/thirteen.png';
import fourteen from '../assets/fourteen.png';
import fifteen from '../assets/fifteen.png';
import sixteen from '../assets/sixteen.png';
import seventeen from '../assets/seventeen.png';
import eighteen from '../assets/eighteen.png';
import nineteen from '../assets/nineteen.png';
import twenty from '../assets/twenty.png';
import done from '../assets/done.png';
import imgNull from '../assets/null.png';

const USER_ID = 'thomp-user';

const NPCTracker = ({setProgress}) => {
    const npcIcons = [
        { name: 'Butch', icon: butch, maxImages: 8 },
        { name: 'Frank', icon: frank, maxImages: 5 },
        { name: 'Tink', icon: tink, maxImages: 8 },
        { name: 'Tracy', icon: tracy },
        { name: 'Jack', icon: jack, maxImages: 5 },
        { name: 'Zombie', icon: zombie, maxImages: 8 },
    ];

    const images = [
        imgNull,
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        ten,
        eleven,
        twelve,
        thirteen,
        fourteen,
        fifteen,
        sixteen,
        seventeen,
        eighteen,
        nineteen,
        twenty,
    ];

    const [imageIndexes, setImageIndexes] = useState({});

    async function getProgress() {
        try {
            const response = await fetch(`http://localhost:3000/api/tracker/npc-total/${USER_ID}`);
            const total = await response.json();

            setProgress(total.total);
        } catch (error) {
            console.error('Failed to fetch total: ', error);
        }
    }

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
        getProgress();
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

    function handleCycleImage(npcName) {
        const cellKey = `${npcName}-${USER_ID}`;
        const npc = npcIcons.find((n) => n.name === npcName);
        const maxImages = npc?.maxImages ?? images.length;

        setImageIndexes((prev) => {
            const currentIndex = prev[cellKey] ?? 0;
            const nextIndex = (currentIndex + 1) % maxImages;

            saveCellToDb(npcName, nextIndex);
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