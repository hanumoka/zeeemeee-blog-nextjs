import Send from '../utils/Send';

export default {
  getSetting() {
    return Send({
      url: '/setting',
      method: 'get',
    });
  },
  uploadProfileImage(formData) {
    return Send({
      url: '/setting/profileimage',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProfileImage() {
    return Send({
      url: '/setting/profileimage',
      method: 'delete',
    });
  },
};
