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
    <!-- <v-progress-circular v-if="submitting" indeterminate color="red"></v-progress-circular> -->
    <v-overlay :model-value="submitting" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
const submitting = ref(false);

const state = ref("");
const message = ref("");

const email = ref("");
const password = ref("");

const user = useSupabaseUser();

const client = useSupabaseClient();

const emailRules = [
  (v: any) => !!v || 'メールアドレスを入力してください',
  (v: any) => /.+@.+\..+/.test(v) || ''
];

const passwordRules = [
  (v: any) => !!v || 'パスワードを入力してください',
  (v: any) => isSignup ? (/^[\w-]{6,72}$/.test(v) || '6文字以上72文字以下で入力してください．') : (/^[\w-]{6,72}$/.test(v) || '入力してください')
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
    submitting.value = true;
    state.value = isSignup ? "認証メッセージを送信しました" : "読み込み中"
  }

  if (!isSignup) {
    // return navigateTo('/dashboard')
  }
  watchEffect(() => {
  if (user.value) {
    // return navigateTo('/');
    return navigateTo('/dashboard');
  }
});
};
</script>