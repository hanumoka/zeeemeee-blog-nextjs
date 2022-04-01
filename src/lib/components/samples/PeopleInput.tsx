import React, { useRef } from 'react';
import useStore from '../../../store';
import { Button, Input } from '@chakra-ui/react';

const PeopleInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addPerson = useStore((state) => state.addPerson);

  const add = () => {
    if (inputRef.current !== null) {
      addPerson(inputRef.current.value);
    }
  };

  return (
    <div>
      <Input type="text" ref={inputRef} />
      <Button onClick={add}>Add Person</Button>
    </div>
  );
};

export default PeopleInput;
