<template>
  <div class="page">
    <Header>
      <router-link
        class="link link__btn btn-primary to-uppercase"
        :to="{ name: 'banners-detail', params: { id: 'new' } }"
      >
        create
      </router-link>
    </Header>
    <div v-if="isContentLoaded" class="page-block page-block__content-wrap">
      <ul
        v-if="!isListEmpty"
        class="unordered-list flex-container flex-row wraped banners_list"
      >
        <li
          v-for="item in banners"
          :key="item.product_id"
          class="unordered-list__item-wrap banners_list-item scaled"
          @click="openBanner(item.id)"
        >
          <BannersListItem :banner="item" />
        </li>
      </ul>
      <p v-else>banners list is empty</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BannersListItem from '../components/BannersListItem.vue';
import Header from '../components/Header.vue';

export default {
  name: 'BannersListPage',
  components: {
    BannersListItem,
    Header,
  },
  computed: {
    ...mapState({
      banners({ banners }) {
        return banners;
      },
      isListEmpty({ banners, isLoading }) {
        return !banners?.length && !isLoading;
      },
      isContentLoaded({ banners, isLoading }) {
        return banners && !isLoading;
      },
    }),
  },
  methods: {
    ...mapActions(['getBannersAll']),
    openBanner(id) {
      this.$router.push({ name: 'banners-detail', params: { id } });
    },
  },
  created() {
    const isBannersExist = this.banners && this.banners.length > 1;
    if (!isBannersExist) this.getBannersAll();
  },
};
</script>

<style scoped>
.banners_list-item {
  max-width: 350px;
  min-width: 280px;
  min-height: 180px;
  flex-grow: 1;
  border-radius: 5px;
  box-shadow: var(--shadow-m);
}
</style>
