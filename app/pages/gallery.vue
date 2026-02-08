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
const hoveredProjectId = ref<string | null>(null);

const currentPageProjects = computed(() => getProjectsForPage(currentPage.value));
const isAnyHovered = computed(() => hoveredProjectId.value !== null);

const handleHover = (projectId: string | null) => {
  hoveredProjectId.value = projectId;
};

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
</script>

<template>
  <div class="min-h-screen bg-offwhite">
    <AppHeader />

    <div class="bg-offwhite">
      <div
        class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 pt-[calc(var(--spacing-uniform-3)*2+var(--text-heading-3)+var(--spacing-uniform-5))] sm:pt-[calc(var(--spacing-uniform-3)*2+var(--text-heading-3)+var(--spacing-uniform-4))] md:pt-[calc(var(--spacing-uniform-3)*2+var(--text-heading-3)+var(--spacing-uniform-3))] lg:pt-[calc(var(--spacing-uniform-2)*2+var(--text-heading-4)+var(--spacing-uniform-2))] xl:pt-[calc(var(--spacing-uniform-2)*2+var(--text-heading-4)+var(--spacing-uniform-2))] xl:max-w-6xl xl:mx-auto"
        id="gallery"
      >
        <h1 class="font-playfair text-charcoal text-heading-3 sm:text-heading-2 md:text-heading-2 lg:text-heading-1 xl:text-heading-1">
          Gallery
        </h1>

        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-uniform-5 sm:gap-uniform-4 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3"
        >
          <GalleryProjectCard
            v-for="project in currentPageProjects"
            :key="project.id"
            :project="project"
            :thumbnail-url="getThumbnailUrl(project.thumbnail)"
            :is-any-hovered="isAnyHovered"
            :is-hovered="hoveredProjectId === project.id"
            @click="openModal"
            @hover="handleHover"
          />
        </div>

        <div class="flex justify-center items-center gap-uniform-4 sm:gap-uniform-5 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3 py-uniform-5 sm:py-uniform-4 md:py-uniform-3 xl:py-uniform-3">
          <button
            @click="prevPage"
            :disabled="currentPage === 0"
            :class="[
              'text-charcoal transition-colors min-w-11 min-h-11 flex items-center justify-center',
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold active:text-gold',
            ]"
            aria-label="Previous page"
          >
            <Icon name="solar:arrow-left-linear" class="text-icon-size-4 sm:text-icon-size-4 md:text-icon-size-5 lg:text-icon-size-5 xl:text-icon-size-5" />
          </button>

          <div class="flex gap-uniform-5 sm:gap-uniform-6 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page - 1)"
              :class="[
                'w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-2.5 lg:h-2.5 xl:w-2.5 xl:h-2.5 border border-charcoal transition-colors',
                currentPage === page - 1
                  ? 'bg-charcoal'
                  : 'bg-transparent hover:bg-charcoal/30 active:bg-charcoal/50',
              ]"
              :aria-label="`Go to page ${page}`"
            />
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages - 1"
            :class="[
              'text-charcoal transition-colors min-w-11 min-h-11 flex items-center justify-center',
              currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gold active:text-gold',
            ]"
            aria-label="Next page"
          >
            <Icon name="solar:arrow-right-linear" class="text-icon-size-4 sm:text-icon-size-4 md:text-icon-size-5 lg:text-icon-size-5 xl:text-icon-size-5" />
          </button>
        </div>

        <GalleryModal
          v-model:visible="modalVisible"
          :project="selectedProject"
        />

        <AppFooter />
      </div>
    </div>
  </div>
</template>
