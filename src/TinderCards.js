import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import axios from './axios';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/tinder/cards');

            setPeople(req.data);
        }

        fetchData();
    }, []); // Empty array makes useEffect to only run once

    console.log(people)

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
    };

    const outOfFrame = name => {
        console.log(name + ' left the screen!');
    };

    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {people.map(person => (
                    <TinderCard
                        className='swipe'
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={_ => outOfFrame(person.name)}
                    >
                        <div
                            style={{ backgroundImage: `url(${person.imgUrl})` }}
                            className='card'
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
};

export default TinderCards;

/*
    Parenthesis are used in an arrow function to return an object:

        () => ({ name: 'Jacko' })   // Shorthand to return an object

        Is equivalent to:
        () => {
            return { name: 'Amanda' };
        }

    Left off at 1:02:52
*/