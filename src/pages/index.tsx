import React from 'react';
import Head from 'next/head';
import loginStore from '../stores/loginStore';
import { withAuthServer } from '../hoc/withAuthServer';
import { Box, Image, SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = ({ loginInfo, pageProps }) => {
  const { username, nickname } = loginStore((state) => state);

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'infiniteCharacters',
    async ({ pageParam = 1 }) =>
      await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`).then((result) =>
        result.json()
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.info.next) {
          // console.log('length:', pages.length);
          // console.log(JSON.stringify(pages));
          return pages.length + 1;
        }
      },
    }
  );

  return (
    <>
      <Head>
        <title>Sebure/home</title>
      </Head>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>트렌딩</Tab>
          <Tab>최신</Tab>
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
                  <SimpleGrid columns={4} spacing={5}>
                    {data?.pages.map((page) => (
                      <>
                        {page.results.map((character) => (
                          <Box
                            mt="5"
                            maxW="sm"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            p="4"
                            shadow="base"
                            rounded="md"
                            transitionProperty="shadow"
                            transitionDuration="1"
                            transitionTimingFunction="ease-in-out"
                            _hover={{ borderColor: 'teal.600', shadow: '2xl' }}
                          >
                            <Image
                              src={character.image}
                              alt={character.name}
                              borderRadius={'lg'}
                              objectFit={'cover'}
                              _hover={{ transform: 'scale(1.03)' }}
                              transition={'0.2s ease-in-out'}
                            />
                            <Box p="6">
                              <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                              >
                                {character.name}
                              </Box>

                              <Box display="flex" mt="2" alignItems="center">
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                  <p>Lives in: {character.location.name}</p>
                                  <p>Species: {character.species}</p>
                                  <i>Id: {character.id} </i>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </>
                    ))}
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
