<script lang="ts" setup>
import type { PricingAddOn, ReservationAddOn } from "~/types";

interface Props {
  addOnsByCategory: Record<string, PricingAddOn[]>;
  categoryLabels: Record<string, string>;
  selectedAddOns: ReservationAddOn[];
  basePrice: number;
  getAddOnDisplayPrice: (addOn: PricingAddOn) => number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggle: [addOn: PricingAddOn];
}>();

const isSelected = (addOn: PricingAddOn) => {
  return props.selectedAddOns.some((a) => a.id === addOn.id);
};
</script>

<template>
  <div class="flex flex-col gap-uniform-4">
    <header class="flex flex-col gap-uniform-6">
      <h2 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 text-charcoal">
        Add-ons
      </h2>
      <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-4 text-charcoal/70">
        Enhance your package with additional services. This step is optional.
      </p>
    </header>

    <div v-if="basePrice === 0" class="p-uniform-5 bg-charcoal/5 border border-charcoal/20 mt-uniform-4">
      <div class="flex items-center gap-uniform-5">
        <Icon name="solar:info-circle-linear" class="text-icon-size-5 text-charcoal/60" />
        <span class="font-lato text-normal-4 text-charcoal/70">
          Please select a package first to see add-on pricing.
        </span>
      </div>
    </div>

    <div v-else class="flex flex-col gap-uniform-4 mt-uniform-4">
      <div
        v-for="(addOns, category) in addOnsByCategory"
        :key="category"
        class="flex flex-col"
      >
        <h3 class="font-playfair text-heading-5 sm:text-heading-4 md:text-heading-5 text-charcoal mb-uniform-5">
          {{ categoryLabels[category] || category }}
        </h3>
        <div class="flex flex-col">
          <CalculatorAddOnItem
            v-for="addOn in addOns"
            :key="addOn.id"
            :add-on="addOn"
            :is-selected="isSelected(addOn)"
            :display-price="getAddOnDisplayPrice(addOn)"
            @toggle="emit('toggle', addOn)"
          />
        </div>
      </div>
    </div>

    <!-- Skip message -->
    <div class="flex items-center gap-uniform-5 p-uniform-5 bg-charcoal/5 border border-charcoal/20">
      <Icon name="solar:arrow-right-linear" class="text-icon-size-5 text-charcoal/60" />
      <span class="font-lato text-normal-4 text-charcoal/70">
        Add-ons are optional. You can skip this step if you don't need any extras.
      </span>
    </div>
  </div>
</template>
