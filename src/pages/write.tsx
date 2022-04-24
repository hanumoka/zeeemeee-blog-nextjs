import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Textarea,
  useColorMode,
  useDisclosure,
  Image,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import styled from 'styled-components';
import layoutStore from '../stores/layoutStore';
import remarkToc from 'remark-toc';
import { remark } from 'remark';
import ChakraTagInput from '../lib/components/ChakraTagInput';
import { withAuthServer } from '../hoc/withAuthServer';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useMutation } from 'react-query';
import Send from '../utils/Send';

const Editor = dynamic(() => import('../lib/components/Editor/Editor'), {
  ssr: false,
  loading: () => <p>에디터 준비중...</p>,
}); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Write = ({ loginInfo, pageProps }) => {
  const [postId, setPostId] = useState(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [readyEditor, setReadyEditor] = useState(false);

  const handleTagsChange = useCallback((event: SyntheticEvent, tags: string[]) => {
    setTags(tags);
  }, []);

  const { offLayout, onLayout } = layoutStore((state) => state);
  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    // 레이아웃 off
    offLayout();
    return () => {
      onLayout();
    };
  }, [offLayout, onLayout]);

  useEffect(() => {
    const { postId } = pageProps;

    if (postId) {
      // TODO : 나중에 리팩토링 할것 이런부분도 react-query를 사용할 필요가 있는가?
      const tmpFetch = async () => {
        const response = await Send({
          url: '/post',
          method: 'get',
          params: {
            postId: postId,
          },
        });

        const result = response.data;
        if (result.data) {
          const { postId, title, content, tags } = result.data;
          setPostId(postId);
          setTitle(title);
          setTags(tags);
          setMarkdownStr(content);
        }
      };

      tmpFetch();
    } // if

    console.log('에디터 초기화 완료');
    // TODO: 조회된 포스트 저보가 에디터에 출력 안됨 => setTimeout으로 처리, 서버사이드를 하든 다른 방법을 쓰는게 좋아 보인다.
    const timeout = setTimeout(() => setReadyEditor(true), 1000);
    return () => clearTimeout(timeout);
  }, [pageProps]);

  // state
  const [htmlStr, setHtmlStr] = React.useState<string>('');
  const [markdownStr, setMarkdownStr] = React.useState<string>('');

  // ref
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  React.useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const { isOpen, onOpen, onClose } = useDisclosure(); // 출간하기 drawer 상태
  const [images, setImages] = useState([]);

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
  };

  const saveDraft = useMutation(
    (param: any) =>
      Send({
        url: '/draft',
        method: 'post',
        data: param,
      }),
    {
      onMutate: (variable) => {
        console.log('onMutate', variable);
      },
      onError: (error, variable, context) => {
        // error
        console.error(error);
      },
      onSuccess: (data, variables, context) => {
        console.log('success', data, variables, context);
        setPostId(data.data.data.postId);
        setTags([...data.data.data.tags]);
      },
      onSettled: () => {
        console.log('end');
      },
    }
  );

  const handleSubmit = useCallback(async () => {
    const content = await remark().use(remarkToc).process(markdownStr);

    saveDraft.mutate({
      postId: postId,
      title,
      content: content.value,
      tags,
    });
  }, [markdownStr, saveDraft, postId, title, tags]);

  return (
    <>
      <Container maxW="container.lg">
        <Box padding="4" w="100%">
          <FormControl>
            <Input
              mb="5"
              variant="flushed"
              placeholder="제목을 입력하세요."
              size="lg"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            />
            <ChakraTagInput
              tags={tags}
              onTagsChange={handleTagsChange}
              size="md"
              placeholder="태그를 입력하세요."
              variant="flushed"
            />
          </FormControl>
        </Box>
      </Container>
      {readyEditor ? (
        <Editor
          htmlStr={htmlStr}
          setHtmlStr={setHtmlStr}
          markdownStr={markdownStr}
          setMarkdownStr={setMarkdownStr}
          theme={colorMode}
        />
      ) : (
        <Spinner size="xl" />
      )}

      <Box>
        <Center>
          <ButtonGroup variant="outline" spacing="6">
            <Button onClick={handleSubmit} colorScheme="blue" size="md" border="2px">
              임시저장
            </Button>
            <Button onClick={onOpen} colorScheme="teal" size="md" border="2px">
              출간하기
            </Button>
            <Button
              colorScheme="red"
              size="md"
              border="2px"
              onClick={() => {
                // TODO: 쿠키가 있는 상태에서 write 패키지 진입후 나가기가 안된다. (router 히스토리가 없기 때문에)
                router.back();
              }}
            >
              나가기
            </Button>
          </ButtonGroup>
        </Center>
      </Box>
      <Contents.Container>
        <Contents.HtmlContainer>
          <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
          {htmlStr}
        </Contents.HtmlContainer>
        {/* TODO: 이부분 삭제 하지 말것 나중에 글 읽을때 사용하면 될듯 */}
        <Contents.ViewContainer ref={viewContainerRef} />
      </Contents.Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">포스트 출간준비</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">포스트 썸네일</FormLabel>
                <ImageUploading value={images} onChange={onChange} maxNumber={1}>
                  {({ imageList, onImageUpload, onImageRemoveAll }) => (
                    <Box>
                      <HStack>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            onImageRemoveAll();
                            onImageUpload();
                          }}
                        >
                          이미지 업로드
                        </Button>
                        <Button colorScheme="red" onClick={onImageRemoveAll}>
                          이미지 제거
                        </Button>
                      </HStack>
                      <Box boxSize="xs" mt="5">
                        {imageList.map((image, index) => (
                          <Image
                            src={image.dataURL}
                            fallbackSrc="https://via.placeholder.com/250"
                            // alt="Dan Abramov"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        ))}

                        {(!imageList || (imageList && imageList.length === 0)) && (
                          <Image fallbackSrc="https://via.placeholder.com/300" />
                        )}
                      </Box>
                    </Box>
                  )}
                </ImageUploading>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">포스트 요약정보</FormLabel>
                <Textarea id="desc" placeholder="작성하신 포스트를 간단히 설명해주세요." />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Url 설정</FormLabel>
                <InputGroup>
                  <InputLeftAddon>/@hanumoka/</InputLeftAddon>
                  <Input type="url" id="url" placeholder="디폴트로 제목을가져온다." />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">공개설정</FormLabel>
                <Select id="owner" defaultValue="private">
                  <option value="private">비공개</option>
                  <option value="public">전체공개</option>
                </Select>
              </Box>

              {/*<Box>*/}
              {/*  <FormLabel htmlFor="owner">시리즈 설정</FormLabel>*/}
              {/*</Box>*/}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue">출간하기</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const getServerSideProps = withAuthServer((context: any) => {
  console.log('Write getServerSideProps ...');
  // console.log('query:' + context.query.postId);
  const { postId } = context.query;
  console.log('postId:' + postId);

  if (postId) {
    return { props: { postId: postId } };
  } else {
    return { props: { postId: '' } };
  }
});

export default Write;

// style
// const EditorContainer = styled.div`
//   width: 900px;
//   height: 400px;
//
//   margin: 0 auto;
// `;

const Contents = {
  Container: styled.div`
    width: 1200px;

    margin: 15px auto;

    display: flex;
    gap: 40px;

    & > div {
      width: 600px;

      padding: 16px;

      box-sizing: border-box;

      line-break: anywhere;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid olive;

    & pre {
      margin: 0;
    }

    // quill에서 코드 블럭을 사용한 경우
    .toastui-editor-ww-code-block {
      background-color: #f4f7f8;
      padding: 18px;
      margin: 2px 0 8px;
    }
  `,
};
