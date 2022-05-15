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
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import UserApi from '../../api/UserApi';

interface signupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface formError {
  email?: string;
  password?: string;
  passwordRepeat?: string;
}

const SignupModal = ({ isOpen, onClose }: signupProps) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

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

              if (!values.passwordRepeat) {
                errors.passwordRepeat = '확인용 비밀번호를 입력하세요.';
              } else if (
                values.password &&
                values.passwordRepeat &&
                values.password !== values.passwordRepeat
              ) {
                errors.passwordRepeat = '비밀번호와 확인용 비밀번호가 일치하지 않습니다.';
              }

              // 벨리데이션에서 빈 객체를 리턴할 경우 submit을 허용한다.
              return errors;
            }}
            onSubmit={async (values, actions) => {
              try {
                await UserApi.signup(values.email, values.password, values.passwordRepeat);
                //  성공 -> 회원가입 모달 창 끄기
                toast({
                  title: `회원가입 성공`,
                  status: 'success',
                  isClosable: true,
                });

                closeModal();
              } catch (error) {
                console.error(error);
                if (error.response && error.response.data) {
                  toast({
                    title: `회원가입 실패 [${error.response.data.message}]`,
                    status: 'error',
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: `회원가입 실패`,
                    status: 'error',
                    isClosable: true,
                  });
                }
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
                  <Field name="passwordRepeat">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.passwordRepeat && form.touched.passwordRepeat}
                      >
                        <FormLabel htmlFor="passwordRepeat">비밀번호 확인</FormLabel>
                        <Input
                          {...field}
                          id="passwordRepeat"
                          placeholder="비밀번호 확인"
                          type="password"
                        />
                        <FormErrorMessage>{form.errors.passwordRepeat}</FormErrorMessage>
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
