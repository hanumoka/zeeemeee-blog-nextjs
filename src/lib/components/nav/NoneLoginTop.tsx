import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
import ThemeToggle from '../layout/ThemeToggle';

type Props = {
  loginOnOpen: () => void;
  signupOnOpen: () => void;
};

const NoneLoginTop = ({ loginOnOpen, signupOnOpen }: Props) => {
  return (
    <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
      <Button
        style={{ marginLeft: 10 }}
        fontSize={'sm'}
        fontWeight={400}
        onClick={loginOnOpen}
        colorScheme="blue"
      >
        로그인
      </Button>
      <Button
        style={{ marginLeft: 10 }}
        fontSize={'sm'}
        fontWeight={400}
        onClick={signupOnOpen}
        colorScheme="pink"
      >
        회원가입
      </Button>
    </Stack>
  );
};

export default NoneLoginTop;
