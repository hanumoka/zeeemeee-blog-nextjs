import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import loginStore from '../stores/loginStore';
import { useColorMode } from '@chakra-ui/react';

export { getServerSideProps } from '../stores/globalStore'; // TODO: 기묘하도다

const Editor = dynamic(() => import('../lib/components/Editor'), {
  ssr: false,
  loading: () => <p>에디터 준비중...</p>,
}); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const Markdown = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  const { colorMode } = useColorMode();
  const [view, setView] = useState(true);

  useEffect(() => {
    loginStore.getState().setLoginInfo(loginInfo.username, loginInfo.nickname);
  }, [loginInfo.username, loginInfo.nickname]);

  useEffect(() => {
    // 다트모드 변경을 위해서 강제로 에디터를 지운다.
    setView(false);
  }, [colorMode]);

  useEffect(() => {
    // 모드변경시 지워진 에디터를 다시 그린다.
    if (!view) {
      setView(true);
    }
  }, [view]);

  // state
  const [htmlStr, setHtmlStr] = React.useState<string>('');

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
      <EditorContainer>
        {view && <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} theme={colorMode} />}
      </EditorContainer>

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

export default Markdown;

// style
const EditorContainer = styled.div`
  width: 800px;
  height: 400px;

  margin: 0 auto;
`;

const Contents = {
  Container: styled.div`
    width: 1200px;

    margin: 0 auto;

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
