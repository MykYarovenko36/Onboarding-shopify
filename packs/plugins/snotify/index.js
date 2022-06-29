import { SnotifyPosition } from 'vue-snotify';

export default {
  toast: {
    position: SnotifyPosition.centerBottom,
    timeout: 1500,
    showProgressBar: false,
    preventDuplicates: false,
    oneAtTime: true,
    maxOnScreen: 1,
  },
};
