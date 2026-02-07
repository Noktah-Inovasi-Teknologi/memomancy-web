<script lang="ts" setup>
const {
  packages,
  addOnsByCategory,
  categoryLabels,
  selectedPackage,
  selectedAddOns,
  total,
  formattedTotal,
  whatsAppUrl,
  selectPackage,
  toggleAddOn,
  isPackageSelected,
  isAddOnSelected,
  hasSelection,
  getAddOnDisplayPrice,
} = usePricingCalculator();

useParallax();
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
          class="font-playfair text-heading-2 sm:text-heading-1 md:text-heading-1 lg:text-heading-2 xl:text-heading-2 text-offwhite mb-uniform-5"
        >
          Pricing Calculator
        </h1>
        <p
          class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-offwhite/80 max-w-2xl"
        >
          Customize your perfect package. Select a base package and add extras
          to match your vision.
        </p>
      </div>
    </div>

    <!-- Packages Section -->
    <div class="bg-offwhite">
      <section
        class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
        data-parallax
      >
        <header
          class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase"
        >
          ■ Select Your Package
        </header>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-uniform-5 sm:gap-uniform-4 md:gap-uniform-4 lg:gap-uniform-4 xl:gap-uniform-4"
        >
          <CalculatorPackageCard
            v-for="pkg in packages"
            :key="pkg.id"
            :package="pkg"
            :is-selected="isPackageSelected(pkg)"
            @select="selectPackage"
          />
        </div>

      </section>
    </div>

    <!-- Add-ons Section -->
    <div class="bg-offwhite">
      <section
        class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
        data-parallax
      >
        <header
          class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase"
        >
          ■ Customize With Add-ons
        </header>

        <div class="flex flex-col lg:flex-row gap-uniform-4 lg:gap-uniform-3">
          <!-- Add-ons List -->
          <div class="flex-1">
            <div
              v-for="(addOns, category) in addOnsByCategory"
              :key="category"
              class="mb-uniform-4"
            >
              <h3
                class="font-playfair text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-5 xl:text-heading-5 text-charcoal/60 mb-uniform-5 uppercase tracking-wider"
              >
                {{ categoryLabels[category] }}
              </h3>

              <div class="flex flex-col">
                <CalculatorAddOnItem
                  v-for="addOn in addOns"
                  :key="addOn.id"
                  :add-on="addOn"
                  :is-selected="isAddOnSelected(addOn)"
                  :display-price="getAddOnDisplayPrice(addOn)"
                  @toggle="toggleAddOn"
                />
              </div>
            </div>
          </div>

          <!-- Summary (Sticky on Desktop) -->
          <div class="lg:w-95 xl:w-105">
            <div class="lg:sticky lg:top-24">
              <CalculatorSummary
                :selected-package="selectedPackage"
                :selected-add-ons="selectedAddOns"
                :total="total"
                :whats-app-url="whatsAppUrl"
                :get-add-on-display-price="getAddOnDisplayPrice"
              />
            </div>
          </div>
        </div>

      </section>
    </div>

    <!-- Note Section -->
    <div class="bg-offwhite">
      <section
        class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
        data-parallax
      >
        <header
          class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase"
        >
          ■ Important Notes
        </header>

        <div class="flex flex-col gap-uniform-5 md:max-w-2xl lg:max-w-3xl">
          <div class="flex items-start gap-uniform-5">
            <Icon
              name="solar:calendar-linear"
              class="text-icon-size-5 text-gold shrink-0 mt-1"
            />
            <p
              class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/80"
            >
              <strong class="text-charcoal">Book early</strong> to secure your
              date. Popular dates fill up quickly, especially during wedding
              season.
            </p>
          </div>

          <div class="flex items-start gap-uniform-5">
            <Icon
              name="solar:hand-shake-linear"
              class="text-icon-size-5 text-gold shrink-0 mt-1"
            />
            <p
              class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/80"
            >
              <strong class="text-charcoal">Custom packages available</strong>.
              Have specific needs? Let's create a package tailored just for you.
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Mobile Sticky CTA -->
    <div
      v-if="hasSelection"
      class="lg:hidden fixed bottom-0 left-0 right-0 bg-offwhite border-t border-charcoal/20 p-uniform-5 sm:p-uniform-4 z-50"
    >
      <div class="flex items-center justify-between gap-uniform-4">
        <div>
          <p
            class="font-lato text-normal-5 sm:text-normal-4 text-charcoal/60"
          >
            Estimated Total
          </p>
          <p class="font-playfair text-heading-4 sm:text-heading-3 text-charcoal">
            Rp {{ formattedTotal }}
          </p>
        </div>
        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-uniform-6 bg-gold text-offwhite font-lato text-normal-4 sm:text-normal-3 px-uniform-4 py-uniform-5 sm:py-uniform-4"
        >
          <Icon name="solar:chat-round-dots-linear" class="text-icon-size-6" />
          Chat Now
        </a>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
