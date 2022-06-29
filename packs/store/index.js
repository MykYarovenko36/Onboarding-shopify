import Vue from 'vue';
import Vuex from 'vuex';
import { ResourcePicker } from '@shopify/app-bridge/actions';
import storePicker from 'bridge/storePicker';
import BannerService from 'services/bannerService';
import constants from './constants';
import productParser from 'helpers/productParser';

Vue.use(Vuex);

const {
  SET_BANNERS_LIST,
  SET_UPDATE_BANNERS_LIST,
  SET_PRODUCT_BANNER,
  SET_UPDATE_BANNER,
  SET_BANNER_DELETE,
  SET_IS_ERROR,
  TOGGLE_IS_LOADING,
  PICKER_ACTION_OPEN,
  PICKER_ACTION_SELECT,
} = constants;

export const productPicker = storePicker('Product');

const bannerService = new BannerService();

export const store = new Vuex.Store({
  state: {
    banners: null,
    banner: null,
    isLoading: false,
    error: false,
  },
  mutations: {
    [TOGGLE_IS_LOADING](state) {
      state.isLoading = !state.isLoading;
    },
    [SET_IS_ERROR](state, error) {
      state.isLoading = false;
      state.error = error;
    },
    [SET_BANNERS_LIST](state, banners) {
      state.isLoading = false;
      state.error = false;
      state.banners = banners;
    },
    [SET_UPDATE_BANNERS_LIST](state, banner) {
      state.isLoading = false;
      state.error = false;
      state.banner = null;
      const newList = Object.assign([], state.banners);
      const bannerIndex = newList.findIndex(({ id }) => id === banner.id);
      newList.splice(bannerIndex, 1, banner);
      state.banners = newList;
    },
    [SET_PRODUCT_BANNER](state, product) {
      const parsedProduct = productParser(product);
      state.banner = parsedProduct;
    },
    [SET_BANNER_DELETE](state, id) {
      state.isLoading = false;
      state.banner = null;
      state.error = false;
      state.banners = state.banners.filter((el) => el.id !== id);
    },
    [SET_UPDATE_BANNER](state, data) {
      state.isLoading = false;
      state.error = false;
      state.banner = data && { ...state.banner, ...data };
    },
  },
  actions: {
    getBanner({ commit }, id) {
      const { isLoading, banners } = this.state;
      if (!isLoading) commit(TOGGLE_IS_LOADING);
      const banner =
        banners && banners.find((el) => el.id.toString() === id.toString());
      if (!banner) {
        return bannerService
          .getSingle(id)
          .then((res) => {
            commit(SET_UPDATE_BANNER, res.data);
            return res;
          })
          .catch((err) => {
            commit(SET_IS_ERROR, {
              message: err.message,
              method: 'getBanner',
            });
          });
      }
      commit(SET_UPDATE_BANNER, banner);
    },

    async getBannersAll({ commit }) {
      const { isLoading } = this.state;
      if (!isLoading) commit(TOGGLE_IS_LOADING);
      return bannerService
        .getAll()
        .then((res) => {
          commit(SET_BANNERS_LIST, res.data);
          return res.data;
        })
        .catch((err) => {
          commit(SET_IS_ERROR, {
            message: err.message,
            method: 'getBannersAll',
          });
        });
    },

    openProductPicker({ commit }) {
      return Promise.resolve()
        .then(() => {
          const { banners } = this.state;
          const productIds = banners.map(({ product_id }) => '-' + product_id);
          const initialQuery = productIds.join(' ' + 'AND' + ' ');
          return initialQuery;
        })
        .then((initialQuery) => {
          productPicker
            .set({ initialQuery })
            .dispatch(ResourcePicker.Action[PICKER_ACTION_OPEN]);
        })
        .then(() => {
          productPicker.subscribe(
            ResourcePicker.Action[PICKER_ACTION_SELECT],
            ({ selection }) => {
              commit(SET_PRODUCT_BANNER, selection);
            }
          );
        })
        .catch((err) => {
          commit(SET_IS_ERROR, {
            message: err.title,
            method: 'openProductPicker',
          });
        });
    },

    deleteBanner({ commit }) {
      const {
        isLoading,
        banner: { id },
      } = this.state;
      if (!isLoading) commit(TOGGLE_IS_LOADING);

      return bannerService
        .delete(id)
        .then((res) => {
          commit(SET_BANNER_DELETE, id);
          return res;
        })
        .catch((err) => {
          commit(SET_IS_ERROR, {
            message: err.message,
            method: 'deleteBanner',
          });
        });
    },

    updateBanner({ commit }) {
      const { isLoading, banner: stateBanner } = this.state;

      if (!isLoading) commit(TOGGLE_IS_LOADING);

      const banner = Object.assign({}, stateBanner);
      delete banner.id;
      return bannerService
        .update(this.state.banner.id, { banner })
        .then((res) => {
          commit(SET_UPDATE_BANNERS_LIST, res.data);
          return res;
        })
        .catch((err) => {
          commit(SET_IS_ERROR, {
            message: err.message,
            method: 'updateBanner',
          });
        });
    },

    createBanner({ commit }) {
      const {
        isLoading,
        banner: stateBanner,
        banners: bannersList,
      } = this.state;
      if (!isLoading) commit(TOGGLE_IS_LOADING);

      const banner = Object.assign({}, stateBanner);
      delete banner.id;
      return bannerService
        .create({ banner })
        .then((res) => {
          const banners = [...bannersList, res.data];
          commit(SET_BANNERS_LIST, banners);
          return res;
        })
        .catch((err) => {
          commit(SET_IS_ERROR, err);
        });
    },
  },
});
