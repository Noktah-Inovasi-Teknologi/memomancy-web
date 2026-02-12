<script lang="ts" setup>
import type { PricingPackage, ReservationAddOn, ReservationStepNumber } from "~/types";
import { formatPrice } from "~/data/pricingData";

interface Props {
  selectedPackage: PricingPackage | null;
  selectedAddOns: ReservationAddOn[];
  totalPrice: number;
  currentStep: ReservationStepNumber;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  continue: [];
}>();

const buttonText = computed(() => {
  if (props.currentStep === 5) return "Review Complete";
  if (props.currentStep === 4) return "Review & Confirm";
  return "Continue";
});

const showContinueButton = computed(() => props.currentStep < 5);
</script>

<template>
  <div class="border border-charcoal/20 p-uniform-5 sm:p-uniform-4 bg-offwhite">
    <h3 class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-4 text-charcoal mb-uniform-4">
      Reservation Summary
    </h3>

    <div v-if="!selectedPackage" class="flex flex-col items-center py-uniform-4 text-center">
      <Icon name="solar:bag-4-linear" class="text-icon-size-3 text-charcoal/30 mb-uniform-5" />
      <p class="font-lato text-normal-4 text-charcoal/50">
        Select a package to see your summary
      </p>
    </div>

    <template v-else>
      <!-- Package -->
      <div class="flex flex-col gap-uniform-5 pb-uniform-4 border-b border-charcoal/20">
        <div class="flex justify-between">
          <span class="font-lato text-normal-4 text-charcoal/60">Package</span>
        </div>
        <div class="flex justify-between items-start">
          <span class="font-lato text-normal-4 text-charcoal font-medium max-w-[60%]">
            {{ selectedPackage.name }}
          </span>
          <span class="font-lato text-normal-4 text-charcoal">
            Rp {{ formatPrice(selectedPackage.discountedPrice) }}
          </span>
        </div>
      </div>

      <!-- Add-ons -->
      <div v-if="selectedAddOns.length > 0" class="flex flex-col gap-uniform-5 py-uniform-4 border-b border-charcoal/20">
        <span class="font-lato text-normal-4 text-charcoal/60">Add-ons</span>
        <div
          v-for="addOn in selectedAddOns"
          :key="addOn.id"
          class="flex justify-between"
        >
          <span class="font-lato text-normal-5 text-charcoal max-w-[60%]">
            {{ addOn.name }}
          </span>
          <span class="font-lato text-normal-5 text-charcoal">
            +Rp {{ formatPrice(addOn.calculatedPrice) }}
          </span>
        </div>
      </div>

      <!-- Total -->
      <div class="flex justify-between items-center pt-uniform-4">
        <span class="font-lato text-normal-3 text-charcoal font-medium">
          Total Estimate
        </span>
        <span class="font-playfair text-heading-4 sm:text-heading-3 text-gold">
          Rp {{ formatPrice(totalPrice) }}
        </span>
      </div>

      <!-- Continue Button -->
      <button
        v-if="showContinueButton"
        class="w-full mt-uniform-4 py-uniform-5 bg-charcoal text-offwhite font-lato text-normal-4 hover:bg-charcoal/90 transition-colors flex items-center justify-center gap-uniform-5"
        @click="emit('continue')"
      >
        {{ buttonText }}
        <Icon name="solar:arrow-right-linear" class="text-icon-size-5" />
      </button>
    </template>

    <!-- Step Progress -->
    <div class="mt-uniform-4 pt-uniform-4 border-t border-charcoal/20">
      <div class="flex items-center justify-between mb-uniform-6">
        <span class="font-lato text-normal-5 text-charcoal/60">Progress</span>
        <span class="font-lato text-normal-5 text-charcoal">{{ currentStep }} of 5</span>
      </div>
      <div class="flex gap-uniform-6">
        <div
          v-for="step in 5"
          :key="step"
          :class="[
            'flex-1 h-1',
            step <= currentStep ? 'bg-gold' : 'bg-charcoal/20',
          ]"
        />
      </div>
    </div>
  </div>
</template>
