import React from 'react';
import { withAuthServer } from '../../hoc/withAuthServer';
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
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { StarIcon, SearchIcon } from '@chakra-ui/icons';
import BlogSettingTab from '../../lib/pages/blog/BlogSettingTab';
import BlogPostTab from '../../lib/pages/blog/BlogPostTab';

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
              <FormHelperText>자기소개</FormHelperText>
            </Box>
          </FormControl>
        </HStack>
        <Divider />
        <Box mt="10" w={[300, 600, 800, 1000]}>
          {/* TODO: 탭 선택 정보를 store에 저장하고 블러오자. 임시글에서 나왔을때 유지하기 위해 */}
          <Tabs isFitted isLazy={true}>
            <TabList mb="1em">
              {/* TODO : 나중에 컨셉은 유튜브 */}
              {/*<Tab>*/}
              {/*  <Heading as="h5" size="sm">*/}
              {/*    홈*/}
              {/*  </Heading>*/}
              {/*</Tab>*/}
              <Tab>
                <Heading as="h5" size="sm">
                  포스트
                </Heading>
              </Tab>
              {/*<Tab>*/}
              {/*  <Heading as="h5" size="sm">*/}
              {/*    시리즈*/}
              {/*  </Heading>*/}
              {/*</Tab>*/}
              {/* TODO : 나중에 컨셉은 유튜브 */}
              {/*<Tab>*/}
              {/*  <Heading as="h5" size="sm">*/}
              {/*    커뮤니티*/}
              {/*  </Heading>*/}
              {/*</Tab>*/}
              <Tab>
                {/* TODO: 블로그 관리 탭은 주인만 볼수 있어야 한다.*/}
                <Heading as="h5" size="sm">
                  관리
                </Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <BlogPostTab />
              </TabPanel>
              {/*<TabPanel>*/}
              {/*  <Box h="lg" bg="teal.700">*/}
              {/*    시리즈 영역*/}
              {/*  </Box>*/}
              {/*</TabPanel>*/}
              <TabPanel>
                <Box h="lg">
                  <BlogSettingTab />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Center>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  // Your normal `getServerSideProps` code here
  console.log('블로그 getServerSideProps ...');
  return { props: { test: '블로그 서버 응답' } };
});

export default Blog;
