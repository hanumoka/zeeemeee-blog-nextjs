import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

const PostItem = ({ data }) => {
  const router = useRouter();
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  console.log('aaa:' + data.postImageUri);

  return (
    // TODO: 포스트 선택과, 포스트 작성자 클릭 포커스 분리 필요
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      rounded={'md'}
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
        <Box p="2">
          <Image
            h={'10em'}
            w={'20em'}
            objectFit="cover"
            // objectFit="contain"
            src={data.postImageUri}
            alt="포스트 썸네일"
            borderRadius={'lg'}
            _hover={{ transform: 'scale(1.03)' }}
            transition={'0.2s ease-in-out'}
          />
        </Box>
      )}

      <Box p="3">
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
          </Stack>
        </Box>
        <Box>
          <Box mt="1" fontWeight="semibold" lineHeight="tight">
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'md'}
              fontFamily={'body'}
              noOfLines={[1, 2, 3]}
            >
              {data.title}
            </Heading>
          </Box>
          <Stack direction={'column'} spacing={1} fontSize={'sm'}>
            <Text mt="2" mb="5" fontSize="sm" fontWeight={200} color={'gray.500'}>
              {data.summary}
            </Text>
            <HStack>
              {data.tags.map((tag) => {
                return (
                  <Badge
                    key={tag}
                    px={2}
                    py={1}
                    bg={badgeColor}
                    fontWeight={'400'}
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                );
              })}
            </HStack>
            <Text fontSize="13" color={'gray.500'}>
              작성일: <Moment format="YYYY-MM-DD HH:mm:ss">{data.createdAt}</Moment>
            </Text>

            {/*  TODO:  댓글수 맅크, 좧아요 아이콘이 필요 하다.*/}
          </Stack>
        </Box>
      </Box>
      <Box m={2} left={0} bottom={0}>
        <HStack>
          <Avatar size={'sm'} name={data.nickname} src={data.profileImageUri} />
          <Text fontSize="sm">{data.nickname}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default PostItem;
