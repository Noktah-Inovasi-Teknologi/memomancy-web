<script lang="ts" setup>
import type { PricingAddOn } from "~/types";
import { formatPrice } from "~/data/pricingData";

interface Props {
  addOn: PricingAddOn;
  isSelected: boolean;
  displayPrice?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggle: [addOn: PricingAddOn];
}>();

const formattedPrice = computed(() => {
  if (props.addOn.isPercentage) {
    return `${props.addOn.price}%`;
  }
  return `Rp ${formatPrice(props.addOn.price)}`;
});

const calculatedPrice = computed(() => {
  if (props.addOn.isPercentage && props.displayPrice !== undefined) {
    return `Rp ${formatPrice(props.displayPrice)}`;
  }
  return null;
});
</script>

<template>
  <button
    :class="[
      'flex items-center justify-between w-full text-left py-uniform-5 sm:py-uniform-4 md:py-uniform-4 lg:py-uniform-5 xl:py-uniform-5 border-b border-charcoal/20 transition-colors',
      isSelected ? 'bg-gold/5' : 'hover:bg-charcoal/5',
    ]"
    @click="emit('toggle', props.addOn)"
  >
    <div class="flex items-center gap-uniform-5">
      <div
        :class="[
          'w-5 h-5 sm:w-6 sm:h-6 border flex items-center justify-center shrink-0',
          isSelected ? 'border-gold bg-gold' : 'border-charcoal/50',
        ]"
      >
        <Icon
          v-if="isSelected"
          name="solar:check-read-linear"
          class="text-offwhite text-[12px] sm:text-[14px]"
        />
      </div>

      <div class="flex flex-col">
        <span
          class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-charcoal"
        >
          {{ props.addOn.name }}
        </span>
        <span
          class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/60"
        >
          {{ props.addOn.description }}
        </span>
      </div>
    </div>

    <div class="flex flex-col items-end shrink-0 ml-uniform-4">
      <span
        class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-charcoal"
      >
        +{{ formattedPrice }}
      </span>
      <span
        v-if="calculatedPrice && isSelected"
        class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/60"
      >
        {{ calculatedPrice }}
      </span>
      <span
        v-else-if="props.addOn.unit"
        class="font-lato text-normal-5 sm:text-normal-4 md:text-normal-4 lg:text-normal-5 xl:text-normal-5 text-charcoal/60"
      >
        {{ props.addOn.unit }}
      </span>
    </div>
  </button>
</template>
