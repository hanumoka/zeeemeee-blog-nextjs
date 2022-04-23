import React, { useCallback } from 'react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import ThemeToggle from '../components/layout/ThemeToggle';
import { FiBell, FiChevronDown, BsPencilSquare } from 'react-icons/all';
import { useRouter } from 'next/router';

type Props = {
  nickname: string;
  profileImageUri: string;
  logoutFetch: () => void;
};

const LoginTop = ({ nickname, profileImageUri, logoutFetch }: Props) => {
  const router = useRouter();

  const logout = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await logoutFetch();
        router.push('/');
      } catch (error) {
        console.error('로그아웃 error');
      }
    },
    [logoutFetch]
  );

  return (
    <HStack flex={{ base: 1 }} justify={'flex-end'} direction={'row'} spacing={6}>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
      {/*<IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />*/}
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<BsPencilSquare />}
        onClick={(e) => {
          e.preventDefault();
          router.push('/write');
        }}
      />
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
            <HStack>
              {profileImageUri ? (
                <Avatar size={'sm'} src={profileImageUri} />
              ) : (
                <Avatar size={'sm'} name={nickname} />
              )}
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{nickname}</Text>
                {/*<Text fontSize="xs" color="gray.600">*/}
                {/*  Admin*/}
                {/*</Text>*/}
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                router.push('/blog');
              }}
            >
              Blog
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                router.push('/setting');
              }}
            >
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default LoginTop;
