import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Draft from '../../components/Draft';
import { useInfiniteQuery } from 'react-query';
import Send from '../../../utils/Send';
import InfiniteScroll from 'react-infinite-scroll-component';

enum BlogSettingMenu {
  draft = '임시글',
  public = '공개글',
  private = '비공개글',
}

const BlogSettingTab = () => {
  const categoryColor = useColorModeValue('black', 'gray.500');
  const [menuFocus, setMenuFocus] = useState<BlogSettingMenu>(BlogSettingMenu.draft);

  useEffect(() => {
    console.log('BlogSettingTab renderd...');
  }, []);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infiniteDrafts'],
    async ({ pageParam = 0 }) => {
      const response = await Send({
        url: '/drafts',
        method: 'get',
        params: {
          pageNo: pageParam,
        },
      });

      const result = response.data;

      // console.log('draft 인피니트 스크롤 응답');
      // console.log(JSON.stringify(result.data));

      return {
        data: result.data,
        nextPage: pageParam + 1,
        isLast: false,
      };
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      // refetchOnWindowFocus: false,
      // refetchOnMount: true,
      // refetchOnReconnect: true,
      // retry: 1,
    }
  );

  return (
    <>
      <HStack spacing="100px">
        <Box w="20%" h="lg">
          <Heading as="h4" size="md">
            <Text color={categoryColor} isTruncated>
              관리메뉴
            </Text>
          </Heading>
          <Divider mt="3" />
          <VStack align="baseline" spacing="4">
            <Button
              mt="3"
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.draft);
              }}
            >
              임시글 (100)
            </Button>
            <Button
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.public);
              }}
            >
              공개글 (100)
            </Button>
            <Button
              variant="link"
              _hover={{ transform: 'scale(1.10)' }}
              transition={'0.2s ease-in-out'}
              onClick={() => {
                setMenuFocus(BlogSettingMenu.private);
              }}
            >
              비공개글 (100)
            </Button>
            {/*<Divider />*/}
            {/*<Button*/}
            {/*  variant="link"*/}
            {/*  _hover={{ transform: 'scale(1.10)' }}*/}
            {/*  transition={'0.2s ease-in-out'}*/}
            {/*>*/}
            {/*  공개시리즈 (100)*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  variant="link"*/}
            {/*  _hover={{ transform: 'scale(1.10)' }}*/}
            {/*  transition={'0.2s ease-in-out'}*/}
            {/*>*/}
            {/*  비공개시리즈 (100)*/}
            {/*</Button>*/}
          </VStack>
        </Box>
        <Box w="80%" h="lg">
          {/* TODO: 리스트루 출력 해야 한다. */}
          {menuFocus === BlogSettingMenu.draft && status === 'success' && (
            <InfiniteScroll
              dataLength={data?.pages.length * 20}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<h4>Loading...</h4>}
            >
              <VStack>
                {data?.pages.map((page) => (
                  <>
                    {/*{JSON.stringify(page.data)}*/}
                    {page.data.map((draft) => (
                      // <Box>{draft.postId}</Box>
                      <Draft data={draft} />
                    ))}
                  </>
                ))}
              </VStack>
            </InfiniteScroll>
          )}
        </Box>
      </HStack>
    </>
  );
};

export default BlogSettingTab;
