<template>
  ユーザー登録
  <v-form v-model="isValid">
    <!-- v-model="valid"> -->
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" :rules="passwordRules" label="password" required></v-text-field>
    <v-btn :disabled="!isValid || loading" color="success" class="mr-4" @click="submit">登録</v-btn>
  </v-form>
  <div>
    <div>
      {{ state }}
    </div>
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script setup>
const isValid = ref(false);
const loading = ref(false);
const state = ref("");
const message = ref("");
const emailRules = [
  v => !!v || 'メールアドレスを入力してください',
  v => /.+@.+\..+/.test(v) || ''
];
const passwordRules = [
  v => !!v || 'パスワードを入力してください',
  v => /^[\w-]{6,72}$/.test(v) || '6文字以上72文字以下で入力してください．'
]

const client = useSupabaseClient();

const email = ref("");
const password = ref("");

const submit = async () => {

  loading.value = true;
  state.value = "確認中";

  const session = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  console.log(session);
  if (session.error) {
    state.value = 'エラーが発生しました';
    message.value = session.error.message;
  } else {
    state.value = "認証メッセージを送信しました"
  }
};



</script>