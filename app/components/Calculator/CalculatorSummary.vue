<script lang="ts" setup>
import type { PricingPackage, PricingAddOn } from "~/types";
import { formatPrice } from "~/data/pricingData";

interface Props {
  selectedPackage: PricingPackage | null;
  selectedAddOns: PricingAddOn[];
  total: number;
  whatsAppUrl: string;
  getAddOnDisplayPrice: (addOn: PricingAddOn) => number;
}

const props = defineProps<Props>();

const formattedTotal = computed(() => formatPrice(props.total));
</script>

<template>
  <div
    class="border border-charcoal/30 p-uniform-5 sm:p-uniform-4 md:p-uniform-4 lg:p-uniform-5 xl:p-uniform-5"
  >
    <h3
      class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal mb-uniform-4"
    >
      Summary
    </h3>

    <div v-if="!selectedPackage" class="py-uniform-4">
      <p
        class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/60 text-center"
      >
        Select a package to get started
      </p>
    </div>

    <div v-else class="flex flex-col gap-uniform-5">
      <!-- Package name with discount badge -->
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-uniform-6">
          <span
            class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal font-medium"
          >
            {{ selectedPackage.name }} Package
          </span>
          <span
            class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-offwhite bg-gold px-uniform-6 py-uniform-7"
          >
            -{{ selectedPackage.discountPercentage }}%
          </span>
        </div>
        <div class="flex flex-col items-end shrink-0">
          <span
            class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/50 line-through"
          >
            Rp {{ formatPrice(selectedPackage.originalPrice) }}
          </span>
          <span
            class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-gold"
          >
            Rp {{ formatPrice(selectedPackage.discountedPrice) }}
          </span>
        </div>
      </div>

      <!-- Selected add-ons -->
      <div
        v-for="addOn in selectedAddOns"
        :key="addOn.id"
        class="flex justify-between items-center"
      >
        <span
          class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/70"
        >
          + {{ addOn.name }}
        </span>
        <span
          class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/70 shrink-0"
        >
          <template v-if="addOn.isPercentage">
            +{{ addOn.price }}% (Rp {{ formatPrice(getAddOnDisplayPrice(addOn)) }})
          </template>
          <template v-else>
            Rp {{ formatPrice(addOn.price) }}
          </template>
        </span>
      </div>

      <USeparator :ui="{ root: 'border-charcoal/30' }" />

      <div class="flex justify-between items-center">
        <span
          class="font-playfair text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-5 xl:text-heading-5 text-charcoal"
        >
          Estimated Total
        </span>
        <span
          class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal"
        >
          Rp {{ formattedTotal }}
        </span>
      </div>

      <p
        class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/60"
      >
        *Final pricing may vary based on location and specific requirements
      </p>

      <a
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center gap-uniform-6 border border-gold text-gold font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 py-uniform-5 sm:py-uniform-4 md:py-uniform-4 lg:py-uniform-5 xl:py-uniform-5 mt-uniform-4 hover:bg-gold hover:text-offwhite transition-colors"
      >
        <Icon name="solar:chat-round-dots-linear" class="text-icon-size-5" />
        Chat via WhatsApp
      </a>
    </div>
  </div>
</template>
