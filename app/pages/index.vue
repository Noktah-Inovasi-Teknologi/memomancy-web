<script lang="ts" setup>

const colorMode = useColorMode()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <NuxtLink to="/api/login" external>
      Sign in
    </NuxtLink>
    <NuxtLink to="/api/register" external>
      Sign up
    </NuxtLink>
  </div>
</template>