import React from 'react';
import peopleStore from '../../stores/peopleStore';

const People = () => {
  const people = peopleStore((state) => state.people);
  return (
    <div>
      <p>We have {people.length} people in our DB</p>
      <ul>
        {people.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default People;
