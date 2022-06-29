<template>
  <header class="header flex-container">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.header {
  width: 100%;
  min-height: 60px;
  justify-content: stretch;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
