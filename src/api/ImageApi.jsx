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
  uploadImage(formData) {
    return Send({
      url: '/aws/post/image',
      method: 'post',
      data: formData,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
