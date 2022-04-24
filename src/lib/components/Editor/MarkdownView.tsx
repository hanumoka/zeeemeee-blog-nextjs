import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // 다크테마
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

const MarkdownView = ({ markdownStr, theme }) => {
  console.log('theme:' + theme);
  return (
    <>
      <Flex>
        <Box p="4" w="100%">
          <Viewer initialValue={markdownStr} theme={theme} />
        </Box>
      </Flex>
    </>
  );
};

export default MarkdownView;
