<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
    <vue-snotify />
    <v-loader v-if="isLoading" />
    <v-error v-if="error" :error="error" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import vLoader from './components/Loader.vue';
import vError from './components/ErrorBoundry.vue';

export default {
  name: 'app',
  components: {
    vLoader,
    vError,
  },
  computed: mapState({
    isContentReady({ isLoading, error }) {
      return !error && !isLoading;
    },
    isLoading({ isLoading }) {
      return isLoading;
    },
    error({ error }) {
      return error;
    },
  }),
};
</script>
<style></style>
