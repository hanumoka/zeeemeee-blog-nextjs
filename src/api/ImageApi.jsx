import Send from '../utils/Send';

export default {
  uploadImage(formData) {
    return Send({
      url: '/uploadImage',
      method: 'post',
      data: formData,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
