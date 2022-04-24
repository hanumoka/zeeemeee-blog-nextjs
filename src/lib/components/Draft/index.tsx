import React from 'react';
import Moment from 'react-moment';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  Badge,
  useColorMode,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';

const MarkdownView = dynamic(() => import('../Editor/MarkdownView'), {
  ssr: false,
});

const Index = ({ data }) => {
  const { colorMode } = useColorMode();
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  const { title, content, tags, createdAt, updatedAt } = data;

  return (
    <Box
      maxW={'800px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      borderWidth="1px"
      borderRadius="lg"
      transitionProperty="shadow"
      transitionDuration="1"
      transitionTimingFunction="ease-in-out"
      _hover={{ borderColor: 'teal.600', shadow: '2xl' }}
      onClick={(e) => {
        e.stopPropagation();
        alert('글 클릭');
      }}
    >
      <Stack>
        <Stack direction={'row'}>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            임시글
          </Text>
          {tags.map((tag) => {
            return (
              <Badge key={tag} px={2} py={1} bg={badgeColor} fontWeight={'400'} variant="outline">
                {tag}
              </Badge>
            );
          })}
        </Stack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {title}
        </Heading>
        {/*<MarkdownView markdownStr={content} theme={colorMode} />*/}
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          {/*<Text fontWeight={600}>Hanumoka</Text>*/}
          <Text color={'gray.500'}>
            작성일: <Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment> / 수정일 :{' '}
            <Moment format="YYYY-MM-DD HH:mm:ss">{updatedAt}</Moment>
          </Text>
        </Stack>
      </Stack>
      <Stack mt="5" direction={{ base: 'column', md: 'row' }}>
        <Button
          variant="outline"
          colorScheme="blue"
          onClick={(e) => {
            e.stopPropagation();
            alert('수정하기');
          }}
        >
          수정하기
        </Button>
        <Button
          variant="outline"
          colorScheme="green"
          onClick={(e) => {
            e.stopPropagation();
            alert('출간하기');
          }}
        >
          출간하기
        </Button>
        <Button
          type="button"
          variant="outline"
          colorScheme="red"
          onClick={(e) => {
            e.stopPropagation();
            alert('삭제하기');
          }}
        >
          삭제하기
        </Button>
      </Stack>
    </Box>
  );
};

export default Index;
