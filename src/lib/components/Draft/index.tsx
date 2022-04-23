import React from 'react';
import { Box, Heading, Text, Stack, useColorModeValue, Button, Badge } from '@chakra-ui/react';

const Index = ({ data }) => {
  return (
    <Box
      maxW={'800px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
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
        <Stack direction={'row'}>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            임시글
          </Text>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
            variant="outline"
          >
            art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
            variant="outline"
          >
            photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
            variant="outline"
          >
            music
          </Badge>
        </Stack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {data.title}
        </Heading>
        <Text color={'gray.500'}>{data.content}</Text>
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
