import React, { useCallback } from 'react';
import Moment from 'react-moment';
import { Box, Heading, Text, Stack, useColorModeValue, Button, Badge } from '@chakra-ui/react';

// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Send from '../../../utils/Send';
import { useMutation, useQueryClient } from 'react-query';

// const MarkdownView = dynamic(() => import('../Editor/MarkdownView'), {
//   ssr: false,
// });

const Index = ({ data }) => {
  const queryClient = useQueryClient(); // 등록된 quieryClient 가져오기
  const router = useRouter();
  const badgeColor = useColorModeValue('gray.50', 'gray.800');

  const { postId, title, tags, createdAt, updatedAt } = data;

  const deleteDraft = useMutation(
    (param: any) =>
      Send({
        url: '/draft',
        method: 'delete',
        params: {
          postId: param.postId,
        },
      }),
    {
      onMutate: (variable) => {
        console.log('onMutate', variable);
      },
      onError: (error, variable, context) => {
        // error
        console.error(error);
      },
      onSuccess: (data, variables, context) => {
        console.log('success', data, variables, context);
        queryClient.invalidateQueries('infiniteDrafts'); // queryKey 유효성 제거
      },
      onSettled: () => {
        console.log('end');
      },
    }
  );

  const handleDeleteDraft = useCallback(() => {
    deleteDraft.mutate({
      postId: postId,
    });
  }, [deleteDraft, postId]);

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
        router.push({
          pathname: '/write',
          query: { postId: postId },
        });
      }}
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
          {tags.map((tag) => {
            return (
              <Badge key={tag} px={2} py={1} bg={badgeColor} fontWeight={'400'} variant="outline">
                {tag}
              </Badge>
            );
          })}
        </Stack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {title}
        </Heading>
        {/*<MarkdownView markdownStr={content} theme={colorMode} />*/}
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          {/*<Text fontWeight={600}>Hanumoka</Text>*/}
          <Text color={'gray.500'}>
            작성일: <Moment format="YYYY-MM-DD HH:mm:ss">{createdAt}</Moment> / 수정일 :{' '}
            <Moment format="YYYY-MM-DD HH:mm:ss">{updatedAt}</Moment>
          </Text>
        </Stack>
      </Stack>
      <Stack mt="5" direction={{ base: 'column', md: 'row' }}>
        <Button
          type="button"
          variant="outline"
          colorScheme="red"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteDraft();
          }}
        >
          삭제하기
        </Button>
      </Stack>
    </Box>
  );
};

export default Index;
