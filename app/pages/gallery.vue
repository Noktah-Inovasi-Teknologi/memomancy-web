<script lang="ts" setup>
useSeoMeta({
  title: `Galeri | ${useRuntimeConfig().app.name}`,
});
</script>

<template>
  <div class="w-full flex flex-col bg-color-alternating">
    <div class="flex flex-col md:flex-row m-8 gap-uniform-4" id="filter">
      <InputGroup>
        <InputGroupAddon
          ><Icon class="bg-[#1F1F1F] dark:bg-[#F5F2EB]" name="uil:search"
        /></InputGroupAddon>
        <InputText label="Cari" />
      </InputGroup>
      <div class="flex gap-uniform-4">
        <Button class="w-full flex items-center gap-uniform-4 justify-between">
          <Icon name="uil:filter" class="icon-size-4" />
          <p class="text-nowrap paragraph-3">Filter</p>
        </Button>
        <Button class="w-full flex items-center gap-uniform-4 justify-between">
          <Icon name="uil:arrows-v-alt" class="icon-size-4" />
          <p class="text-nowrap paragraph-3">Urutkan:</p>
        </Button>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="gallery">
      <GalleryGrid />
      <Paginator
        :template="{
          '640px': 'PrevPageLink CurrentPageReport NextPageLink',
          '768px':
            'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
          default:
            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        }"
        :rows="20"
        :totalRecords="120"
      />
    </div>
  </div>
</template>

<style scoped>
.p-inputgroup > .p-inputtext:last-child {
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;
}
.p-inputgroup > .p-inputgroupaddon:first-child {
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
}
</style>
