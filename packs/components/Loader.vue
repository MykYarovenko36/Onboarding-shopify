<template>
  <div class="loader_wrap flex-container flex-center stretched">
    <div class="lds-ring">
      <div class="loader_rings-ring"></div>
      <div class="loader_rings-ring"></div>
      <div class="loader_rings-ring"></div>
      <div class="loader_rings-ring"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>
.loader_wrap {
  left: 0;
  top: 0;
  position: absolute;
  z-index: 10000;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring .loader_rings-ring {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--palette-color-primary);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--palette-color-primary) transparent transparent transparent;
}
.lds-ring .loader_rings-ring:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring .loader_rings-ring:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring .loader_rings-ring:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
