<script lang="ts" setup>
import type { PricingPackage } from "~/types";

interface Props {
  packages: PricingPackage[];
  selectedPackage: PricingPackage | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [pkg: PricingPackage];
}>();

const isSelected = (pkg: PricingPackage) => {
  return props.selectedPackage?.id === pkg.id;
};
</script>

<template>
  <div class="flex flex-col gap-uniform-4">
    <header class="flex flex-col gap-uniform-6">
      <h2 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 text-charcoal">
        Select Package
      </h2>
      <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-4 text-charcoal/70">
        Choose a package that best fits your event needs. All packages include professional editing and delivery.
      </p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-uniform-4 mt-uniform-4">
      <CalculatorPackageCard
        v-for="pkg in packages"
        :key="pkg.id"
        :package="pkg"
        :is-selected="isSelected(pkg)"
        @select="emit('select', pkg)"
      />
    </div>

    <!-- Selection confirmation -->
    <div
      v-if="selectedPackage"
      class="flex items-center gap-uniform-5 p-uniform-5 bg-gold/10 border border-gold/30 mt-uniform-4"
    >
      <Icon name="solar:check-circle-linear" class="text-icon-size-5 text-gold" />
      <span class="font-lato text-normal-4 text-charcoal">
        Selected: <strong>{{ selectedPackage.name }}</strong>
      </span>
    </div>
  </div>
</template>
