import React from 'react';
import { Box, Center, Heading, Text, Stack, useColorModeValue, Button } from '@chakra-ui/react';

const Index = () => {
  return (
    <Box
      maxW={'800px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      // boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      borderWidth="1px"
      borderRadius="lg"
      transitionProperty="shadow"
      transitionDuration="1"
      transitionTimingFunction="ease-in-out"
      _hover={{ borderColor: 'teal.600', shadow: '2xl' }}
    >
      <Stack>
        <Text
          color={'green.500'}
          textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          Blog
        </Text>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          Boost your conversion rate
        </Heading>
        <Text color={'gray.500'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum.
        </Text>
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontWeight={600}>Hanumoka</Text>
          <Text color={'gray.500'}> 작성일: 2022-01-01 / 수정일 : 2022-01-01</Text>
        </Stack>
      </Stack>
      <Stack mt="5" direction={{ base: 'column', md: 'row' }}>
        <Button variant="outline" colorScheme="green">
          수정하기
        </Button>
        <Button colorScheme="green">출간하기</Button>
      </Stack>
    </Box>
  );
};

export default Index;
