<template>
  <div class="root">
    <div>
      <h2>file-loader</h2>
      <img src="~/assets/nuxt.svg" />
    </div>

    <div>
      <h2>url-loader</h2>
      <img src="~/assets/nuxt.svg?data" />
    </div>

    <div>
      <h2>vue-svg-loader</h2>
      <NuxtLogo />
    </div>

    <div>
      <h2>raw-loader</h2>
      <div v-html="rawNuxtLogo" />
    </div>

    <div>
      <h2>svg-sprite-loader</h2>
      <svg :viewBox="spriteNuxtLogo.viewBox">
        <use :xlink:href="'#' + spriteNuxtLogo.id"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import NuxtLogo from "~/assets/nuxt.svg?inline";
import spriteNuxtLogo from "~/assets/nuxt.svg?sprite";
import rawNuxtLogo from "~/assets/nuxt.svg?raw";

export default {
  components: { NuxtLogo, spriteNuxtLogo },

  data() {
    return { rawNuxtLogo, spriteNuxtLogo };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;

  height: 100%;
  background-color: #eee;
}

.root {
  font-family: sans-serif;

  display: grid;
  gap: 2px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.root > div {
  background-color: #fff;
  padding: 20px;
}

h2 {
  margin-top: 0;
}
</style>
