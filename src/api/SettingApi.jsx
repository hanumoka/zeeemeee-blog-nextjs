import Send from '../utils/Send';

export default {
  getSetting() {
    return Send({
      url: '/setting',
      method: 'get',
    });
  },
};
