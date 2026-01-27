<script lang="ts" setup>
import type { Project } from "~/types";

const {
  totalPages,
  getProjectsForPage,
  getThumbnailUrl,
} = useGalleryProjects();

const currentPage = ref(0);
const modalVisible = ref(false);
const selectedProject = ref<Project | null>(null);

const currentPageProjects = computed(() => getProjectsForPage(currentPage.value));

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const openModal = (project: Project) => {
  selectedProject.value = project;
  modalVisible.value = true;
};

useParallax();
</script>

<template>
  <AppHeader />

  <div
    class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite mt-[calc(var(--uniform-3)*2+var(--text-heading-2))]"
    id="gallery"
  >

    <div class="h-12 bg-offwhite">

    </div>

    <div class="font-playfair text-charcoal tracking-wider">
      ■ GALLERY
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-uniform-4"
    >
      <GalleryProjectCard
        v-for="project in currentPageProjects"
        :key="project.id"
        :project="project"
        :thumbnail-url="getThumbnailUrl(project.thumbnail)"
        @click="openModal"
      />
    </div>

    <div class="flex justify-center items-center gap-uniform-6 py-uniform-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 0"
        :class="[
          'text-charcoal transition-colors p-2',
          currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold',
        ]"
        aria-label="Previous page"
      >
        <Icon name="solar:arrow-left-linear" class="text-icon-size-4" />
      </button>

      <div class="flex gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page - 1)"
          :class="[
            'w-uniform-7 h-uniform-7 border border-charcoal transition-colors',
            currentPage === page - 1
              ? 'bg-charcoal'
              : 'bg-transparent hover:bg-charcoal/30',
          ]"
          :aria-label="`Go to page ${page}`"
        />
      </div>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages - 1"
        :class="[
          'text-charcoal transition-colors p-2',
          currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold',
        ]"
        aria-label="Next page"
      >
        <Icon name="solar:arrow-right-linear" class="text-icon-size-4" />
      </button>
    </div>

  </div>

  <GalleryModal
    v-model:visible="modalVisible"
    :project="selectedProject"
  />

  <AppFooter />
</template>

