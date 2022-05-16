import React, { useCallback } from 'react';
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

const PostListItem = ({ data }) => {
  const router = useRouter();
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  // const handleDeletePost = useCallback(() => {
  //   alert('포스트 삭제');
  // }, []);
  //
  // const handleMovePostUpdate = useCallback(() => {
  //   alert('포스트 수정');
  // }, []);

  return (
    <Box
      maxW={'800px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
      borderWidth="2px"
      borderRadius="lg"
      transitionProperty="shadow"
      transitionDuration="1"
      transitionTimingFunction="ease-in-out"
      _hover={{ borderColor: 'teal.600', shadow: '2xl', cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        router.push('/@' + '/' + data.sebureUri + '/' + data.postUri);
      }}
    >
      {data.postImageUri && (
        <Center>
          <Image
            src={data.postImageUri}
            alt="포스트 썸네일"
            borderRadius={'lg'}
            objectFit={'cover'}
            _hover={{ transform: 'scale(1.03)' }}
            transition={'0.2s ease-in-out'}
          />
        </Center>
      )}

      <Box p="6">
        <Box display="flex">
          <Badge borderRadius="full" px="2" colorScheme="teal" mr="3">
            {data.postStatus}
          </Badge>
          <Stack direction={'row'}>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              포스트
            </Text>
            {data.tags.map((tag) => {
              return (
                <Badge key={tag} px={2} py={1} bg={badgeColor} fontWeight={'400'} variant="outline">
                  {tag}
                </Badge>
              );
            })}
          </Stack>
        </Box>

        <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {data.title}
          </Heading>
        </Box>
        <Stack mt="2" direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text mt="2" mb="5" fontWeight={600} color={'gray.500'}>
              {data.summary}
            </Text>
            <Divider />
            <Text fontSize="13" color={'gray.500'}>
              작성일: <Moment format="YYYY-MM-DD HH:mm:ss">{data.createdAt}</Moment> / 수정일 :{' '}
              <Moment format="YYYY-MM-DD HH:mm:ss">{data.updatedAt}</Moment>
            </Text>
          </Stack>
        </Stack>
        {/*<Stack mt="5" direction={{ base: 'column', md: 'row' }}>*/}
        {/*  <Button*/}
        {/*    type="button"*/}
        {/*    variant="outline"*/}
        {/*    colorScheme="blue"*/}
        {/*    onClick={(e) => {*/}
        {/*      e.stopPropagation();*/}
        {/*      handleMovePostUpdate();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    수정*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    type="button"*/}
        {/*    variant="outline"*/}
        {/*    colorScheme="red"*/}
        {/*    onClick={(e) => {*/}
        {/*      e.stopPropagation();*/}
        {/*      handleDeletePost();*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    삭제*/}
        {/*  </Button>*/}
        {/*</Stack>*/}
        {/*  TODO:  댓글수 맅크, 좧아요 아이콘이 필요 하다.*/}
      </Box>
    </Box>
  );
};

export default PostListItem;
