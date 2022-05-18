import Send from '../utils/Send';

export default {
  getSetting() {
    return Send({
      url: '/user/setting',
      method: 'get',
    });
  },
  uploadProfileImage(formData) {
    return Send({
      url: '/aws/user/profile-image',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProfileImage() {
    return Send({
      url: '/aws/user/profile-image',
      method: 'delete',
    });
  },
  updateNicknameAndIntroduction(param) {
    return Send({
      url: '/user/setting/nicknameintroduction',
      method: 'patch',
      data: param,
    });
  },
  updateSebureUri(param) {
    return Send({
      url: '/user/setting/sebureuri',
      method: 'patch',
      data: param,
    });
  },
};
