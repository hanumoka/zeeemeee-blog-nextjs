import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { NextPage } from 'next';

import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastEditor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // 다크테마
import { Box, Flex } from '@chakra-ui/react';
import { EditorPlugin } from '@toast-ui/editor/types/editor';
import PostApi from '../../../api/PostApi';
import ImageApi from '../../../api/ImageApi';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
  markdownStr: string;
  setMarkdownStr: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

const Editor: NextPage<IEditor> = ({ htmlStr, setHtmlStr, markdownStr, setMarkdownStr, theme }) => {
  const editorRef = useRef<ToastEditor>(null);

  useEffect(() => {
    if (editorRef.current) {
      // 전달받은 html값으로 초기화
      editorRef.current.getInstance().setHTML(htmlStr);
      // 에디터의 마크다운 원본 상태 셋팅
      editorRef.current.getInstance().setMarkdown(markdownStr);

      // 기존 이미지 업로드 기능 제거
      editorRef.current.getInstance().removeHook('addImageBlobHook');
      // 이미지 서버로 데이터를 전달하는 기능 추가
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        (async () => {
          const formData = new FormData();
          formData.append('files', blob);

          // const res = await axios.post('http://localhost:8080/api/uploadImage', formData, {
          //   withCredentials: true,
          // });
          const res = await ImageApi.uploadPostImage(formData);
          callback(res.data, 'input alt text');
        })();

        return false;
      });
    }

    //TODO: 주의 절대 의종성 추가 하지 말것.
  }, []);

  // Editor Change 이벤트
  const onChangeEditor = () => {
    if (editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML());
      setMarkdownStr(editorRef.current.getInstance().getMarkdown());
    }
  };

  const plugins: EditorPlugin[] = [colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]];

  return (
    <>
      <Flex>
        <Box p="4" w="100%">
          <>
            <ToastEditor
              initialValue=""
              previewStyle="vertical"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              plugins={plugins}
              onChange={onChangeEditor}
              theme={theme}
              height="500px"
            />
          </>
        </Box>
      </Flex>
    </>
  );
};

export default Editor;

// style
// const CustomReactQuill = styled(ToastEditor)`
//   height: 300px;
// `;
