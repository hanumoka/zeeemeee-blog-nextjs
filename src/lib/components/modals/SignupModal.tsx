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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const isEmailError = email === '';
  const isPasswordError = password === '';

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
              {/*{!isEmailError ? (*/}
              {/*  <FormHelperText>이메일을 입력하셔야 회원가입을 진행 할 수 있습니다.</FormHelperText>*/}
              {/*) : (*/}
              {/*  <FormErrorMessage>Email is required.</FormErrorMessage>*/}
              {/*)}*/}
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
              {/*{!isEmailError ? (*/}
              {/*  <FormHelperText>*/}
              {/*    비밀번호를 입력하셔야 회원가입을 진행 할 수 있습니다.*/}
              {/*  </FormHelperText>*/}
              {/*) : (*/}
              {/*  <FormErrorMessage>password is required.</FormErrorMessage>*/}
              {/*)}*/}
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
