<script lang="ts" setup>
import type {
  ReservationEventDetails,
  ReservationCustomerInfo,
  ReservationAddOn,
  ReservationStepNumber,
  PricingPackage,
} from "~/types";
import { formatPrice } from "~/data/pricingData";
import { getRegionById } from "~/data/eastJavaRegions";

interface Props {
  eventDetails: ReservationEventDetails;
  selectedPackage: PricingPackage;
  selectedAddOns: ReservationAddOn[];
  customerInfo: ReservationCustomerInfo;
  totalPrice: number;
  addOnsTotal: number;
  isSubmitting: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [];
  "edit-step": [step: ReservationStepNumber];
}>();

const formattedDate = computed(() => {
  if (!props.eventDetails.eventDate) return "Not selected";
  return props.eventDetails.eventDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const regionName = computed(() => {
  const region = getRegionById(props.eventDetails.region);
  return region?.name || props.eventDetails.region;
});

const venueTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    indoor: "Indoor",
    outdoor: "Outdoor",
    both: "Indoor & Outdoor",
  };
  return labels[props.eventDetails.venueType] || props.eventDetails.venueType;
});

const canSubmit = computed(() => {
  return !props.isSubmitting;
});

const handleSubmit = () => {
  if (canSubmit.value) {
    emit("submit");
  }
};
</script>

<template>
  <div class="flex flex-col gap-uniform-4">
    <header class="flex flex-col gap-uniform-6">
      <h2 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 text-charcoal">
        Review & Confirm
      </h2>
      <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-4 text-charcoal/70">
        Please review your reservation details before confirming.
      </p>
    </header>

    <div class="flex flex-col gap-uniform-4 mt-uniform-4">
      <!-- Event Details Card -->
      <div class="border border-charcoal/20 p-uniform-5">
        <div class="flex items-center justify-between mb-uniform-5">
          <h3 class="font-playfair text-heading-5 sm:text-heading-4 text-charcoal">
            Event Details
          </h3>
          <button
            class="font-lato text-normal-4 text-gold hover:underline"
            @click="emit('edit-step', 1)"
          >
            Edit
          </button>
        </div>
        <div class="flex flex-col gap-uniform-5">
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Date</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ formattedDate }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Location</span>
            <span class="font-lato text-normal-4 text-charcoal text-right max-w-[60%]">
              {{ eventDetails.location }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Region</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ regionName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Venue Type</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ venueTypeLabel }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Guests</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ eventDetails.guestCount }} people</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Duration</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ eventDetails.eventDuration }} hours</span>
          </div>
        </div>
      </div>

      <!-- Package Card -->
      <div class="border border-charcoal/20 p-uniform-5">
        <div class="flex items-center justify-between mb-uniform-5">
          <h3 class="font-playfair text-heading-5 sm:text-heading-4 text-charcoal">
            Package
          </h3>
          <button
            class="font-lato text-normal-4 text-gold hover:underline"
            @click="emit('edit-step', 2)"
          >
            Edit
          </button>
        </div>
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <span class="font-lato text-normal-3 text-charcoal font-medium">
              {{ selectedPackage.name }}
            </span>
            <span class="font-lato text-normal-5 text-charcoal/60">
              {{ selectedPackage.description }}
            </span>
          </div>
          <span class="font-lato text-normal-3 text-charcoal shrink-0">
            Rp {{ formatPrice(selectedPackage.discountedPrice) }}
          </span>
        </div>
      </div>

      <!-- Add-ons Card -->
      <div v-if="selectedAddOns.length > 0" class="border border-charcoal/20 p-uniform-5">
        <div class="flex items-center justify-between mb-uniform-5">
          <h3 class="font-playfair text-heading-5 sm:text-heading-4 text-charcoal">
            Add-ons
          </h3>
          <button
            class="font-lato text-normal-4 text-gold hover:underline"
            @click="emit('edit-step', 3)"
          >
            Edit
          </button>
        </div>
        <div class="flex flex-col gap-uniform-5">
          <div
            v-for="addOn in selectedAddOns"
            :key="addOn.id"
            class="flex justify-between"
          >
            <span class="font-lato text-normal-4 text-charcoal">{{ addOn.name }}</span>
            <span class="font-lato text-normal-4 text-charcoal">
              Rp {{ formatPrice(addOn.calculatedPrice) }}
            </span>
          </div>
          <USeparator :ui="{ root: 'border-charcoal/20' }" />
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Add-ons Total</span>
            <span class="font-lato text-normal-4 text-charcoal">
              Rp {{ formatPrice(addOnsTotal) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Customer Info Card -->
      <div class="border border-charcoal/20 p-uniform-5">
        <div class="flex items-center justify-between mb-uniform-5">
          <h3 class="font-playfair text-heading-5 sm:text-heading-4 text-charcoal">
            Contact Information
          </h3>
          <button
            class="font-lato text-normal-4 text-gold hover:underline"
            @click="emit('edit-step', 4)"
          >
            Edit
          </button>
        </div>
        <div class="flex flex-col gap-uniform-5">
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Name</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ customerInfo.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Email</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ customerInfo.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-lato text-normal-4 text-charcoal/60">Phone</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ customerInfo.phone }}</span>
          </div>
          <div v-if="customerInfo.notes" class="flex flex-col gap-uniform-6">
            <span class="font-lato text-normal-4 text-charcoal/60">Notes</span>
            <span class="font-lato text-normal-4 text-charcoal">{{ customerInfo.notes }}</span>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="bg-charcoal p-uniform-5">
        <div class="flex justify-between items-center">
          <span class="font-lato text-normal-3 text-offwhite">Total Estimate</span>
          <span class="font-playfair text-heading-3 sm:text-heading-2 text-gold">
            Rp {{ formatPrice(totalPrice) }}
          </span>
        </div>
        <p class="font-lato text-normal-5 text-offwhite/60 mt-uniform-5">
          Final pricing may vary based on specific requirements discussed with our team.
        </p>
      </div>

      <!-- Submit Button -->
      <button
        :disabled="!canSubmit"
        :class="[
          'w-full py-uniform-4 font-lato text-normal-3 transition-colors flex items-center justify-center gap-uniform-5',
          canSubmit
            ? 'bg-gold text-offwhite hover:bg-gold/90'
            : 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed',
        ]"
        @click="handleSubmit"
      >
        <Icon
          v-if="isSubmitting"
          name="solar:refresh-linear"
          class="text-icon-size-5 animate-spin"
        />
        <span v-if="isSubmitting">Submitting...</span>
        <template v-else>
          <Icon name="solar:chat-round-call-linear" class="text-icon-size-5" />
          <span>Confirm & Open WhatsApp</span>
        </template>
      </button>
    </div>
  </div>
</template>
