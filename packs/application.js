import Vue from 'vue';
import VueRouter from 'vue-router';
import Snotify from 'vue-snotify';
import App from 'App.vue';
import errorTemplate from 'shared/errorTemplate';
import { store } from 'store';
import plugins from 'plugins';
import '../styles/application.css';
import 'vue-snotify/styles/material.css';

const APP_MOUNTING_SUCCESS = 'APP_[MOCG]_APP_MOUNTING_SUCCESS!';
const APP_MOUNTING_ERROR = 'APP_[MOCG]_APP_MOUNTING_ERROR!';

document.addEventListener('DOMContentLoaded', () => {
  const ENTRY_POINT = document.querySelector('[data-app]');

  try {
    ENTRY_POINT.parentNode.style.cssText = `
    margin: 0;
    padding: 0;
    `;

    const { router, snotify } = plugins;

    Vue.use(VueRouter);
    Vue.use(Snotify, snotify);

    new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount(ENTRY_POINT);

    console.log(`\u001b[32m${APP_MOUNTING_SUCCESS}`);
  } catch {
    if (ENTRY_POINT) {
      ENTRY_POINT.innerHTML = errorTemplate;
    }
    console.log(`\u001b[31m${APP_MOUNTING_ERROR}`);
  }
});
