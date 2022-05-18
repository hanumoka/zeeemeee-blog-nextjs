import Send from '../utils/Send';

export default {
  uploadPostImage(formData) {
    return Send({
      url: '/aws/post/image',
      method: 'post',
      data: formData,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadPostMainImage(formData) {
    return Send({
      url: '/aws/post-main/image',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deletePostMainImage(postId) {
    return Send({
      url: '/aws/post-main/image',
      method: 'delete',
      params: {
        postId: postId,
      },
    });
  },
  // uploadImage(formData) {
  //   return Send({
  //     url: '/aws/post/image',
  //     method: 'post',
  //     data: formData,
  //     // headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  // },
};
