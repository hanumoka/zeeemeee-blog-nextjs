import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import Moment from 'react-moment';
import { remark } from 'remark';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import MarkdownView2 from '../../../lib/components/Editor/MarkdownView2';

const MarkdownView = dynamic(() => import('../../../lib/components/Editor/MarkdownView'), {
  ssr: false,
});

const PostPage = ({ loginInfo, pageProps }) => {
  console.log('postPage start...');

  const router = useRouter();
  const { colorMode } = useColorMode();
  const { sebureUri, postUri } = router.query;
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  const {
    title,
    content,
    tags,
    createdAt,
    updatedAt,
    writerProfileImageUri,
    writerNickname,
    writerIntroduction,
    writerSebureUri,
    isMine,
    statusCode,
  } = pageProps || {};

  useEffect(() => {
    if (statusCode === 404) {
      router.push('/404');
    }
  }, [router, statusCode]);

  useEffect(() => {
    // const content = await remark().use(remarkToc).process(markdownStr);
  }, []);

  const goWriterPage = useCallback(() => {
    alert('작성자 페이지 이동');
  }, []);

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
        </Heading>
      </Box>
      <Stack mt={10} mb={2} direction="row" spacing={4} align="center">
        <Button colorScheme="gray" variant="link" onClick={goWriterPage}>
          {writerNickname}
        </Button>
        <Box>/</Box>
        <Box>
          작성일 : <Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment>
        </Box>
        <Box>
          수정일 : <Moment format="YYYY-MM-DD HH:mm:ss">{updatedAt}</Moment>
        </Box>
        <Spacer />
        {isMine && (
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
        )}
      </Stack>
      <Stack direction="row" mb={10}>
        {tags.map((x) => (
          <Badge key={x} fontSize={'1.5em'}>
            {x}
          </Badge>
        ))}
      </Stack>
      <Divider />
      {/*<MarkdownView markdownStr={content} theme={colorMode} />*/}
      {/*<Divider />*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<div>=====================================</div>*/}
      {/*<br />*/}
      {/*<br />*/}
      <MarkdownView2 markdownStr={content} />
      <Center>
        <HStack mt="10" mb="5">
          <Avatar size="xl" name="hanumoka" src={writerProfileImageUri} />
          <FormControl>
            <Box>
              <Button variant="link" onClick={goWriterPage}>
                <Heading size="xl">{writerNickname}</Heading>
              </Button>
            </Box>
            <Box>
              <FormHelperText>{writerIntroduction}</FormHelperText>
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

  const cookie = context.req ? context.req.headers.cookie : '';
  const res = context.res;

  const { sebureUri, postUri } = context.query;

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

  if (response.data && response.data.data) {
    console.log('렌더링할 데이터 있음');
    const {
      title,
      content,
      tags,
      createdAt,
      updatedAt,
      writerProfileImageUri,
      writerNickname,
      writerIntroduction,
      writerSebureUri,
      isMine,
    } = response.data.data;

    return {
      props: {
        title: title,
        content: content,
        tags: tags,
        createdAt: createdAt,
        updatedAt: updatedAt,
        writerProfileImageUri: writerProfileImageUri,
        writerNickname: writerNickname,
        writerIntroduction: writerIntroduction,
        writerSebureUri: writerSebureUri,
        isMine: isMine,
        statusCode: 200,
      },
    };
  } else {
    console.log('렌더링할 데이터 없음=========================');
    // 보여줄 데이터가 없는 경우 404 페이지 오류 발생시킨다.

    // console.log(response.data);
    // console.log(response.data.data);
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
