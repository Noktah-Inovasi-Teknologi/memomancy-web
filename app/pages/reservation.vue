<script lang="ts" setup>
const {
  // Data
  packages,
  addOnsByCategory,
  categoryLabels,
  coveredRegions,
  stepTitles,

  // State
  currentStep,
  eventDetails,
  selectedPackage,
  selectedAddOns,
  customerInfo,
  isSubmitting,
  errors,

  // Computed prices
  basePrice,
  addOnsTotal,
  totalPrice,
  formattedTotal,

  // Validation
  canProceedToStep,
  isFormComplete,

  // Navigation
  goToStep,
  nextStep,
  prevStep,

  // Actions
  updateEventDetails,
  selectPackage,
  toggleAddOn,
  getAddOnDisplayPrice,
  updateCustomerInfo,
  submitReservation,
  resetReservation,

  // Helpers
  formatPrice,
} = useReservation();

const submitError = ref<string | null>(null);

const handleSubmit = async () => {
  submitError.value = null;
  const result = await submitReservation();

  if (result.success && result.whatsappUrl) {
    window.open(result.whatsappUrl, "_blank");
    resetReservation();
  } else if (result.error) {
    submitError.value = result.error;
  }
};

const handleCancel = () => {
  resetReservation();
};
</script>

<template>
  <div class="bg-offwhite min-h-screen">
    <AppHeader />

    <!-- Hero Section -->
    <div
      class="bg-charcoal pt-uniform-1 px-uniform-5 pb-uniform-5 sm:px-uniform-4 sm:pb-uniform-4 md:px-uniform-3 md:pb-uniform-3 lg:px-uniform-2 lg:pb-uniform-2"
    >
      <div class="xl:max-w-6xl xl:mx-auto pt-uniform-2">
        <h1
          class="font-playfair text-heading-2 sm:text-heading-1 md:text-heading-2 lg:text-heading-2 xl:text-heading-2 text-offwhite mb-uniform-5"
        >
          Make a Reservation
        </h1>
        <p
          class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-3 lg:text-normal-3 xl:text-normal-3 text-offwhite/80 max-w-2xl"
        >
          Book your perfect photography and videography session. Complete the steps below and we'll contact you via WhatsApp to confirm your reservation.
        </p>
      </div>
    </div>

    <!-- Step Indicator -->
    <div class="bg-offwhite border-b border-charcoal/20 sticky top-0 z-40">
      <div class="xl:max-w-6xl xl:mx-auto">
        <ReservationStepIndicator
          :current-step="currentStep"
          :can-proceed="canProceedToStep"
          @step-click="goToStep"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-offwhite">
      <section
        class="flex flex-col lg:flex-row p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
      >
        <!-- Step Content -->
        <div class="flex-1 min-w-0">
          <!-- Step 1: Event Details -->
          <ReservationEventDetails
            v-if="currentStep === 1"
            :event-details="eventDetails"
            :covered-regions="coveredRegions"
            :errors="errors"
            @update="updateEventDetails"
          />

          <!-- Step 2: Package Selection -->
          <ReservationPackageSelect
            v-else-if="currentStep === 2"
            :packages="packages"
            :selected-package="selectedPackage"
            @select="selectPackage"
          />

          <!-- Step 3: Add-ons -->
          <ReservationAddOnsSelect
            v-else-if="currentStep === 3"
            :add-ons-by-category="addOnsByCategory"
            :category-labels="categoryLabels"
            :selected-add-ons="selectedAddOns"
            :base-price="basePrice"
            :get-add-on-display-price="getAddOnDisplayPrice"
            @toggle="toggleAddOn"
          />

          <!-- Step 4: Customer Info -->
          <ReservationCustomerInfo
            v-else-if="currentStep === 4"
            :customer-info="customerInfo"
            :errors="errors"
            @update="updateCustomerInfo"
          />

          <!-- Step 5: Review -->
          <ReservationReview
            v-else-if="currentStep === 5 && selectedPackage"
            :event-details="eventDetails"
            :selected-package="selectedPackage"
            :selected-add-ons="selectedAddOns"
            :customer-info="customerInfo"
            :total-price="totalPrice"
            :add-ons-total="addOnsTotal"
            :is-submitting="isSubmitting"
            @submit="handleSubmit"
            @edit-step="goToStep"
          />

          <!-- Submit Error -->
          <div
            v-if="submitError"
            class="mt-uniform-4 p-uniform-5 bg-red-50 border border-red-200"
          >
            <div class="flex items-center gap-uniform-5">
              <Icon name="solar:danger-triangle-linear" class="text-icon-size-5 text-red-500" />
              <span class="font-lato text-normal-4 text-red-700">{{ submitError }}</span>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div
            class="flex justify-between mt-uniform-4 pt-uniform-4 border-t border-charcoal/20"
          >
            <div class="flex items-center gap-uniform-4">
              <button
                v-if="currentStep > 1"
                class="flex items-center gap-uniform-6 text-charcoal font-lato text-normal-4 sm:text-normal-3 hover:text-charcoal/70 transition-colors"
                @click="prevStep"
              >
                <Icon name="solar:arrow-left-linear" class="text-icon-size-5" />
                <span>Back</span>
              </button>
              <button
                class="flex items-center gap-uniform-6 text-charcoal/50 font-lato text-normal-4 sm:text-normal-3 hover:text-charcoal/70 transition-colors"
                @click="handleCancel"
              >
                <Icon name="solar:close-circle-linear" class="text-icon-size-5" />
                <span>Cancel</span>
              </button>
            </div>

            <button
              v-if="currentStep < 5"
              :disabled="!canProceedToStep[currentStep]"
              :class="[
                'flex items-center gap-uniform-6 font-lato text-normal-4 sm:text-normal-3 transition-colors',
                canProceedToStep[currentStep]
                  ? 'text-gold hover:text-gold/80'
                  : 'text-charcoal/30 cursor-not-allowed',
              ]"
              @click="nextStep"
            >
              <span>Continue</span>
              <Icon name="solar:arrow-right-linear" class="text-icon-size-5" />
            </button>
          </div>
        </div>

        <!-- Summary Sidebar (Desktop - Only on Step 5) -->
        <div v-if="currentStep === 5" class="lg:w-80 xl:w-96 hidden lg:block">
          <div class="lg:sticky lg:top-24">
            <ReservationSummary
              :selected-package="selectedPackage"
              :selected-add-ons="selectedAddOns"
              :total-price="totalPrice"
              :current-step="currentStep"
              @continue="nextStep"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Mobile Sticky Footer (Only on Step 5) -->
    <div
      v-if="currentStep === 5 && selectedPackage"
      class="lg:hidden fixed bottom-0 left-0 right-0 bg-offwhite border-t border-charcoal/20 p-uniform-5 sm:p-uniform-4 z-50"
    >
      <div class="flex items-center justify-between gap-uniform-4">
        <div class="flex flex-col">
          <span class="font-lato text-normal-5 text-charcoal/60">Total Estimate</span>
          <span class="font-playfair text-heading-4 sm:text-heading-3 text-charcoal">
            Rp {{ formattedTotal }}
          </span>
        </div>
        <button
          class="px-uniform-4 py-uniform-5 bg-gold text-offwhite font-lato text-normal-4 flex items-center gap-uniform-5"
          @click="handleSubmit"
        >
          <Icon name="solar:chat-round-call-linear" class="text-icon-size-5" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>

    <!-- Spacer for mobile sticky footer -->
    <div v-if="currentStep === 5 && selectedPackage" class="lg:hidden h-24" />

    <AppFooter />
  </div>
</template>
