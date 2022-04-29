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
import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Toc from './Toc';
import { remark } from 'remark';
import remarkToc from 'remark-toc';

const MarkdownView = ({ markdownStr, theme }) => {
  console.log('theme:' + theme);

  const testMark = async () => {
    console.log('testMark...');
    const ret = await remark().use(remarkToc).process(markdownStr);
    console.log(ret);
  };

  return (
    <>
      <Flex>
        <Button onClick={testMark}>테스트</Button>
        <Box p="4" w="90%">
          <Viewer initialValue={markdownStr} theme={theme} />
        </Box>
        <Box w="10%">
          <Box
            position="fixed"
            // backgroundColor="rgba(255,255,255,0.8)"
            // backdropFilter="saturate(180%) blur(5px)"
            w={{ base: '0%', md: '10%', lg: '15%' }}
            h="30%"
            // marginY="10%"
            overflow="hidden"
          >
            <Toc content={markdownStr} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default MarkdownView;
