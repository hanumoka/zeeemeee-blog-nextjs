// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';
import { Box, Flex, useColorMode } from '@chakra-ui/react';
import Toc from './Toc';

const MarkdownView2 = ({ markdownStr }) => {
  const { colorMode } = useColorMode();

  const [rehypePlugins, setRehypePlugins] = useState([
    [rehypeRaw, rehypeHighlight, { ignoreMissing: true }],
  ]);
  const [remarkPlugins, setRemarkPlugins] = useState([remarkGfm, remarkSlug, remarkToc]);
  return (
    <>
      <Flex>
        <Box p="4" w="100%">
          {colorMode === 'dark' ? (
            <ReactMarkdown
              className="markdown-body markdown-dark"
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
              children={markdownStr}
            />
          ) : (
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={remarkPlugins}
              rehypePlugins={rehypePlugins}
              children={markdownStr}
            />
          )}
        </Box>
        {/*<Box w="10%">*/}
        {/*  <Box*/}
        {/*    position="fixed"*/}
        {/*    // backgroundColor="rgba(255,255,255,0.8)"*/}
        {/*    // backdropFilter="saturate(180%) blur(5px)"*/}
        {/*    w={{ base: '0%', md: '10%', lg: '15%' }}*/}
        {/*    h="30%"*/}
        {/*    // marginY="10%"*/}
        {/*    overflow="hidden"*/}
        {/*  >*/}
        {/*    /!* TODO: TOC 추가 개발을 해야한다.*!/*/}
        {/*    /!*<Toc content={markdownStr || ''} />*!/*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </Flex>
    </>
  );
};

export default MarkdownView2;
