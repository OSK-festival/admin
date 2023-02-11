<template>
  <v-alert color="red" icon="mdi-alert" title="ログインしてください" variant="flat">
    これは各団体の代表者のためのサイトです。会員登録をしていない団体の代表者はすぐに幹部へ連絡してください。
  </v-alert>
  <v-container>
    <TheAuth isSignup="false">
      <template v-slot:title>ログイン</template>
      <template v-slot:submitText>ログイン</template>
    </TheAuth>
  </v-container>
</template>

<script setup>


const user = useSupabaseUser();
// const user = useSupabaseAuthClient();
console.log(user.value)
if (user.value) {
  console.log("ログイン済み");
  console.log(user.value);
} else {
  console.log("ログインしていません");
  console.log(user.value);
  // navigateTo('/signin');
}

// watchEffect(() => {
// watchEffect(() => {
//   if (user.value) {
//     // return navigateTo('/');
//     return navigateTo('/dashboard');
//   }
// });
  // }
// })
</script>