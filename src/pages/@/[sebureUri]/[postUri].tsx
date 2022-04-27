import React from 'react';
import { useRouter } from 'next/router';
import { withAuthServer } from '../../../hoc/withAuthServer';
import dynamic from 'next/dynamic';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  space,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const MarkdownView = dynamic(() => import('../../../lib/components/Editor/MarkdownView'), {
  ssr: false,
});

const PostPage = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { sebureUri, postUri } = router.query;
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  const content =
    '# 재목\n' +
    '\n' +
    '가나다라\n' +
    '\n' +
    '호호호\n' +
    '\n' +
    '```\n' +
    'int a = 1234\n' +
    '\n' +
    'System.out.println(a)\n' +
    '```\n' +
    '\n' +
    '![input alt text](http://localhost:8080/api/getImage/16510142135732951/png)';

  return (
    <>
      {/*<Flex*/}
      {/*  position="fixed"*/}
      {/*  backgroundColor="rgba(255,255, 255, 0.8)"*/}
      {/*  backdropFilter="saturate(180%) blur(5px)"*/}
      {/*  w="15%"*/}
      {/*  h="50%"*/}
      {/*  ml="60%"*/}
      {/*>*/}
      {/*  스티키?2222*/}
      {/*</Flex>*/}
      <Box mt="100">
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          as="h1"
          size="4xl"
          textAlign="center"
          isTruncated
        >
          제목
        </Heading>
      </Box>
      <Stack mt={10} mb={2} direction="row" spacing={4} align="center">
        <Button colorScheme="gray" variant="link">
          작성자아이디
        </Button>
        <Box>/</Box>
        <Box>작성일 : 2020년 4월 27일</Box>
        <Box>수정일 : 2020년 4월 27일</Box>
        <Spacer />
        <HStack p={5}>
          <Box>
            <Button colorScheme="teal" variant="link">
              통계
            </Button>
          </Box>
          <Box>
            <Button colorScheme="blue" variant="link">
              수정
            </Button>
          </Box>
          <Box>
            <Button colorScheme="red" variant="link">
              삭제
            </Button>
          </Box>
        </HStack>
      </Stack>
      <Stack direction="row" mb={10}>
        <Badge fontSize={'1.5em'}>Default</Badge>
        <Badge fontSize={'1.5em'} colorScheme="green">
          Success
        </Badge>
        <Badge fontSize={'1.5em'} colorScheme="red">
          Removed
        </Badge>
        <Badge fontSize={'1.5em'} colorScheme="purple">
          New
        </Badge>
      </Stack>
      <Divider />
      <Box>
        <MarkdownView markdownStr={content} theme={colorMode} />
      </Box>

      <Divider />
      <Center>
        <HStack mt="10" mb="5">
          <Avatar size="2xl" name="hanumoka" />
          <FormControl>
            <Box>
              <Heading as="h2" size="xl">
                작성자
              </Heading>
            </Box>
            <Box>
              <FormHelperText>자기소개</FormHelperText>
            </Box>
          </FormControl>
        </HStack>
      </Center>

      {/*<div>댓글자리</div>*/}
      {/*<div>비슷한 카테고리 포스트 추천(TODO)</div>*/}
    </>
  );
};

export const getServerSideProps = withAuthServer((context: any) => {
  console.log('PostViewPage getServerSideProps ...');
  // TODO: 이곳에서 서버사이드 리퀘스트를 한다.
  // TODO: 글이 Pivate인 경우, 요청자와 글의 소유자를 체크해야 한다. => 통계, 수정, 삭제 가능해야 한다.
  // TODO: public인 경우 누구나 볼수 있어야 한다.
  // console.log('query:' + context.query.postId);
  // const { postId } = context.query;
  //
  // if (postId) {
  //   return { props: { postId: postId } };
  // } else {
  //   return { props: { postId: '' } };
  // }
  return { props: { test: 'PostViewPage 서버 응답' } };
});

export default PostPage;
