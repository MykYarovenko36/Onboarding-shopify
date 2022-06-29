<template>
  <div class="editor flex-container flex-col">
    <div class="flex-container flex-row editor-buttons__box">
      <button class="btn editor-buttons__box-item to-uppercase" @click="submit">
        ok
      </button>
      <button
        class="btn editor-buttons__box-item to-uppercase"
        @click="$emit('close')"
      >
        cancel
      </button>
    </div>
    <v-editor
      :initialValue="this.editField.value"
      :options="editorOptions"
      ref="editor"
      height="500px"
      initialEditType="wysiwyg"
      previewStyle="vertical"
    />
  </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';

import options from '../configs/toastEditor';

import '@toast-ui/editor/dist/toastui-editor.css';

export default {
  name: 'ToastUiEditor',
  props: ['editField'],
  components: {
    'v-editor': Editor,
  },
  data() {
    return {
      editorOptions: {
        ...options,
      },
    };
  },
  methods: {
    submit() {
      this.$emit('submit', {
        [this.editField.key]: this.$refs.editor.invoke('getMarkdown'),
      });
    },
  },
};
</script>

<style>
.editor-buttons__box {
  flex-grow: 1;
  justify-content: flex-end;
  background-color: transparent;
}

.editor-buttons__box > .editor-buttons__box-item {
  border-radius: unset;
  margin: 0 0 0 10px;
}
.editor {
  max-width: 520px;
}
</style>
