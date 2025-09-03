<script lang="ts" setup>
const { $viewport } = useNuxtApp();
const route = useRoute();

const kindeClient = useKindeClient();
const { data: hasAccess } = await useAsyncData(async () => {
  return (await kindeClient?.getPermission("dashboard")) ?? {};
});

const navbarMenu = computed(() => {
  const baseMenu = [
    { label: "Beranda", to: "/" },
    { label: "Galeri", to: "/gallery" },
    { label: "Reservasi", to: "/reservation" },
  ];
  
  if (hasAccess.value?.isGranted) {
    baseMenu.push({ label: "Dashboard", to: "/dashboard" });
  }
  
  return baseMenu;
});

const navbarMenuUser = ref();
const userMenuItems = [
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      navigateTo("/api/logout", { external: true });
    },
  },
];

const toggleMenuNavbar = (event: Event) => {
  navbarMenuUser.value.toggle(event);
};
</script>

<template>
  <div class="bg-color-alternating sticky top-0 z-50">
    <div style="padding: var(--padding-container)">
      <Menubar
        breakpoint="767px"
        class="flex justify-between items-center"
        :model="navbarMenu"
        :pt="{
          end: {
            class: [
              'flex !ml-0',
              {
                'w-full': $viewport.isLessThan('md'),
              },
            ],
          },
          itemContent: {
            class: 'font-semibold',
          },
        }"
      >
        <template #start v-if="$viewport.isGreaterOrEquals('md')">
          <p class="heading-4 han-downed">Memomancy</p>
        </template>
        <template #item="{ item, props }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            :to="item.to"
            class="transition-colors duration-200 text-normal-3"
            :class="{
              'memomancy-nav-item-active': route.path === item.to,
              'memomancy-nav-item': route.path !== item.to,
            }"
            :style="{
              padding: 'var(--spacing-uniform-6) var(--spacing-uniform-5)',
              borderRadius: 'var(--radius-memomancy)',
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
        <template #end>
          <div
            :class="[
              'flex justify-between items-center gap-4',
              { 'w-full': $viewport.isLessThan('md') },
            ]"
          >
            <p v-if="$viewport.isLessThan('md')" class="heading-4 han-downed">
              Memomancy
            </p>
            <div class="flex gap-2 items-center text-normal-3">
              <template v-if="!$auth.loggedIn && $viewport.isGreaterThan('xs')">
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="nuxtlink-btn nuxtlink-btn-contrast"
                >
                  Masuk
                </NuxtLink>
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="nuxtlink-btn nuxtlink-btn-secondary"
                >
                  Daftar
                </NuxtLink>
              </template>
              <template v-if="$auth.loggedIn">
                <div class="flex gap-uniform-4">
                  <div class="flex gap-uniform-6">
                    <p v-if="$viewport.isGreaterThan('sm')">Halo,</p>
                    <p class="font-bold">{{ $auth.user.given_name }}</p>
                  </div>
                  <Button
                    type="button"
                    class="!p-0 w-(--icon-size-4) h-(--icon-size-4)"
                    @click="toggleMenuNavbar"
                    aria-haspopup="true"
                    aria-controls="menu-navbar"
                  >
                    <Icon name="uil:ellipsis-v" class="icon-size-5" />
                  </Button>
                  <Menu
                    ref="navbarMenuUser"
                    id="menu-navbar"
                    :model="userMenuItems"
                    :popup="true"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>
      </Menubar>
    </div>
  </div>
</template>
