import React from 'react';

import {
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
  useToast,
} from '@chakra-ui/react';
import loginStore from '../../stores/loginStore';
import { Field, Form, Formik } from 'formik';

interface formError {
  email?: string;
  password?: string;
}

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: signupProps) => {
  const { loginFetch } = loginStore((state) => state);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();

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
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ email: '', password: '', passwordRepeat: '' }}
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
              // 벨리데이션에서 빈 객체를 리턴할 경우 submit을 허용한다.
              return errors;
            }}
            onSubmit={async (values, actions) => {
              // await loginFetch(values.email, values.password);
              // actions.setSubmitting(false);
              try {
                await loginFetch(values.email, values.password);
                toast({
                  title: `로그인 성공`,
                  status: 'success',
                  isClosable: true,
                  duration: 2000,
                });

                onClose();
              } catch (error) {
                console.error(error);
                toast({
                  title: `로그인 실패`,
                  status: 'error',
                  isClosable: true,
                  duration: 2000,
                });
              } finally {
                actions.setSubmitting(false);
              }
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
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} isLoading={props.isSubmitting} type="submit">
                    로그인
                  </Button>
                  <Button onClick={onClose}>취소</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginModal;
