import React, { useEffect } from 'react';
import loginStore from '../stores/loginStore';
import { useRouter } from 'next/router';
import CustomEditor from '../lib/components/editor/CustomEditor';
import dynamic from 'next/dynamic';
import { Button, ButtonGroup, Center, useColorMode } from '@chakra-ui/react';
import styled from 'styled-components';
import layoutStore from '../stores/layoutStore';
import remarkToc from 'remark-toc';
import { remark } from 'remark';

export { getServerSideProps } from '../stores/serverStore'; // TODO: 기묘하도다

const Editor = dynamic(() => import('../lib/components/Editor'), {
  ssr: false,
  loading: () => <p>에디터 준비중...</p>,
}); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Write = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  const { offLayout, onLayout } = layoutStore((state) => state);
  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    // 레이아웃 off
    offLayout();
    return () => {
      onLayout();
    };
  }, []);

  useEffect(() => {
    // 로그인 유지
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);

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

  return (
    <>
      <CustomEditor />

      <Editor
        htmlStr={htmlStr}
        setHtmlStr={setHtmlStr}
        markdownStr={markdownStr}
        setMarkdownStr={setMarkdownStr}
        theme={colorMode}
      />
      <div>
        <Center>
          <ButtonGroup variant="outline" spacing="6">
            <Button
              onClick={async () => {
                console.log('===저장 파라미터===');
                const file = await remark().use(remarkToc).process(markdownStr);
                console.log(String(file));
              }}
              colorScheme="blue"
              size="md"
              // height="48px"
              // width="200px"
              border="2px"
            >
              저장
            </Button>
            <Button
              onClick={async () => {
                console.log('===저장 파라미터===');
                const file = await remark().use(remarkToc).process(markdownStr);
                console.log(String(file));
              }}
              colorScheme="teal"
              size="md"
              // height="48px"
              // width="200px"
              border="2px"
            >
              저장하고 나가기
            </Button>
            <Button
              colorScheme="red"
              size="md"
              // height="48px"
              // width="200px"
              border="2px"
              onClick={() => {
                router.back();
              }}
            >
              나가기
            </Button>
          </ButtonGroup>
        </Center>
      </div>
      <Contents.Container>
        <Contents.HtmlContainer>
          <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
          {htmlStr}
        </Contents.HtmlContainer>

        <Contents.ViewContainer ref={viewContainerRef} />
      </Contents.Container>
    </>
  );
};

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
