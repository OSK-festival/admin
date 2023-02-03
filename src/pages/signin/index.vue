<template>
  <v-form>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" label="password" required></v-text-field>
    <v-btn color="success" class="mr-4" @click="submit">aa</v-btn>
  </v-form>
</template>

<script setup>
const emailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+/.test(v) || 'E-mail must be valid',
];
const router = useRouter();
const client = useSupabaseClient();

const email = ref("");
const password = ref("");

const submit = async () => {
  const session = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (session) {
    // router.push("/");
    console.log(session);
  }
};


</script>