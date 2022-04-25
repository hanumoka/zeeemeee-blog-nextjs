import Send from '../utils/Send';

export default {
  uploadPostImage(formData) {
    return Send({
      url: '/post/image',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deletePostImage(postId) {
    return Send({
      url: '/post/image',
      method: 'delete',
      params: {
        postId: postId,
      },
    });
  },
};
