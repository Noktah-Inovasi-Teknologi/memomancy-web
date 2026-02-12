import type {
  ReservationStepNumber,
  ReservationEventDetails,
  ReservationCustomerInfo,
  ReservationAddOn,
  ReservationPayload,
  PricingPackage,
  PricingAddOn,
} from "~/types";
import { packages, addOns, formatPrice, categoryLabels } from "~/data/pricingData";
import { getCoveredRegions } from "~/data/eastJavaRegions";

export const useReservation = () => {
  // ==================== STATE ====================

  const currentStep = ref<ReservationStepNumber>(1);

  const eventDetails = ref<ReservationEventDetails>({
    eventDate: null,
    eventType: "",
    location: "",
    region: "",
    venueType: "indoor",
    guestCount: 1,
    eventDuration: 2,
  });

  const selectedPackage = ref<PricingPackage | null>(null);
  const selectedAddOns = ref<ReservationAddOn[]>([]);

  const customerInfo = ref<ReservationCustomerInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const isSubmitting = ref(false);
  const errors = ref<Record<string, string>>({});

  // ==================== DATA ====================

  const coveredRegions = computed(() => getCoveredRegions());

  const stepTitles: Record<ReservationStepNumber, string> = {
    1: "Event Details",
    2: "Select Package",
    3: "Add-ons",
    4: "Your Information",
    5: "Review & Confirm",
  };

  // ==================== COMPUTED PRICES ====================

  const basePrice = computed(() => selectedPackage.value?.discountedPrice ?? 0);

  const flatAddOnsTotal = computed(() =>
    selectedAddOns.value
      .filter((addOn) => !addOn.isPercentage)
      .reduce((sum, addOn) => sum + addOn.calculatedPrice, 0)
  );

  const percentageAddOnsTotal = computed(() =>
    selectedAddOns.value
      .filter((addOn) => addOn.isPercentage)
      .reduce((sum, addOn) => sum + addOn.calculatedPrice, 0)
  );

  const addOnsTotal = computed(() => flatAddOnsTotal.value + percentageAddOnsTotal.value);

  const totalPrice = computed(() => basePrice.value + addOnsTotal.value);

  const formattedTotal = computed(() => formatPrice(totalPrice.value));
  const formattedBasePrice = computed(() => formatPrice(basePrice.value));
  const formattedAddOnsTotal = computed(() => formatPrice(addOnsTotal.value));

  // ==================== VALIDATION ====================

  const isStep1Valid = computed(() => {
    const d = eventDetails.value;
    return !!(
      d.eventDate &&
      d.location.trim() &&
      d.region &&
      d.guestCount > 0 &&
      d.eventDuration > 0
    );
  });

  const isStep2Valid = computed(() => selectedPackage.value !== null);

  const isStep3Valid = computed(() => true); // Add-ons are optional

  const isStep4Valid = computed(() => {
    const c = customerInfo.value;
    return !!(
      c.name.trim() &&
      c.email.trim() &&
      c.phone.trim() &&
      isValidEmail(c.email) &&
      isValidPhone(c.phone)
    );
  });

  const isStep5Valid = computed(() => true);

  const canProceedToStep = computed(() => ({
    1: isStep1Valid.value,
    2: isStep2Valid.value,
    3: isStep3Valid.value,
    4: isStep4Valid.value,
    5: isStep5Valid.value,
  }));

  const isFormComplete = computed(
    () => isStep1Valid.value && isStep2Valid.value && isStep4Valid.value
  );

  // ==================== NAVIGATION ====================

  const goToStep = (step: ReservationStepNumber) => {
    // Can go back to any previous step
    if (step < currentStep.value) {
      currentStep.value = step;
      return;
    }

    // Can only go forward if all previous steps are valid
    for (let s = 1; s < step; s++) {
      if (!canProceedToStep.value[s as ReservationStepNumber]) {
        return;
      }
    }
    currentStep.value = step;
  };

  const nextStep = () => {
    if (currentStep.value < 5 && canProceedToStep.value[currentStep.value]) {
      currentStep.value = (currentStep.value + 1) as ReservationStepNumber;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as ReservationStepNumber;
    }
  };

  // ==================== STEP 1: EVENT DETAILS ====================

  const updateEventDetails = (updates: Partial<ReservationEventDetails>) => {
    eventDetails.value = { ...eventDetails.value, ...updates };
    errors.value = {};
  };

  // ==================== STEP 2: PACKAGE SELECTION ====================

  const selectPackage = (pkg: PricingPackage) => {
    if (selectedPackage.value?.id === pkg.id) {
      selectedPackage.value = null;
    } else {
      selectedPackage.value = pkg;
      // Auto-set event type based on package
      eventDetails.value.eventType = pkg.id;
    }
    // Recalculate percentage add-ons when package changes
    recalculatePercentageAddOns();
  };

  const isPackageSelected = (pkg: PricingPackage) => {
    return selectedPackage.value?.id === pkg.id;
  };

  // ==================== STEP 3: ADD-ONS ====================

  const getAddOnDisplayPrice = (addOn: PricingAddOn): number => {
    if (!addOn.isPercentage) return addOn.price;
    const baseForPercentage = basePrice.value + flatAddOnsTotal.value;
    return Math.round(baseForPercentage * (addOn.price / 100));
  };

  const toggleAddOn = (addOn: PricingAddOn) => {
    const index = selectedAddOns.value.findIndex((a) => a.id === addOn.id);

    if (index === -1) {
      // Calculate actual price
      let calculatedPrice = addOn.price;
      if (addOn.isPercentage) {
        const baseForCalc =
          basePrice.value +
          selectedAddOns.value
            .filter((a) => !a.isPercentage)
            .reduce((sum, a) => sum + a.calculatedPrice, 0);
        calculatedPrice = Math.round(baseForCalc * (addOn.price / 100));
      }

      selectedAddOns.value.push({
        id: addOn.id,
        name: addOn.name,
        price: addOn.price,
        isPercentage: addOn.isPercentage ?? false,
        calculatedPrice,
      });
    } else {
      selectedAddOns.value.splice(index, 1);
    }

    // Recalculate percentage-based add-ons
    recalculatePercentageAddOns();
  };

  const recalculatePercentageAddOns = () => {
    const flatTotal = selectedAddOns.value
      .filter((a) => !a.isPercentage)
      .reduce((sum, a) => sum + a.calculatedPrice, 0);

    const baseForPercentage = basePrice.value + flatTotal;

    selectedAddOns.value.forEach((addOn) => {
      if (addOn.isPercentage) {
        addOn.calculatedPrice = Math.round(baseForPercentage * (addOn.price / 100));
      }
    });
  };

  const isAddOnSelected = (addOn: PricingAddOn) => {
    return selectedAddOns.value.some((a) => a.id === addOn.id);
  };

  // Group add-ons by category
  const addOnsByCategory = computed(() => {
    const grouped: Record<string, PricingAddOn[]> = {
      gear: [],
      crew: [],
      time_bound: [],
      scale_complexity: [],
    };

    addOns.forEach((addOn) => {
      const category = addOn.category;
      if (grouped[category]) {
        grouped[category].push(addOn);
      }
    });

    return Object.fromEntries(
      Object.entries(grouped).filter(([, items]) => items.length > 0)
    );
  });

  // ==================== STEP 4: CUSTOMER INFO ====================

  const updateCustomerInfo = (updates: Partial<ReservationCustomerInfo>) => {
    customerInfo.value = { ...customerInfo.value, ...updates };
    errors.value = {};
  };

  // ==================== STEP 5: SUBMIT ====================

  const submitReservation = async (): Promise<{
    success: boolean;
    whatsappUrl?: string;
    error?: string;
  }> => {
    if (!isFormComplete.value || !selectedPackage.value || !eventDetails.value.eventDate) {
      return { success: false, error: "Please complete all required fields" };
    }

    isSubmitting.value = true;
    errors.value = {};

    try {
      const payload: ReservationPayload = {
        eventDate: eventDetails.value.eventDate.toISOString(),
        eventType: eventDetails.value.eventType || selectedPackage.value.id,
        location: eventDetails.value.location,
        region: eventDetails.value.region,
        venueType: eventDetails.value.venueType,
        guestCount: eventDetails.value.guestCount,
        eventDuration: eventDetails.value.eventDuration,
        packageId: selectedPackage.value.id,
        packageName: selectedPackage.value.name,
        packagePrice: selectedPackage.value.discountedPrice,
        addOns: selectedAddOns.value,
        addOnsTotal: addOnsTotal.value,
        totalPrice: totalPrice.value,
        customerName: customerInfo.value.name,
        customerEmail: customerInfo.value.email,
        customerPhone: customerInfo.value.phone,
        customerNotes: customerInfo.value.notes,
      };

      const response = await $fetch<{ success: boolean; whatsappUrl: string }>(
        "/api/reservations",
        {
          method: "POST",
          body: payload,
        }
      );

      return { success: true, whatsappUrl: response.whatsappUrl };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit reservation";
      return { success: false, error: message };
    } finally {
      isSubmitting.value = false;
    }
  };

  // ==================== RESET ====================

  const resetReservation = () => {
    currentStep.value = 1;
    eventDetails.value = {
      eventDate: null,
      eventType: "",
      location: "",
      region: "",
      venueType: "indoor",
      guestCount: 1,
      eventDuration: 2,
    };
    selectedPackage.value = null;
    selectedAddOns.value = [];
    customerInfo.value = { name: "", email: "", phone: "", notes: "" };
    errors.value = {};
    isSubmitting.value = false;
  };

  // ==================== HELPERS ====================

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-()]/g, "");
    return /^(\+62|62|0)[0-9]{9,12}$/.test(cleaned);
  };

  const hasSelection = computed(() => selectedPackage.value !== null);

  // ==================== RETURN ====================

  return {
    // Data
    packages,
    addOns,
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
    formattedBasePrice,
    formattedAddOnsTotal,

    // Validation
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    isStep4Valid,
    isStep5Valid,
    canProceedToStep,
    isFormComplete,

    // Navigation
    goToStep,
    nextStep,
    prevStep,

    // Step 1 actions
    updateEventDetails,

    // Step 2 actions
    selectPackage,
    isPackageSelected,

    // Step 3 actions
    toggleAddOn,
    isAddOnSelected,
    getAddOnDisplayPrice,

    // Step 4 actions
    updateCustomerInfo,

    // Step 5 actions
    submitReservation,

    // General
    resetReservation,
    hasSelection,
    formatPrice,
    isValidEmail,
    isValidPhone,
  };
};
