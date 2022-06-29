import VueRouter from 'vue-router';
import navigationPicker from 'bridge/navigation';
import HomePage from 'pages/HomePage.vue';
import BannersListPage from 'pages/BannersListPage.vue';
import BannerDetailPage from 'pages/BannerDetailPage.vue';
import NotFoundPage from 'pages/NotFoundPage.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/banners',
      name: 'banners',
      component: BannersListPage,
    },
    {
      path: '/banners/:id',
      name: 'banners-detail',
      component: BannerDetailPage,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
});

router.afterEach(({ path }) => {
  navigationPicker('REPLACE', path);
});

export default router;
