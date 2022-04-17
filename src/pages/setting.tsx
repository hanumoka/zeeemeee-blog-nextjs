import React, { useCallback } from 'react';
import { Avatar, Box, Button, Flex, HStack, Square, StackDivider, VStack } from '@chakra-ui/react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export { getServerSideProps } from '../stores/serverStore';

const Setting = () => {
  const [images, setImages] = React.useState([]);

  const onChange = useCallback((imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  }, []);

  return (
    <>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
          <VStack w="20%">
            <ImageUploading value={images} onChange={onChange} maxNumber={1}>
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                <>
                  {imageList.map((image, index) => (
                    <Avatar key={index} size="2xl" name="hanumoka" src={image.dataURL} />
                  ))}
                  {images.length === 0 && <Avatar size="2xl" name="hanumoka" />}
                  <Button colorScheme="blue" onClick={onImageUpload}>
                    이미지 업로드
                  </Button>
                  <Button colorScheme="red" onClick={onImageRemoveAll}>
                    이미지 제거
                  </Button>
                </>
              )}
            </ImageUploading>
          </VStack>
          <Box w="80%">
            <Box h="30%" p={4}>
              닉네임(중복검사하지 않느다.)
            </Box>
            <Box h="50%" p={4}>
              자기설명
            </Box>
            <Button colorScheme="blue">수정</Button>
          </Box>
        </HStack>
        <Box>
          <Flex color="white">
            <Box w="15%">블로그 URL</Box>
            <Box w="80%">hanumoka</Box>
            <Square flex="1">수정</Square>
          </Flex>
          <Box>
            개인 페이지의 고유한 대표 URL 입니다.(고유값) 해당 정보없이 작성하신 글을 공개 할 수
            없습니다.
          </Box>
        </Box>
        <Box>
          <Flex color="white">
            <Box w="15%">소셜 정보</Box>
            <Box w="85%">정보 추가</Box>
          </Flex>
          <Box>자동으로 글에 포함되는 작성자의 소셜정보입니다.</Box>
        </Box>
        <Box>
          <Flex color="white">
            <Box w="15%">이메일 주소</Box>
            <Box w="85%">이메일 입력</Box>
          </Flex>
          <Box>회원 인증과 알림 이메일을 받을 주소입니다.(고유값)</Box>
        </Box>
        <Box>
          <Flex color="white">
            <Box w="15%">이메일 수신설정</Box>
            <Box w="85%">
              <Box>댓글 알림</Box>
              <Box>업데이트 소식</Box>
            </Box>
          </Flex>
        </Box>
        <Box h="40px">
          <Flex color="white">
            <Box w="15%">회원 탈퇴</Box>
            <Box w="85%">
              <Button>회원 탈퇴</Button>
            </Box>
          </Flex>
          <Box>경고: 탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</Box>
        </Box>
      </VStack>
    </>
  );
};

export default Setting;
