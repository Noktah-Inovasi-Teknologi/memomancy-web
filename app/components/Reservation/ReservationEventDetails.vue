<script lang="ts" setup>
import type { ReservationEventDetails, VenueType, EastJavaRegion } from "~/types";

interface Props {
  eventDetails: ReservationEventDetails;
  coveredRegions: EastJavaRegion[];
  errors: Record<string, string>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  update: [updates: Partial<ReservationEventDetails>];
}>();

const venueTypes: { value: VenueType; label: string; icon: string }[] = [
  { value: "indoor", label: "Indoor", icon: "solar:home-2-linear" },
  { value: "outdoor", label: "Outdoor", icon: "solar:sun-2-linear" },
  { value: "both", label: "Both", icon: "solar:buildings-2-linear" },
];

const durationOptions = [2, 4, 6, 8, 10, 12];

const handleDateSelect = (date: Date) => {
  emit("update", { eventDate: date });
};

const handleLocationChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update", { location: target.value });
};

const handleRegionChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit("update", { region: target.value });
};

const handleVenueTypeChange = (venueType: VenueType) => {
  emit("update", { venueType });
};

const incrementGuests = () => {
  emit("update", { guestCount: props.eventDetails.guestCount + 1 });
};

const decrementGuests = () => {
  if (props.eventDetails.guestCount > 1) {
    emit("update", { guestCount: props.eventDetails.guestCount - 1 });
  }
};

const handleGuestCountChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = parseInt(target.value) || 1;
  emit("update", { guestCount: Math.max(1, value) });
};

const handleDurationChange = (duration: number) => {
  emit("update", { eventDuration: duration });
};

const formattedSelectedDate = computed(() => {
  if (!props.eventDetails.eventDate) return null;
  return props.eventDetails.eventDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <div class="flex flex-col gap-uniform-4">
    <header class="flex flex-col gap-uniform-6">
      <h2 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 text-charcoal">
        Event Details
      </h2>
      <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-4 text-charcoal/70">
        Tell us about your event so we can help you plan the perfect coverage.
      </p>
    </header>

    <div class="flex flex-col gap-uniform-4 mt-uniform-4">
      <!-- Event Date -->
      <div class="flex flex-col gap-uniform-5">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Event Date <span class="text-gold">*</span>
        </label>
        <ReservationCalendar
          :selected-date="eventDetails.eventDate"
          @select="handleDateSelect"
        />
        <div
          v-if="formattedSelectedDate"
          class="flex items-center gap-uniform-5 p-uniform-5 bg-gold/10 border border-gold/30"
        >
          <Icon name="solar:calendar-mark-linear" class="text-icon-size-5 text-gold" />
          <span class="font-lato text-normal-4 text-charcoal">
            Selected: {{ formattedSelectedDate }}
          </span>
        </div>
        <span v-if="errors.eventDate" class="font-lato text-normal-5 text-red-500">
          {{ errors.eventDate }}
        </span>
      </div>

      <!-- Location -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Venue / Location <span class="text-gold">*</span>
        </label>
        <input
          type="text"
          :value="eventDetails.location"
          placeholder="e.g., Grand Ballroom Hotel XYZ, Jl. Sudirman 123"
          class="w-full px-uniform-5 py-uniform-5 border border-charcoal/30 bg-transparent font-lato text-normal-4 text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none transition-colors"
          @input="handleLocationChange"
        />
        <span v-if="errors.location" class="font-lato text-normal-5 text-red-500">
          {{ errors.location }}
        </span>
      </div>

      <!-- Region -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Region <span class="text-gold">*</span>
        </label>
        <select
          :value="eventDetails.region"
          class="w-full px-uniform-5 py-uniform-5 border border-charcoal/30 bg-transparent font-lato text-normal-4 text-charcoal focus:border-charcoal focus:outline-none transition-colors appearance-none cursor-pointer"
          @change="handleRegionChange"
        >
          <option value="" disabled class="text-charcoal/40">Select your region</option>
          <option
            v-for="region in coveredRegions"
            :key="region.id"
            :value="region.id"
            class="text-charcoal"
          >
            {{ region.name }}
          </option>
        </select>
        <span v-if="errors.region" class="font-lato text-normal-5 text-red-500">
          {{ errors.region }}
        </span>
      </div>

      <!-- Venue Type -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Venue Type <span class="text-gold">*</span>
        </label>
        <div class="flex flex-wrap gap-uniform-5">
          <button
            v-for="venue in venueTypes"
            :key="venue.value"
            :class="[
              'flex items-center gap-uniform-6 px-uniform-4 py-uniform-5 border transition-colors',
              eventDetails.venueType === venue.value
                ? 'border-gold bg-gold/10 text-charcoal'
                : 'border-charcoal/30 text-charcoal/70 hover:border-charcoal/60',
            ]"
            @click="handleVenueTypeChange(venue.value)"
          >
            <Icon :name="venue.icon" class="text-icon-size-5" />
            <span class="font-lato text-normal-4">{{ venue.label }}</span>
          </button>
        </div>
      </div>

      <!-- Guest Count -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Estimated Guest Count <span class="text-gold">*</span>
        </label>
        <div class="flex items-center gap-uniform-5">
          <button
            :disabled="eventDetails.guestCount <= 1"
            :class="[
              'w-10 h-10 flex items-center justify-center border transition-colors',
              eventDetails.guestCount <= 1
                ? 'border-charcoal/20 text-charcoal/30 cursor-not-allowed'
                : 'border-charcoal/30 text-charcoal hover:border-charcoal',
            ]"
            @click="decrementGuests"
          >
            <Icon name="solar:minus-circle-linear" class="text-icon-size-5" />
          </button>
          <input
            type="number"
            :value="eventDetails.guestCount"
            min="1"
            class="w-20 text-center px-uniform-5 py-uniform-5 border border-charcoal/30 bg-transparent font-lato text-normal-3 text-charcoal focus:border-charcoal focus:outline-none transition-colors"
            @input="handleGuestCountChange"
          />
          <button
            class="w-10 h-10 flex items-center justify-center border border-charcoal/30 text-charcoal hover:border-charcoal transition-colors"
            @click="incrementGuests"
          >
            <Icon name="solar:add-circle-linear" class="text-icon-size-5" />
          </button>
          <span class="font-lato text-normal-4 text-charcoal/60">guests</span>
        </div>
      </div>

      <!-- Duration -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Event Duration <span class="text-gold">*</span>
        </label>
        <div class="flex flex-wrap gap-uniform-5">
          <button
            v-for="duration in durationOptions"
            :key="duration"
            :class="[
              'px-uniform-4 py-uniform-5 border font-lato text-normal-4 transition-colors',
              eventDetails.eventDuration === duration
                ? 'border-gold bg-gold/10 text-charcoal'
                : 'border-charcoal/30 text-charcoal/70 hover:border-charcoal/60',
            ]"
            @click="handleDurationChange(duration)"
          >
            {{ duration }} hours
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
