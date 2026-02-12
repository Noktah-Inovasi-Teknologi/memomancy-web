<script lang="ts" setup>
import type { ReservationStepNumber } from "~/types";

interface Props {
  currentStep: ReservationStepNumber;
  canProceed: Record<ReservationStepNumber, boolean>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "step-click": [step: ReservationStepNumber];
}>();

const steps: { number: ReservationStepNumber; title: string; shortTitle: string }[] = [
  { number: 1, title: "Event Details", shortTitle: "Event" },
  { number: 2, title: "Select Package", shortTitle: "Package" },
  { number: 3, title: "Add-ons", shortTitle: "Add-ons" },
  { number: 4, title: "Your Information", shortTitle: "Info" },
  { number: 5, title: "Review & Confirm", shortTitle: "Review" },
];

const canNavigateToStep = (step: ReservationStepNumber) => {
  // Can always go back
  if (step < props.currentStep) return true;
  // Can go forward only if all previous steps are valid
  for (let s = 1; s < step; s++) {
    if (!props.canProceed[s as ReservationStepNumber]) return false;
  }
  return true;
};

const getStepStatus = (step: ReservationStepNumber) => {
  if (step < props.currentStep) return "completed";
  if (step === props.currentStep) return "current";
  return "pending";
};

const handleStepClick = (step: ReservationStepNumber) => {
  if (canNavigateToStep(step)) {
    emit("step-click", step);
  }
};
</script>

<template>
  <!-- Desktop view -->
  <div class="hidden md:flex items-center justify-between py-uniform-5 px-uniform-4 lg:px-uniform-3 xl:px-uniform-2">
    <template v-for="(step, index) in steps" :key="step.number">
      <button
        :disabled="!canNavigateToStep(step.number)"
        :class="[
          'flex items-center gap-uniform-6 transition-colors',
          canNavigateToStep(step.number) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
        ]"
        @click="handleStepClick(step.number)"
      >
        <div
          :class="[
            'w-8 h-8 flex items-center justify-center font-lato text-normal-4 transition-colors',
            getStepStatus(step.number) === 'completed'
              ? 'bg-gold text-offwhite'
              : getStepStatus(step.number) === 'current'
                ? 'border-2 border-charcoal text-charcoal'
                : 'border border-charcoal/30 text-charcoal/50',
          ]"
        >
          <Icon
            v-if="getStepStatus(step.number) === 'completed'"
            name="solar:check-read-linear"
            class="text-[14px]"
          />
          <span v-else>{{ step.number }}</span>
        </div>
        <span
          :class="[
            'font-lato text-normal-4 lg:text-normal-4 xl:text-normal-4 whitespace-nowrap',
            getStepStatus(step.number) === 'current'
              ? 'text-charcoal font-medium'
              : getStepStatus(step.number) === 'completed'
                ? 'text-charcoal'
                : 'text-charcoal/50',
          ]"
        >
          {{ step.title }}
        </span>
      </button>

      <!-- Connector line -->
      <div
        v-if="index < steps.length - 1"
        :class="[
          'flex-1 h-px mx-uniform-5',
          step.number < currentStep ? 'bg-gold' : 'bg-charcoal/20',
        ]"
      />
    </template>
  </div>

  <!-- Mobile view -->
  <div class="md:hidden flex items-center justify-between py-uniform-5 px-uniform-5 sm:px-uniform-4">
    <!-- Current step info -->
    <div class="flex items-center gap-uniform-5">
      <div class="w-8 h-8 flex items-center justify-center border-2 border-charcoal text-charcoal font-lato text-normal-4">
        {{ currentStep }}
      </div>
      <div class="flex flex-col">
        <span class="font-lato text-normal-5 text-charcoal/60">
          Step {{ currentStep }} of 5
        </span>
        <span class="font-lato text-normal-3 text-charcoal font-medium">
          {{ steps[currentStep - 1].title }}
        </span>
      </div>
    </div>

    <!-- Step dots -->
    <div class="flex items-center gap-uniform-6">
      <button
        v-for="step in steps"
        :key="step.number"
        :disabled="!canNavigateToStep(step.number)"
        :class="[
          'w-2.5 h-2.5 sm:w-3 sm:h-3 transition-colors',
          getStepStatus(step.number) === 'completed'
            ? 'bg-gold'
            : getStepStatus(step.number) === 'current'
              ? 'bg-charcoal'
              : 'bg-charcoal/20',
          canNavigateToStep(step.number) ? 'cursor-pointer' : 'cursor-not-allowed',
        ]"
        @click="handleStepClick(step.number)"
      />
    </div>
  </div>
</template>
