import React from 'react';
import useStore from '../../../store';

const People = () => {
  const people = useStore((state) => state.people);
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
