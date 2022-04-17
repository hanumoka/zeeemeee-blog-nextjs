import React from 'react';
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
import ThemeToggle from '../layout/ThemeToggle';
import { FiBell, FiChevronDown, BsPencilSquare } from 'react-icons/all';
import { useRouter } from 'next/router';

type Props = {
  nickname: string;
  logoutFetch: () => void;
};

const LoginTop = ({ nickname, logoutFetch }: Props) => {
  const router = useRouter();
  return (
    <HStack flex={{ base: 1 }} justify={'flex-end'} direction={'row'} spacing={6}>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
      <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
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
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
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
                router.push('/workspace');
              }}
            >
              Workspace
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
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                logoutFetch();
                router.push('/');
              }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default LoginTop;
