import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Square,
  StackDivider,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { withAuthServer } from '../hoc/withAuthServer';
import settingStore from '../stores/settingStore';
import Head from 'next/head';

const Setting = ({ loginInfo }: { loginInfo: { username: string; nickname: string } }) => {
  const {
    images,
    setImages,
    nickname,
    introduction,
    sebureUri,
    email,
    profileImageUri,
    setProfileImageUri,
    fetchSetting,
    uploadProfileImage,
    deleteProfileImage,
  } = settingStore((state) => state);

  useEffect(() => {
    fetchSetting();
    //TODO: 새로고침시 프로필이 깜박거린다. 서버사이드 렌더링 고려 필요
  }, []);

  const onChangeUploadProfileImage = useCallback(
    // TODO: 업로드시 파일 타입 및 맥스 사이즈 해상도 검사 필요, 라이브러리에 내장되어 있다.
    async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      if (addUpdateIndex) {
        const targetFile = imageList[0].file || '';
        const formData = new FormData();
        formData.append('file', targetFile);
        uploadProfileImage(formData);
      }
      setImages(imageList as never[]);
    },
    []
  );

  const removeProfileImage = async (cb) => {
    try {
      deleteProfileImage();
      cb();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Sebure/setting</title>
      </Head>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
        <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
          <VStack w="20%">
            <ImageUploading value={images} onChange={onChangeUploadProfileImage} maxNumber={1}>
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                <>
                  {profileImageUri && <Avatar size="2xl" name={nickname} src={profileImageUri} />}

                  {!profileImageUri &&
                    imageList.map((image, index) => (
                      <Avatar key={index} size="2xl" name={nickname} src={image.dataURL} />
                    ))}
                  {!profileImageUri && images.length === 0 && <Avatar size="2xl" name={nickname} />}

                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      onImageRemoveAll();
                      onImageUpload();
                    }}
                  >
                    이미지 업로드
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      removeProfileImage(onImageRemoveAll);
                    }}
                  >
                    이미지 제거
                  </Button>
                </>
              )}
            </ImageUploading>
          </VStack>
          <Box w="80%">
            <Box h="30%" p={4}>
              <Heading as="h2" size="xl">
                <Input placeholder="닉네임을 입력하세요." size="lg" defaultValue={nickname} />
              </Heading>
            </Box>
            <Box h="50%" p={4}>
              <Textarea placeholder="자기소개를 입력하세요." defaultValue={introduction} />
            </Box>
            <Button colorScheme="blue" variant="link">
              수정
            </Button>
          </Box>
        </HStack>
        <Box>
          <Flex>
            <Box w="15%">블로그 URL</Box>
            <Box w="80%">{sebureUri}</Box>
            <Square flex="1">수정</Square>
          </Flex>
          <Box>
            개인 페이지의 고유한 대표 URL 입니다.(고유값) 해당 정보없이 작성하신 글을 공개 할 수
            없습니다.
          </Box>
        </Box>
        {/* TODO: 나중에 */}
        {/*<Box>*/}
        {/*  <Flex color="white">*/}
        {/*    <Box w="15%">소셜 정보</Box>*/}
        {/*    <Box w="85%">정보 추가</Box>*/}
        {/*  </Flex>*/}
        {/*  <Box>자동으로 글에 포함되는 작성자의 소셜정보입니다.</Box>*/}
        {/*</Box>*/}
        <Box>
          <Flex>
            <Box w="15%">이메일 주소</Box>
            <Box w="85%">{email}</Box>
          </Flex>
          <Box>회원 인증과 알림 이메일을 받을 주소입니다.(고유값)</Box>
        </Box>
        {/* TODO: 나중에 */}
        {/*<Box>*/}
        {/*  <Flex color="white">*/}
        {/*    <Box w="15%">이메일 수신설정</Box>*/}
        {/*    <Box w="85%">*/}
        {/*      <Box>댓글 알림</Box>*/}
        {/*      <Box>업데이트 소식</Box>*/}
        {/*    </Box>*/}
        {/*  </Flex>*/}
        {/*</Box>*/}
        <Box h="40px">
          <Flex>
            <Box w="15%">회원 탈퇴</Box>
            <Box w="85%">
              <Button colorScheme="red">회원 탈퇴</Button>
            </Box>
          </Flex>
          <Box>경고: 탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</Box>
        </Box>
      </VStack>
    </>
  );
};

export const getServerSideProps = withAuthServer((context) => {
  console.log('Setting getServerSideProps ...');
  return { props: { test: 'Setting 서버 응답' } };
});

export default Setting;
