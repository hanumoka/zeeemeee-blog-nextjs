import React from 'react';
import { withAuthServer } from '../hoc/withAuthServer';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Image,
  StackDivider,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { StarIcon, SearchIcon } from '@chakra-ui/icons';

const Blog = ({ loginInfo, pageProps }) => {
  return (
    <Center>
      <VStack>
        <HStack mt="10" mb="5">
          <Avatar size="2xl" name="hanumoka" />
          <FormControl>
            <Box>
              <Heading as="h2" size="xl">
                하누모카
              </Heading>
            </Box>
            <Box>
              <FormHelperText>
                자기소개ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
              </FormHelperText>
            </Box>
          </FormControl>
        </HStack>
        <Divider />
        <Box mt="10" w={[300, 600, 800, 1000]}>
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>
                <Heading as="h4" size="md">
                  글
                </Heading>
              </Tab>
              <Tab>
                <Heading as="h4" size="md">
                  시리즈
                </Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box>
                  <HStack spacing="10px">
                    <Box w="20%" h="lg">
                      <Heading as="h5" size="sm">
                        태그목록
                      </Heading>
                      <Divider mt="3" />
                      <VStack align="baseline">
                        <Button mt="3" variant="link">
                          전체보기 (100)
                        </Button>
                        <Button mt="3" variant="link">
                          Java (100)
                        </Button>
                        <Button mt="3" variant="link">
                          Spring (100)
                        </Button>
                      </VStack>
                    </Box>
                    <Box w="80%" h="lg">
                      <Box>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                          />
                          <Input type="text" placeholder="검색어를 입력하세요" />
                        </InputGroup>
                      </Box>
                      <VStack
                        mt={5}
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                      >
                        <Box>{AirbnbExample()}</Box>
                        <Box>{AirbnbExample()}</Box>
                        <Box>{AirbnbExample()}</Box>
                        <Box>{AirbnbExample()}</Box>
                        <Box>{AirbnbExample()}</Box>
                        <Box>{AirbnbExample()}</Box>
                      </VStack>
                    </Box>
                  </HStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={4}>
                  <Box w="100%" h="lg" bg="teal.700">
                    시리즈 영역
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Center>
  );
};

function AirbnbExample() {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box display="flex" alignItems="baseline" shadow="md" borderWidth="1px">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {property.title}
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < property.rating ? 'teal.500' : 'gray.300'} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('블로그 getServerSideProps ...');
  return { props: { test: '블로그 서버 응답' } };
});

export default Blog;
