<script lang="ts" setup>
interface Props {
  selectedDate: Date | null;
  minAdvanceDays?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minAdvanceDays: 2,
});

const emit = defineEmits<{
  select: [date: Date];
  "month-change": [month: number, year: number];
}>();

const currentDate = new Date();
const viewMonth = ref(currentDate.getMonth());
const viewYear = ref(currentDate.getFullYear());

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const calendarDays = computed(() => {
  const days: { date: Date | null; isCurrentMonth: boolean }[] = [];
  const daysInMonth = getDaysInMonth(viewMonth.value, viewYear.value);
  const firstDay = getFirstDayOfMonth(viewMonth.value, viewYear.value);

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, isCurrentMonth: false });
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: new Date(viewYear.value, viewMonth.value, day),
      isCurrentMonth: true,
    });
  }

  return days;
});

const minSelectableDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + props.minAdvanceDays);
  date.setHours(0, 0, 0, 0);
  return date;
});

const isDateDisabled = (date: Date) => {
  return date < minSelectableDate.value;
};

const isDateSelected = (date: Date) => {
  if (!props.selectedDate) return false;
  return (
    date.getDate() === props.selectedDate.getDate() &&
    date.getMonth() === props.selectedDate.getMonth() &&
    date.getFullYear() === props.selectedDate.getFullYear()
  );
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const prevMonth = () => {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value--;
  } else {
    viewMonth.value--;
  }
  emit("month-change", viewMonth.value + 1, viewYear.value);
};

const nextMonth = () => {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value++;
  } else {
    viewMonth.value++;
  }
  emit("month-change", viewMonth.value + 1, viewYear.value);
};

const canGoPrev = computed(() => {
  const today = new Date();
  return viewYear.value > today.getFullYear() ||
    (viewYear.value === today.getFullYear() && viewMonth.value > today.getMonth());
});

const handleDateClick = (date: Date) => {
  if (isDateDisabled(date)) return;
  emit("select", date);
};

const getDateClasses = (date: Date) => {
  const disabled = isDateDisabled(date);
  const selected = isDateSelected(date);
  const today = isToday(date);

  if (disabled) {
    return "text-charcoal/30 cursor-not-allowed";
  }

  if (selected) {
    return "bg-gold text-offwhite font-medium";
  }

  if (today) {
    return "border border-charcoal text-charcoal hover:bg-charcoal/10 cursor-pointer";
  }

  return "text-charcoal hover:bg-charcoal/10 cursor-pointer";
};
</script>

<template>
  <div class="flex flex-col gap-uniform-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <button
        :disabled="!canGoPrev"
        :class="[
          'p-uniform-6 transition-colors',
          canGoPrev ? 'text-charcoal hover:bg-charcoal/10' : 'text-charcoal/30 cursor-not-allowed',
        ]"
        @click="prevMonth"
      >
        <Icon name="solar:arrow-left-linear" class="text-icon-size-5" />
      </button>

      <span class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-4 text-charcoal">
        {{ monthNames[viewMonth] }} {{ viewYear }}
      </span>

      <button
        class="p-uniform-6 text-charcoal hover:bg-charcoal/10 transition-colors"
        @click="nextMonth"
      >
        <Icon name="solar:arrow-right-linear" class="text-icon-size-5" />
      </button>
    </div>

    <!-- Days of week header -->
    <div class="grid grid-cols-7 gap-uniform-7">
      <div
        v-for="day in daysOfWeek"
        :key="day"
        class="text-center font-lato text-normal-5 sm:text-normal-4 text-charcoal/60 py-uniform-6"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-uniform-7">
      <div v-for="(dayInfo, index) in calendarDays" :key="index" class="aspect-square">
        <button
          v-if="dayInfo.date"
          :disabled="isDateDisabled(dayInfo.date)"
          :class="[
            'w-full h-full flex items-center justify-center font-lato text-normal-4 sm:text-normal-3 transition-colors',
            getDateClasses(dayInfo.date),
          ]"
          @click="handleDateClick(dayInfo.date)"
        >
          {{ dayInfo.date.getDate() }}
        </button>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap items-center gap-uniform-4 pt-uniform-5 border-t border-charcoal/20">
      <div class="flex items-center gap-uniform-6">
        <div class="w-4 h-4 bg-gold" />
        <span class="font-lato text-normal-5 text-charcoal/60">Selected</span>
      </div>
      <div class="flex items-center gap-uniform-6">
        <div class="w-4 h-4 border border-charcoal" />
        <span class="font-lato text-normal-5 text-charcoal/60">Today</span>
      </div>
    </div>
  </div>
</template>
