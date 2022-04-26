import React from 'react';
import {
  Badge,
  Box,
  Center,
  Divider,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Moment from 'react-moment';

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
const Post = ({ data }) => {
  const badgeColor = useColorModeValue('gray.50', 'gray.800');
  return (
    <Box
      maxW="lg"
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
      {data.postUri && (
        <Center>
          <Image
            src={data.postUri}
            // alt={property.imageAlt}
            alt="포스트 썸네일"
            borderRadius={'lg'}
            objectFit={'cover'}
            _hover={{ transform: 'scale(1.03)' }}
            transition={'0.2s ease-in-out'}
          />
        </Center>
      )}

      <Box p="6">
        {/*<Box display="flex" alignItems="baseline" shadow="md" borderWidth="1px">*/}
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
          {/*{data.tags.map((tag) => {*/}
          {/*  return (*/}
          {/*    <Badge key={tag} px={2} py={1} bg={badgeColor} fontWeight={'400'} variant="outline">*/}
          {/*      {tag}*/}
          {/*    </Badge>*/}
          {/*  );*/}
          {/*})}*/}
          {/*<Box*/}
          {/*  color="gray.500"*/}
          {/*  fontWeight="semibold"*/}
          {/*  letterSpacing="wide"*/}
          {/*  fontSize="xs"*/}
          {/*  textTransform="uppercase"*/}
          {/*  ml="2"*/}
          {/*>*/}
          {/*  {property.beds} beds &bull; {property.baths} baths*/}
          {/*</Box>*/}
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {data.title}
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
          {/*  TODO:  댓글수 맅크, 좧아요 아이콘이 필요 하다.*/}
        </Stack>

        {/*<Box display="flex" mt="2" alignItems="center">*/}
        {/*  {Array(5)*/}
        {/*    .fill('')*/}
        {/*    .map((_, i) => (*/}
        {/*      <StarIcon key={i} color={i < property.rating ? 'teal.500' : 'gray.300'} />*/}
        {/*    ))}*/}
        {/*  <Box as="span" ml="2" color="gray.600" fontSize="sm">*/}
        {/*    {property.reviewCount} reviews*/}
        {/*  </Box>*/}
        {/*</Box>*/}
      </Box>
    </Box>
  );
};

export default Post;
