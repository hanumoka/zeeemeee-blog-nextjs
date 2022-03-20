import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: signupProps) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const isError = input === '';

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원가입하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <Input
                id="email"
                type="email"
                value={input}
                onChange={handleInputChange}
                ref={initialRef}
                placeholder="Email"
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
              {!isError ? (
                <FormHelperText>이메일을 입력하셔야 회원가입을 진행 할 수 있습니다.</FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                alert('회원가입');
              }}
            >
              회원가입
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignupModal;
