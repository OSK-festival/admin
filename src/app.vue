<template>
  <v-app>
    <v-app-bar title="記念祭運営システム">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="right" temporary>
      メニュー
    </v-navigation-drawer>

    <v-main>
      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>
    </v-main>
  </v-app>

</template>

<script setup>
const links = [
  'Dashboard',
  'Messages',
  'Profile',
  'Updates',
]

const drawer = ref(false);

</script>