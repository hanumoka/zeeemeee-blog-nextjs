import React from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Post from './Post';
import { useInfiniteQuery } from 'react-query';
import Send from '../../../utils/Send';
import InfiniteScroll from 'react-infinite-scroll-component';

const BlogPostTab = () => {
  const categoryColor = useColorModeValue('black', 'gray.500');

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infinitePosts'],
    async ({ pageParam = 0 }) => {
      const response = await Send({
        url: '/posts',
        method: 'get',
        params: {
          pageNo: pageParam,
          pageSize: 10,
        },
      });

      const result = response.data;
      const { pages, pageNo, pageSize, totalElements, totalPages, last } = result.data;

      return {
        data: pages,
        nextPage: pageParam + 1,
        isLast: last,
      };
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  );

  return (
    <div>
      <Box>
        <HStack spacing="100px">
          <Box w="20%" h="lg">
            <Heading as="h4" size="md">
              <Text color={categoryColor} isTruncated>
                태그목록
              </Text>
            </Heading>
            <Divider mt="3" />
            <VStack align="baseline">
              <Button mt="3" variant="link">
                전체보기 (카운트)
              </Button>
              <Button mt="3" variant="link">
                공개 (카운트)
              </Button>
              <Button mt="3" variant="link">
                비공개 (카운트)
              </Button>
            </VStack>
          </Box>
          <Box w="80%" h="lg">
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                <Input type="text" placeholder="검색어를 입력하세요.(미개발)" />
              </InputGroup>
            </Box>
            {status === 'success' && (
              <InfiniteScroll
                dataLength={data?.pages.length * 20}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
              >
                <VStack mt={5} spacing={4} align="stretch">
                  {data?.pages.map((pageData) => {
                    return pageData?.data.map((postData) => {
                      return <Post data={postData} />;
                    });
                  })}
                </VStack>
              </InfiniteScroll>
            )}
          </Box>
        </HStack>
      </Box>
    </div>
  );
};

export default BlogPostTab;
