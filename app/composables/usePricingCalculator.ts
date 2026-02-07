import type { PricingPackage, PricingAddOn } from "~/types";
import { packages, addOns, formatPrice, categoryLabels } from "~/data/pricingData";
import { whatsappLink } from "~/data/commonInformations";

export const usePricingCalculator = () => {
  const selectedPackage = ref<PricingPackage | null>(null);
  const selectedAddOns = ref<PricingAddOn[]>([]);

  // Base price from selected package (using discounted price)
  const basePrice = computed(() => selectedPackage.value?.discountedPrice ?? 0);

  // Calculate flat add-ons total
  const flatAddOnsTotal = computed(() =>
    selectedAddOns.value
      .filter((addOn) => !addOn.isPercentage)
      .reduce((sum, addOn) => sum + addOn.price, 0)
  );

  // Calculate percentage-based add-ons total
  const percentageAddOnsTotal = computed(() => {
    const baseForPercentage = basePrice.value + flatAddOnsTotal.value;
    return selectedAddOns.value
      .filter((addOn) => addOn.isPercentage)
      .reduce((sum, addOn) => sum + Math.round(baseForPercentage * (addOn.price / 100)), 0);
  });

  // Total add-ons
  const addOnsTotal = computed(() => flatAddOnsTotal.value + percentageAddOnsTotal.value);

  // Grand total
  const total = computed(() => basePrice.value + addOnsTotal.value);

  const formattedTotal = computed(() => formatPrice(total.value));
  const formattedBasePrice = computed(() => formatPrice(basePrice.value));
  const formattedAddOnsTotal = computed(() => formatPrice(addOnsTotal.value));

  // Calculate display price for a percentage add-on
  const getAddOnDisplayPrice = (addOn: PricingAddOn): number => {
    if (!addOn.isPercentage) return addOn.price;
    const baseForPercentage = basePrice.value + flatAddOnsTotal.value;
    return Math.round(baseForPercentage * (addOn.price / 100));
  };

  const selectPackage = (pkg: PricingPackage) => {
    // Toggle: unselect if same package is clicked
    if (selectedPackage.value?.id === pkg.id) {
      selectedPackage.value = null;
    } else {
      selectedPackage.value = pkg;
    }
  };

  const isPackageSelected = (pkg: PricingPackage) => {
    return selectedPackage.value?.id === pkg.id;
  };

  const toggleAddOn = (addOn: PricingAddOn) => {
    const index = selectedAddOns.value.findIndex((a) => a.id === addOn.id);
    if (index === -1) {
      selectedAddOns.value.push(addOn);
    } else {
      selectedAddOns.value.splice(index, 1);
    }
  };

  const isAddOnSelected = (addOn: PricingAddOn) => {
    return selectedAddOns.value.some((a) => a.id === addOn.id);
  };

  const clearSelection = () => {
    selectedPackage.value = null;
    selectedAddOns.value = [];
  };

  const generateWhatsAppMessage = () => {
    if (!selectedPackage.value) return "";

    let message = `Halo Memomancy! 👋\n\n`;
    message += `Saya tertarik dengan:\n`;
    message += `📦 Paket: ${selectedPackage.value.name} (Rp ${formatPrice(selectedPackage.value.discountedPrice)})\n`;

    if (selectedAddOns.value.length > 0) {
      message += `\nAdd-ons:\n`;
      selectedAddOns.value.forEach((addOn) => {
        const displayPrice = getAddOnDisplayPrice(addOn);
        const priceLabel = addOn.isPercentage
          ? `+${addOn.price}% (Rp ${formatPrice(displayPrice)})`
          : `Rp ${formatPrice(addOn.price)}`;
        message += `➕ ${addOn.name} (${priceLabel})\n`;
      });
    }

    message += `\n💰 Estimasi Total: Rp ${formattedTotal.value}\n\n`;
    message += `Mohon informasi lebih lanjut. Terima kasih!`;

    return message;
  };

  const whatsAppUrl = computed(() => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    return `${whatsappLink}?text=${message}`;
  });

  const hasSelection = computed(() => selectedPackage.value !== null);

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

    // Filter out empty categories
    return Object.fromEntries(
      Object.entries(grouped).filter(([, items]) => items.length > 0)
    );
  });

  return {
    // Data
    packages,
    addOns,
    addOnsByCategory,
    categoryLabels,

    // State
    selectedPackage,
    selectedAddOns,

    // Computed prices
    basePrice,
    addOnsTotal,
    total,
    formattedTotal,
    formattedBasePrice,
    formattedAddOnsTotal,

    // Actions
    selectPackage,
    toggleAddOn,
    clearSelection,

    // Helpers
    isPackageSelected,
    isAddOnSelected,
    hasSelection,
    whatsAppUrl,
    formatPrice,
    getAddOnDisplayPrice,
  };
};
