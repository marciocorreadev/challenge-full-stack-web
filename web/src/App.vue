<template>
  <v-app id="inspire">

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>

  </v-app>
</template>

<script>

export default {
  
};
</script>
