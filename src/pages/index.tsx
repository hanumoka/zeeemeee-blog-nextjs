import React from 'react';
import Head from 'next/head';
import { withAuthServer } from '../hoc/withAuthServer';
import { Box, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Send from '../utils/Send';
import Post from '../lib/pages/index/Post';

const Home = ({ loginInfo, pageProps }) => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infinitePublics'],
    async ({ pageParam = 0 }) => {
      const response = await Send({
        url: '/publics',
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
    <>
      <Head>
        <title>Sebure/home</title>
      </Head>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>최신</Tab>
          <Tab>트렌딩</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              {status === 'success' && (
                <InfiniteScroll
                  dataLength={data?.pages.length * 20}
                  next={fetchNextPage}
                  hasMore={hasNextPage}
                  loader={<h4>Loading...</h4>}
                >
                  <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={3}>
                    {data?.pages.map((pageData) => {
                      return pageData?.data.map((postData, index) => {
                        return <Post key={index} data={postData} />;
                      });
                    })}
                  </SimpleGrid>
                </InfiniteScroll>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <p>준비중</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('index getServerSideProps ...');
  return { props: { test: 'index 서버 응답' } };
});

export default Home;
