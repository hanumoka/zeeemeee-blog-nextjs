import React from 'react';
import { withAuthServer } from '../hoc/withAuthServer';
import {
  Avatar,
  Box,
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
} from '@chakra-ui/react';

const Blog = ({ loginInfo, pageProps }) => {
  // @ts-ignore
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
        <Box mt="10">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>One</Tab>
              <Tab>Two</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
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
