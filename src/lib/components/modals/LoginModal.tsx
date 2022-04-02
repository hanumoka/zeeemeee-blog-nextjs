import React, { useCallback, useEffect, useState } from 'react';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
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
import loginStore from '../../../stores/loginStore';

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: signupProps) => {
  const { loginFetch, loginLoading, loginError, username } = loginStore((state) => state);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (username) {
      onClose();
    }
  }, [username]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const isEmailError = email === '';
  const isPasswordError = password === '';

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isEmailError && !isPasswordError) {
        loginFetch(email, password);
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
                {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
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
              {loginError && (
                <Alert status="error" style={{ marginTop: 5, borderRadius: 15 }}>
                  <AlertIcon />
                  <AlertTitle mr={2}>{loginError}</AlertTitle>
                </Alert>
              )}
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} isLoading={loginLoading}>
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
