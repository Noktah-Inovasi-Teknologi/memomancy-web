<script lang="ts" setup>
import type { PricingPackage, PackageIncludedItem } from "~/types";
import { formatPrice } from "~/data/pricingData";

interface Props {
  package: PricingPackage;
  isSelected: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  select: [pkg: PricingPackage];
}>();

const formattedOriginalPrice = computed(() => formatPrice(props.package.originalPrice));
const formattedDiscountedPrice = computed(() => formatPrice(props.package.discountedPrice));

// Group included items by category
const groupedItems = computed(() => {
  const groups: Record<string, PackageIncludedItem[]> = {};
  props.package.includedItems.forEach((item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
  });
  return groups;
});

// Get category order for consistent display
const categoryOrder = ["Core Service", "Editing", "Gear", "Crew", "Scale & Complexity"];
const sortedCategories = computed(() => {
  return Object.keys(groupedItems.value).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
});
</script>

<template>
  <button
    :class="[
      'flex flex-col text-left border transition-colors p-uniform-5 sm:p-uniform-4 md:p-uniform-4 lg:p-uniform-5 xl:p-uniform-5 w-full h-full',
      isSelected
        ? 'border-gold bg-gold/5'
        : 'border-charcoal/30 hover:border-charcoal/60',
    ]"
    @click="emit('select', props.package)"
  >
    <div class="flex items-start justify-between gap-uniform-5 w-full mb-uniform-5">
      <div class="flex flex-col gap-uniform-7">
        <div class="flex items-center gap-uniform-6">
          <span
            v-if="props.package.popular"
            class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-gold uppercase tracking-wider"
          >
            Most Popular
          </span>
          <span
            class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-offwhite bg-gold px-uniform-6 py-uniform-7"
          >
            -{{ props.package.discountPercentage }}%
          </span>
        </div>
        <h3
          class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal"
        >
          {{ props.package.name }}
        </h3>
      </div>
      <div
        :class="[
          'w-5 h-5 sm:w-6 sm:h-6 border flex items-center justify-center shrink-0 mt-1',
          isSelected ? 'border-gold bg-gold' : 'border-charcoal/50',
        ]"
      >
        <Icon
          v-if="isSelected"
          name="solar:check-read-linear"
          class="text-offwhite text-[12px] sm:text-[14px]"
        />
      </div>
    </div>

    <p
      class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/70 mb-uniform-4"
    >
      {{ props.package.description }}
    </p>

    <!-- Price display with discount -->
    <div class="flex flex-col gap-uniform-7 mb-uniform-4">
      <!-- Original price (struck through) -->
      <div class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-charcoal/50 line-through">
        Rp {{ formattedOriginalPrice }}
      </div>
      <!-- Discounted price -->
      <div class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-2 lg:text-heading-3 xl:text-heading-3 text-charcoal">
        <span class="text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3">Rp</span>
        {{ formattedDiscountedPrice }}
      </div>
    </div>

    <USeparator class="mb-uniform-4" :ui="{ root: 'border-charcoal/20' }" />

    <!-- Categorized included items (without prices) -->
    <div class="flex flex-col gap-uniform-5 grow">
      <div
        v-for="category in sortedCategories"
        :key="category"
        class="flex flex-col gap-uniform-6"
      >
        <span
          class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/50 uppercase tracking-wider"
        >
          {{ category }}
        </span>
        <ul class="flex flex-col gap-uniform-6">
          <li
            v-for="item in groupedItems[category]"
            :key="item.service"
            class="flex items-start gap-uniform-6"
          >
            <Icon
              name="solar:check-circle-linear"
              class="text-icon-size-6 sm:text-icon-size-5 md:text-icon-size-5 lg:text-icon-size-6 xl:text-icon-size-6 text-gold shrink-0 mt-0.5"
            />
            <span
              class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/80"
            >
              {{ item.service }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </button>
</template>
