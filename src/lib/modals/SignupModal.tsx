import React from 'react';
import {
  Box,
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
import { Field, Form, Formik } from 'formik';

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface formError {
  email?: string;
  password?: string;
  password2?: string;
}

const SignupModal = ({ isOpen, onClose }: signupProps) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const closeModal = () => {
    onClose();
  };

  return (
    <Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원가입</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{ email: '', password: '', password2: '' }}
            validate={(values) => {
              const errors: formError = {};

              if (!values.email) {
                errors.email = '이메일을 입력하세요.';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = '이메일을 입력해주세요.';
              }

              if (!values.password) {
                errors.password = '비밀번호를 입력하세요.';
              } else if (!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/i.test(values.password)) {
                errors.password = '8 ~ 16자 영문, 숫자 조합의 비밀번호를 입력해주세요.';
              }

              if (!values.password2) {
                errors.password2 = '확인용 비밀번호를 입력하세요.';
              } else if (
                values.password &&
                values.password2 &&
                values.password !== values.password2
              ) {
                errors.password2 = '비밀번호와 확인용 비밀번호가 일치하지 않습니다.';
              }

              // 벨리데이션에서 빈 객체를 리턴할 경우 submit을 허용한다.
              return errors;
            }}
            onSubmit={(values, actions) => {
              console.log('회원가입 제출');
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props) => (
              <Form>
                <ModalBody pb={6}>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="이메일" type="email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel htmlFor="password">비밀번호</FormLabel>
                        <Input {...field} id="password" placeholder="비밀번호" type="password" />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password2">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password2 && form.touched.password2}>
                        <FormLabel htmlFor="password2">비밀번호 확인</FormLabel>
                        <Input
                          {...field}
                          id="password2"
                          placeholder="비밀번호 확인"
                          type="password"
                        />
                        <FormErrorMessage>{form.errors.password2}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} isLoading={props.isSubmitting} type="submit">
                    회원가입
                  </Button>
                  <Button onClick={closeModal}>취소</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SignupModal;
