import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Box, Container, FormControl, Input } from '@chakra-ui/react';
import ChakraTagInput from '../ChakraTagInput';

const CustomEditor = () => {
  const [tags, setTags] = useState(['foo', 'bar']);
  const handleTagsChange = useCallback((event: SyntheticEvent, tags: string[]) => {
    setTags(tags);
  }, []);
  return (
    <>
      <Container maxW="container.lg">
        <Box padding="4" w="100%">
          <FormControl>
            <Input variant="flushed" placeholder="제목을 입력하세요." size="lg" />
            <ChakraTagInput
              tags={tags}
              onTagsChange={handleTagsChange}
              size="lg"
              placeholder="태그를 입력하세요."
              variant="flushed"
            />
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default CustomEditor;
