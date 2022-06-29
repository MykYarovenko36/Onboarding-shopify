<template>
  <div class="page" v-if="isBannersContain">
    <div class="page-block flex-container flex-center flex-row stretched">
      <div
        class="page-block__content-wrap flex-container flex-center flex-col"
        v-if="!isEmptyList"
      >
        <p class="text-block paragraph to-uppercase">
          your banners list is ready!
        </p>
        <router-link
          class="link link__btn btn-primary scaled to-uppercase"
          :to="{ name: 'banners' }"
          >show list</router-link
        >
      </div>
      <div
        v-else
        class="page-block__content-wrap flex-container flex-center flex-col"
      >
        <p class="text-block paragraph to-uppercase">
          welcome to banners creator!
        </p>
        <router-link
          class="link link__btn btn-primary scaled to-uppercase"
          :to="{ name: 'banners-detail', params: { id: 'new' } }"
          >get started</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapState({
      isEmptyList: ({ banners }) => !banners?.length,
      isBannersContain: ({ banners, isLoading }) => banners && !isLoading,
    }),
  },
  mounted() {
    const {
      state: { banners, isLoading },
      dispatch,
    } = this.$store;
    if (!banners && !isLoading) dispatch('getBannersAll');
  },
};
</script>

<style scoped></style>
