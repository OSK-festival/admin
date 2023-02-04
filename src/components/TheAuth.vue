<template>
  <slot name="title">title</slot>
  <v-form v-model="isValid">
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" :rules="passwordRules" label="password" required></v-text-field>
    <v-btn :disabled="!isValid || loading" color="success" class="mr-4" @click="submit">
      <slot name="submitText">submitText</slot>
    </v-btn>
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
<script lang="ts" setup>
interface Props {
  isSignup: "true" | "false";
}

const props = withDefaults(defineProps<Props>(), {
  isSignup: "false",
});


let isSignup = (props.isSignup == "true");
console.log(isSignup);
const isValid = ref(false);
const loading = ref(false);

const state = ref("");
const message = ref("");

const email = ref("");
const password = ref("");

const client = useSupabaseClient();

const emailRules = [
  (v: any) => !!v || 'メールアドレスを入力してください',
  (v: any) => /.+@.+\..+/.test(v) || ''
];

const passwordRules = [
  (v: any) => !!v || 'パスワードを入力してください',
  (v: any) => /^[\w-]{6,72}$/.test(v) || '6文字以上72文字以下で入力してください．'
]

const submit = async () => {
  loading.value = true;
  state.value = "確認中";
  let session;
  if (isSignup) {
    session = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
  }
  else {
    session = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
  }
  console.log(session);
  if (session.error) {
    state.value = 'エラーが発生しました';
    message.value = session.error.message;
  } else {
    state.value = "認証メッセージを送信しました"
  }
};

</script>