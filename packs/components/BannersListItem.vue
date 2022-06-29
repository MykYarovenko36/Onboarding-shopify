<template>
  <div class="flex-container flex-col stretched content-wrap" :style="bgColor">
    <div class="flex-container flex-row title-wrap flex-center">
      <span class="title" v-html="banner.title" />
      <span class="plug" :style="bgColor" />
    </div>
    <div class="product_detail"></div>
  </div>
</template>

<script>
export default {
  props: ['banner', 'color'],
  computed: {
    bgColor: ({ color, banner }) => {
      const defaultValue = '#FFFFFFF';
      const bgColor = color || banner.style['background-color'] || defaultValue;
      return { 'background-color': bgColor };
    },
  },
};
</script>

<style scoped>
.title-wrap {
  min-height: 40px;
  align-items: stretch;
  border-radius: 5px 5px 0 0;
}
.title {
  flex: 1;
  margin-top: 5px;
  font-weight: 700;
  overflow: hidden;
  padding: 10px 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 10px 0 0 0;
  border-bottom: var(--border-sm-2-gray);
  background-color: var(--palette-color-jogurt-yellow);
  box-shadow: inset 0 -1px 3px, 1px -1px 3px 0px var(--palette-color-dark);
}
.plug {
  min-width: 60px;
  margin-top: 2px;
  border-radius: 10px 5px 0 0;
  border-top: var(--border-sm-2-gray);
  border-left: var(--border-sm-2-gray);
  box-shadow: -2px -3px 3px -2px var(--palette-color-gray);
}
.content-wrap {
  border-radius: 5px;
}
.product_detail {
  margin: 0;
  flex: 1;
  padding: 20px;
  background: linear-gradient(
    to bottom right,
    var(--palette-color-white) -25%,
    transparent 40%
  );
}
</style>
