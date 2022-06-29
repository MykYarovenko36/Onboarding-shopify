<template>
  <div class="modal">
    <div v-if="error" class="errorMessage">
      <p>type: {{ error.message }}</p>
      <p>method: {{ error.method }}</p>
    </div>
    <div v-html="errorTemplate" />
  </div>
</template>

<script>
import errorTemplate from '../shared/errorTemplate';

export default {
  name: 'ErrorBoundry',
  props: {
    error: {
      type: Object,
    },
  },
  data() {
    return {
      errorTemplate: errorTemplate,
    };
  },
};
</script>

<style>
.errorMessage {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 20px;
  min-width: 300px;
  min-height: 120px;
  font-size: 1.2em;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
}
</style>
