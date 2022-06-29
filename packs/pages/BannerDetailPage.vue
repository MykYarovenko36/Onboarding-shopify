<template>
  <div class="page">
    <Header>
      <div v-if="banner" class="flex-container flex-row buttons-container">
        <router-link
          class="link link__btn btn-primary to-uppercase"
          :to="{ name: 'banners' }"
        >
          cancel
        </router-link>
        <div class="flex-container flex-row">
          <button
            class="btn btn-error link__btn to-uppercase"
            v-if="isExisting"
            @click="handleDelete"
          >
            delete
          </button>
          <button
            class="btn btn-success link__btn to-uppercase"
            @click="saveHandler"
          >
            save
          </button>
        </div>
      </div>
    </Header>
    <div
      v-if="banner"
      class="page__block page-block__content-wrap flex-container flex-col"
    >
      <div
        class="flex-container flex-row"
        @click="handleOpenEditor('title', banner.title)"
      >
        <span class="title banner-title" v-html="banner.title" />
        <img class="icon" src="../assets/pencil.png" alt="edit" />
      </div>
      <hr class="hr-line" />
      <div
        class="flex-container flex-row stretched wraped banner-preview__wrap"
      >
        <div
          class="banner banner-preview__wrap-item"
          :style="{ 'background-color': bannerColor }"
          @click="handleOpenEditor('content', banner.content)"
        >
          <p class="text-block text-content" v-html="banner.content" />
          <img
            class="icon content-block__icon"
            src="../assets/pencil.png"
            alt="edit"
          />
        </div>
        <chrome-picker
          :value="bannerColor"
          @input="changeColor"
          class="banner-preview__wrap-item"
        />
      </div>
    </div>
    <div class="modal" v-if="openEditor && banner">
      <ToastUiEditor
        @close="handleCloseEditor"
        @submit="updateChanges"
        :editField="editField"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Chrome } from 'vue-color';
import ToastUiEditor from 'components/ToastUiEditor.vue';
import constants from 'store/constants';
import Header from 'components/Header.vue';
import messages from 'shared/snotifyMessages';
import { productPicker } from 'store';
import { ResourcePicker } from '@shopify/app-bridge/actions';

const { SET_UPDATE_BANNER } = constants;
const {
  BANNER_DELETED_SUCCESS,
  BANNER_CREATED_EMTY_FIELD,
  BANNER_CREATED_SUCCESS,
  BANNER_UPDATED_SUCCESS,
  BANNER_ALREADY_EXIST,
} = messages;

const DEFAULT_COLOR = '#FFFFFF';

export default {
  name: 'BannerDetailPage',
  components: {
    Header,
    ToastUiEditor,
    'chrome-picker': Chrome,
  },
  data() {
    return {
      openEditor: false,
      editField: null,
      color: DEFAULT_COLOR,
    };
  },
  computed: mapState({
    banner({ banner }) {
      return banner;
    },
    isSaveDisabled({ banner }) {
      return banner && Object.values(banner).includes('');
    },
    bannerColor({ banner }) {
      return (banner && banner.style['background-color']) || this.color;
    },
    isExisting({ banner }) {
      return banner && banner.id !== 'new';
    },
  }),

  async mounted() {
    const { currentRoute } = this.$router;
    const { banners: bannersList } = this.$store.state;
    const productId = currentRoute.params?.id;
    const isNewBanner = productId && productId === 'new';
    if (!isNewBanner) return this.getBanner(productId);
    if (isNewBanner && !bannersList) {
      return await this.getBannersAll().then(this.openProductPicker);
    }
    this.openProductPicker();
  },

  beforeDestroy() {
    productPicker.unsubscribe();
    this.$store.commit('SET_UPDATE_BANNER', null);
  },

  methods: {
    ...mapActions(['getBanner', 'getBannersAll']),
    async saveHandler() {
      if (this.isSaveDisabled) {
        return this.$snotify.warning(BANNER_CREATED_EMTY_FIELD);
      }
      const isBannerNew = Object.is(this.banner?.id, 'new');
      const saveAction = isBannerNew ? 'createBanner' : 'updateBanner';
      await this.$store.dispatch(saveAction).then((res) => {
        if (res.error) {
          return this.$snotify.error(BANNER_ALREADY_EXIST);
        }
        const notifyMessage = isBannerNew
          ? BANNER_CREATED_SUCCESS
          : BANNER_UPDATED_SUCCESS;
        this.finishEditWithMessage(notifyMessage);
      });
    },

    async openProductPicker() {
      return await this.$store.dispatch('openProductPicker').then(() => {
        productPicker.subscribe(ResourcePicker.Action.CANCEL, () => {
          this.$router.push({ name: 'banners' });
        });
      });
    },

    changeColor({ hex }) {
      this.$store.commit(SET_UPDATE_BANNER, {
        style: { 'background-color': hex },
      });
    },

    handleCloseEditor() {
      this.openEditor = false;
      this.editField = null;
    },

    handleOpenEditor(key, value) {
      this.openEditor = !this.openEditor;
      this.editField = { key, value };
    },

    updateChanges(data) {
      this.$store.commit(SET_UPDATE_BANNER, data);
      this.openEditor = !this.openEditor;
    },

    async handleDelete() {
      await this.$store.dispatch('deleteBanner').then(() => {
        this.finishEditWithMessage(BANNER_DELETED_SUCCESS);
      });
    },

    finishEditWithMessage(message) {
      const { isError } = this.$store;
      if (!isError) {
        this.$router.push({ name: 'banners' });
        this.$snotify.success(message);
      }
    },
  },
};
</script>

<style scoped>
.buttons-container {
  justify-content: space-between;
  flex-grow: 1;
}

.banner {
  position: relative;
  overflow: hidden;
  flex: 1;
  max-width: 420px;
  max-height: 245px;
}

.hr-line {
  line-height: 2px;
  color: var(--palette-color-gray);
  width: 100%;
}
.banner-preview__wrap {
  justify-content: space-around;
  margin-top: -10px;
}
.banner-preview__wrap-item {
  margin: 10px;
}
.banner-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.content-block__icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
