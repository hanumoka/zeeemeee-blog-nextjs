import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import { withAuthServer } from '../hoc/withAuthServer';

const ReactQueryScroll = () => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'infiniteCharacters',
    async ({ pageParam = 1 }) =>
      await fetch(`https://rickandmortyapi.com/api/character/?page=${pageParam}`).then((result) =>
        result.json()
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );
  return (
    <>
      <h1>react-query 무한 스크롤링 예제</h1>
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
                      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
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
    </>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('react-query-scroll getServerSideProps ...');
  return { props: { test: 'react-query-scroll 서버 응답' } };
});

export default ReactQueryScroll;
