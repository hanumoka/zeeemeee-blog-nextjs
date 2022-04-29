import React, { useEffect } from 'react';
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
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Spacer,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Send from '../../../utils/Send';
import { withAuthPostServer } from '../../../hoc/withAuthPostServer';

const MarkdownView = dynamic(() => import('../../../lib/components/Editor/MarkdownView'), {
  ssr: false,
});

const PostPage = ({ loginInfo, pageProps }) => {
  console.log('postPage start...');

  const router = useRouter();
  const { colorMode } = useColorMode();
  const { sebureUri, postUri } = router.query;
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  const { title, content, tags, statusCode } = pageProps || {};

  useEffect(() => {
    if (statusCode === 404) {
      router.push('/404');
    }
  }, [router, statusCode]);

  return (
    <>
      <Box mt="100">
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          as="h3"
          size="xl"
          textAlign="center"
        >
          {title}
          {/*제목*/}
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
        {/*{tags.map((x) => (*/}
        {/*  <Badge key={x} fontSize={'1.5em'}>*/}
        {/*    {x}*/}
        {/*  </Badge>*/}
        {/*))}*/}
      </Stack>
      <Divider />
      <MarkdownView markdownStr={''} theme={colorMode} />

      <Divider />
      <Center>
        <HStack mt="10" mb="5">
          <Avatar size="xl" name="hanumoka" />
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

export const getServerSideProps = withAuthPostServer(async (context: any) => {
  console.log('PostViewPage getServerSideProps ...');

  // TODO: 이곳에서 서버사이드 리퀘스트를 한다.
  // TODO: 글이 Pivate인 경우, 요청자와 글의 소유자를 체크해야 한다. => 통계, 수정, 삭제 가능해야 한다.
  // TODO: public인 경우 누구나 볼수 있어야 한다.

  // console.log('context');
  // console.dir(context);

  const cookie = context.req ? context.req.headers.cookie : '';
  const res = context.res;

  const { sebureUri, postUri } = context.query;
  console.log('sebureUri:' + sebureUri);
  console.log('postUri:' + postUri);

  console.log('cookie:' + cookie);

  const response = await Send({
    url: '/public',
    method: 'get',
    params: {
      sebureUri: sebureUri,
      postUri: postUri,
    },
    withCredentials: true,
    headers: {
      Cookie: cookie || '',
    },
  });

  console.log('======data========');
  console.log(response.data);

  if (response.data && response.data.data) {
    console.log('렌더링할 데이터 있음');
    const { title, content, tags } = response.data.data;
    return {
      props: { title: title, content: content, tags: tags, statusCode: 200 },
    };
  } else {
    console.log('렌더링할 데이터 없음=========================');
    console.log('111');
    console.log(response.data);
    console.log('222');
    console.log(response.data.data);
    res.statusCode = 404; // 404 응답값을 리턴하지만, 페이지 리다이렉팅은 안된다.

    return {
      props: { title: '', content: '', tags: [], statusCode: 404 },
    };
    // res.writeHead(302, {
    //   // or 301
    //   Location: 'localized/url/product/categories',
    // });
    // res.end();
  }
});

export default PostPage;
