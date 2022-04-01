import React, { useCallback, useState } from 'react';

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
import axios from 'axios';

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: signupProps) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const isEmailError = email === '';
  const isPasswordError = password === '';

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isEmailError && !isPasswordError) {
        const credentials = { username: email, password };
        try {
          await axios.post('http://localhost:8080/api/login', credentials);
        } catch (error) {
          console.error(error);
          alert('로그인이 실패했습니다.');
        }
      }
    },
    [email, password]
  );

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
          <form onSubmit={onSubmit}>
            <ModalHeader>로그인</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={isEmailError}>
                <FormLabel htmlFor="email">이메일</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  ref={initialRef}
                  placeholder="Email"
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
                {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={isPasswordError}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password"
                />
                {isPasswordError && <FormErrorMessage>password is required.</FormErrorMessage>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                로그인
              </Button>
              <Button onClick={onClose}>취소</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
