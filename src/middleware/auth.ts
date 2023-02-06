export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  console.debug(user);
  if (user.value) {
    return navigateTo('/dashboard')
  }
})