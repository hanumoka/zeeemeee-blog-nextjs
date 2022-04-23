import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Draft from '../../components/Draft';

enum BlogSettingMenu {
  draft = '임시글',
  public = '공개글',
  private = '비공개글',
}

const BlogSettingTab = () => {
  const categoryColor = useColorModeValue('black', 'gray.500');
  const [menuFocus, setMenuFocus] = useState<BlogSettingMenu>(BlogSettingMenu.draft);
  return (
    <>
      <HStack spacing="100px">
        <Box w="20%" h="lg">
          <Heading as="h4" size="md">
            <Text color={categoryColor} isTruncated>
              관리메뉴
            </Text>
          </Heading>
          <Divider mt="3" />
          <VStack align="baseline" spacing="4">
            <Button
              mt="3"
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.draft);
              }}
            >
              {/* TODO: 임시글을 백엔드에서 조회 해야 한다. */}
              임시글 (100)
            </Button>
            <Button
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.public);
              }}
            >
              공개글 (100)
            </Button>
            <Button
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.private);
              }}
            >
              비공개글 (100)
            </Button>
            {/*<Divider />*/}
            {/*<Button*/}
            {/*  variant="link"*/}
            {/*  _hover={{ transform: 'scale(1.10)' }}*/}
            {/*  transition={'0.2s ease-in-out'}*/}
            {/*>*/}
            {/*  공개시리즈 (100)*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  variant="link"*/}
            {/*  _hover={{ transform: 'scale(1.10)' }}*/}
            {/*  transition={'0.2s ease-in-out'}*/}
            {/*>*/}
            {/*  비공개시리즈 (100)*/}
            {/*</Button>*/}
          </VStack>
        </Box>
        <Box w="80%" h="lg">
          {/* TODO: 리스트루 출력 해야 한다. */}
          {menuFocus === BlogSettingMenu.draft && (
            <VStack>
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
              <Draft />
            </VStack>
          )}
        </Box>
      </HStack>
    </>
  );
};

export default BlogSettingTab;
