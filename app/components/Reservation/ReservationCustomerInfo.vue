<script lang="ts" setup>
import type { ReservationCustomerInfo } from "~/types";

interface Props {
  customerInfo: ReservationCustomerInfo;
  errors: Record<string, string>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  update: [updates: Partial<ReservationCustomerInfo>];
}>();

const handleNameChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update", { name: target.value });
};

const handleEmailChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update", { email: target.value });
};

const handlePhoneChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update", { phone: target.value });
};

const handleNotesChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit("update", { notes: target.value });
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPhone = (phone: string) => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+62|62|0)[0-9]{9,12}$/.test(cleaned);
};

const emailError = computed(() => {
  if (!props.customerInfo.email) return null;
  return isValidEmail(props.customerInfo.email) ? null : "Please enter a valid email address";
});

const phoneError = computed(() => {
  if (!props.customerInfo.phone) return null;
  return isValidPhone(props.customerInfo.phone) ? null : "Please enter a valid Indonesian phone number";
});
</script>

<template>
  <div class="flex flex-col gap-uniform-4">
    <header class="flex flex-col gap-uniform-6">
      <h2 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 text-charcoal">
        Your Information
      </h2>
      <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-4 text-charcoal/70">
        We'll use this information to contact you about your reservation.
      </p>
    </header>

    <div class="flex flex-col gap-uniform-4 mt-uniform-4">
      <!-- Full Name -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Full Name <span class="text-gold">*</span>
        </label>
        <input
          type="text"
          :value="customerInfo.name"
          placeholder="Your full name"
          class="w-full px-uniform-5 py-uniform-5 border border-charcoal/30 bg-transparent font-lato text-normal-4 text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none transition-colors"
          @input="handleNameChange"
        />
        <span v-if="errors.name" class="font-lato text-normal-5 text-red-500">
          {{ errors.name }}
        </span>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Email Address <span class="text-gold">*</span>
        </label>
        <input
          type="email"
          :value="customerInfo.email"
          placeholder="your.email@example.com"
          :class="[
            'w-full px-uniform-5 py-uniform-5 border bg-transparent font-lato text-normal-4 text-charcoal placeholder:text-charcoal/40 focus:outline-none transition-colors',
            emailError ? 'border-red-400 focus:border-red-500' : 'border-charcoal/30 focus:border-charcoal',
          ]"
          @input="handleEmailChange"
        />
        <span v-if="emailError" class="font-lato text-normal-5 text-red-500">
          {{ emailError }}
        </span>
        <span v-else-if="errors.email" class="font-lato text-normal-5 text-red-500">
          {{ errors.email }}
        </span>
      </div>

      <!-- Phone -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Phone Number <span class="text-gold">*</span>
        </label>
        <input
          type="tel"
          :value="customerInfo.phone"
          placeholder="+62 812 3456 7890"
          :class="[
            'w-full px-uniform-5 py-uniform-5 border bg-transparent font-lato text-normal-4 text-charcoal placeholder:text-charcoal/40 focus:outline-none transition-colors',
            phoneError ? 'border-red-400 focus:border-red-500' : 'border-charcoal/30 focus:border-charcoal',
          ]"
          @input="handlePhoneChange"
        />
        <span class="font-lato text-normal-5 text-charcoal/50">
          We'll contact you via WhatsApp on this number
        </span>
        <span v-if="phoneError" class="font-lato text-normal-5 text-red-500">
          {{ phoneError }}
        </span>
        <span v-else-if="errors.phone" class="font-lato text-normal-5 text-red-500">
          {{ errors.phone }}
        </span>
      </div>

      <!-- Notes -->
      <div class="flex flex-col gap-uniform-6">
        <label class="font-lato text-normal-4 sm:text-normal-3 text-charcoal font-medium">
          Additional Notes <span class="text-charcoal/50">(Optional)</span>
        </label>
        <textarea
          :value="customerInfo.notes"
          placeholder="Any special requests or information we should know about your event..."
          rows="4"
          class="w-full px-uniform-5 py-uniform-5 border border-charcoal/30 bg-transparent font-lato text-normal-4 text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none transition-colors resize-none"
          @input="handleNotesChange"
        />
      </div>
    </div>
  </div>
</template>
