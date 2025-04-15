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
    <InputText pt:root="!bg-red-500" />
    <Icon name="uil:github" size="2xl" class="text-red-500" />
  </div>
</template>