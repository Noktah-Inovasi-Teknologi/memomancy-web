<script lang="ts" setup>
const whyChooseItems = [
  {
    title: "You don't need to explain anything",
    problem: "With most photographers, you have to brief, remind, and hope they \"get it.\"",
    solution: "With Memomancy, you choose a package and we handle it. No direction needed.",
  },
  {
    title: "You know what you'll get",
    problem: "Many services depend on who shows up. Results can vary.",
    solution: "Memomancy follows a fixed system, so the output and delivery are predictable every time.",
  },
  {
    title: "It's fast and straightforward",
    problem: "Booking is quick. Packages are clear. Delivery time is fixed.",
    solution: "No back-and-forth. No waiting weeks without updates.",
  },
  {
    title: "It's for people who just want it done properly",
    problem: "Memomancy isn't for creative experiments or personal styles.",
    solution: "It's for documenting important moments safely, so you don't regret not having them.",
  },
];
const services = [
  {
    title: "Photography",
    description: "Professional shots with color grading included. Every moment captured, ready to share.",
    icon: "solar:camera-linear",
  },
  {
    title: "Videography",
    description: "From same-day highlights to cinematic films. Your story, moving.",
    icon: "solar:clapperboard-open-play-linear",
  },
  {
    title: "Edit",
    description: "Professional post-production. Color grading, sound design, and polished delivery.",
    icon: "solar:slider-horizontal-linear",
  },
];

const { getVideoUrl } = useMedia();

const galleryItems = [
  { type: "video", src: getVideoUrl("Tia.mp4"), label: "Tourism Coverage" },
  { type: "video", src: getVideoUrl("Rizvi.mp4"), label: "Sport & Adventure" },
  { type: "video", src: getVideoUrl("Tia.mp4"), label: "Family Moments" },
];

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % galleryItems.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + galleryItems.length) % galleryItems.length;
};

const faqItems = [
  {
    label: "What's included in each package?",
    content: "Every package includes a dedicated photographer or videographer, professional editing with color grading, and digital delivery. Specific inclusions vary by package type, from raw files to same-day highlights or cinematic edits."
  },
  {
    label: "How long until I receive my photos and videos?",
    content: "Standard delivery is 3 to 7 days depending on your package. Same-day highlights are available for events, and rush delivery can be arranged for an additional fee."
  },
  {
    label: "Do you cover events outside Yogyakarta?",
    content: "Yes, we travel. For locations outside our standard coverage area, a transport fee applies. Contact us to know the exact cost for your location."
  },
  {
    label: "What if I need to reschedule?",
    content: "Life happens. Reschedule up to 7 days before your event at no charge. Within 7 days, we'll work with you to find a new date, subject to availability and a small rebooking fee."
  }
];

const heroLoaded = ref(false);
</script>

<template>
  <AppHeader />

  <div class="bg-offwhite px-uniform-5 pb-uniform-5 pt-uniform-3 sm:px-uniform-4 sm:pb-uniform-4 sm:pt-uniform-2 md:px-uniform-3 md:pb-uniform-3 md:pt-uniform-2 lg:px-uniform-2 lg:pb-uniform-2 lg:pt-uniform-1" id="hero">
    <div class="aspect-9/16 md:aspect-video overflow-hidden relative xl:max-w-6xl xl:mx-auto">
      <USkeleton v-if="!heroLoaded" class="absolute inset-0 w-full h-full rounded-none" />
      <video
        :src="getVideoUrl('Tia.mp4')"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @loadeddata="heroLoaded = true"
      />
    </div>
  </div>

  <div class="bg-offwhite">
    <section class="flex flex-col gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 xl:max-w-6xl xl:mx-auto" id="hero-cta">
      <div class="flex flex-col gap-uniform-5 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3 text-charcoal md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
        <h1 class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-2 lg:text-heading-2 xl:text-heading-2">Get your moments documented. Without thinking about it.</h1>
        <p class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-2 xl:text-normal-2">
          Choose a package. Show up. We handle the rest.<br />
          Clean photos and videos, delivered fast and on time.
        </p>
      </div>
      <NuxtLink
        to="/reservation"
        class="group flex items-center gap-uniform-5 sm:gap-uniform-4 md:gap-uniform-4 self-center md:self-start border border-gold px-uniform-4 sm:px-uniform-3 md:px-uniform-3 py-uniform-5 sm:py-uniform-4 md:py-uniform-4 transition-colors hover:bg-gold/10"
      >
        <span class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-gold">
          Make a Reservation
        </span>
        <Icon name="solar:arrow-right-linear" class="text-gold text-icon-size-5 sm:text-icon-size-4 md:text-icon-size-4 lg:text-icon-size-5 xl:text-icon-size-5 transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </section>
  </div>

  <USeparator />

  <div class="bg-offwhite">
    <section
      class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto"
      id="why-choose"
    >
      <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">■ THE DIFFERENCE</header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2">
        <div
          v-for="(item, index) in whyChooseItems"
          :key="item.title"
          class="group relative flex flex-col border-b md:border-b-0 md:border-l border-charcoal pb-uniform-5 md:pb-0 md:pl-uniform-4 lg:pl-uniform-3 xl:pl-uniform-3"
        >
          <span class="font-playfair text-heading-2 sm:text-heading-1 md:text-heading-2 lg:text-heading-2 xl:text-heading-2 text-taupe leading-none select-none">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="flex flex-col gap-uniform-6 sm:gap-uniform-5 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4 mt-uniform-6 sm:mt-uniform-5 md:mt-uniform-5 lg:mt-uniform-4 xl:mt-uniform-4">
            <h3 class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-4 lg:text-heading-4 xl:text-heading-4 text-charcoal">{{ item.title }}</h3>
            <div class="flex flex-col gap-uniform-7 sm:gap-uniform-6 md:gap-uniform-6 lg:gap-uniform-5 xl:gap-uniform-5">
              <p class="text-normal-4 sm:text-normal-3 md:text-normal-4 lg:text-normal-4 xl:text-normal-4 font-lato text-charcoal/70">{{ item.problem }}</p>
              <p class="text-normal-4 sm:text-normal-3 md:text-normal-4 lg:text-normal-4 xl:text-normal-4 font-lato text-charcoal">{{ item.solution }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <USeparator />

  <div class="bg-offwhite">
    <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto" id="service">
      <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">■ SERVICES</header>
      <div class="flex flex-wrap items-center gap-uniform-5 sm:gap-uniform-4 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3">
        <template v-for="(service, index) in services" :key="service.title">
          <div class="flex items-center gap-uniform-6 sm:gap-uniform-5 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4">
            <Icon :name="service.icon" class="text-icon-size-5 sm:text-icon-size-4 md:text-icon-size-4 lg:text-icon-size-3 xl:text-icon-size-3 text-taupe" />
            <span class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 lg:text-heading-3 xl:text-heading-3 text-charcoal">{{ service.title }}</span>
          </div>
          <span v-if="index < services.length - 1" class="font-playfair text-heading-3 sm:text-heading-2 md:text-heading-3 lg:text-heading-3 xl:text-heading-3 text-taupe">/</span>
        </template>
      </div>
    </section>
  </div>

  <div class="bg-offwhite">
    <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto" id="gallery-showcase">
      <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">■ RECENT WORK</header>
      <div class="flex flex-col gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 md:max-w-4xl lg:max-w-5xl xl:max-w-full">
        <div class="relative">
          <div class="aspect-video bg-charcoal overflow-hidden">
            <video
              v-for="(item, index) in galleryItems"
              v-show="currentSlide === index"
              :key="index"
              :src="item.src"
              class="w-full h-full object-cover"
              autoplay
              muted
              loop
              playsinline
            />
          </div>
          <div class="flex justify-center items-center gap-uniform-4 sm:gap-uniform-5 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3 mt-uniform-5 sm:mt-uniform-4 md:mt-uniform-4 lg:mt-uniform-3 xl:mt-uniform-3">
            <button
              @click="prevSlide"
              class="text-charcoal bg-transparent hover:bg-transparent active:text-gold min-w-11 min-h-11 flex items-center justify-center"
            >
              <Icon name="solar:arrow-left-linear" class="text-charcoal text-icon-size-4 sm:text-icon-size-4 md:text-icon-size-5 lg:text-icon-size-5 xl:text-icon-size-5" />
            </button>
            <div class="flex gap-uniform-5 sm:gap-uniform-6 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4">
              <button
                v-for="(_, index) in galleryItems"
                :key="index"
                @click="currentSlide = index"
                :class="[
                  'w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-2.5 lg:h-2.5 xl:w-2.5 xl:h-2.5 border border-charcoal transition-colors',
                  currentSlide === index ? 'bg-charcoal' : 'bg-transparent hover:bg-charcoal/50 active:bg-charcoal/70'
                ]"
              />
            </div>
            <button
              @click="nextSlide"
              class="text-charcoal bg-transparent hover:bg-transparent active:text-gold min-w-11 min-h-11 flex items-center justify-center"
            >
              <Icon name="solar:arrow-right-linear" class="text-charcoal text-icon-size-4 sm:text-icon-size-4 md:text-icon-size-5 lg:text-icon-size-5 xl:text-icon-size-5" />
            </button>
          </div>
        </div>
        <AnimatedButton
          to="/gallery"
          classes="self-center md:self-start text-gold font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 py-uniform-6"
        >
          View Full Gallery
        </AnimatedButton>
      </div>
    </section>
  </div>

  <USeparator />

  <div class="bg-offwhite">
    <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto" id="pricing-cta">
      <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">■ TRANSPARENT PRICING</header>

      <div class="flex flex-col md:flex-row md:items-center gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-2 lg:gap-uniform-1">
        <div class="relative flex items-center justify-center md:justify-start shrink-0">
          <span class="font-playfair text-taupe/30 text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] xl:text-[16rem] leading-none select-none">
            100%
          </span>
        </div>

        <div class="flex flex-col gap-uniform-5 md:gap-uniform-4 lg:gap-uniform-3 xl:gap-uniform-3 md:max-w-xl lg:max-w-2xl">
          <h2 class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal">
            Know exactly what you're paying for.
          </h2>
          <p class="text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 font-lato text-charcoal">
            Choose from our ready-made packages, add extras if you need them, and see your total instantly. The number you see is the number you pay.
          </p>
        </div>
      </div>
    </section>
  </div>

  <div class="bg-charcoal">
    <section class="flex flex-col md:flex-row md:items-center md:justify-between p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto" id="pricing-action">
      <div class="flex flex-col gap-uniform-6 sm:gap-uniform-5 md:gap-uniform-5">
        <p class="font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-offwhite/70">
          Curious what it costs?
        </p>
        <h3 class="font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-offwhite">
          Check it yourself.
        </h3>
      </div>
      <NuxtLink
        to="/calculator"
        class="group flex items-center gap-uniform-5 sm:gap-uniform-4 md:gap-uniform-4 self-start md:self-center border border-gold px-uniform-4 sm:px-uniform-3 md:px-uniform-3 py-uniform-5 sm:py-uniform-4 md:py-uniform-4 transition-colors hover:bg-gold/10"
      >
        <span class="font-lato text-normal-3 sm:text-normal-2 md:text-normal-2 lg:text-normal-3 xl:text-normal-3 text-gold">
          See Pricing
        </span>
        <Icon name="solar:arrow-right-linear" class="text-gold text-icon-size-5 sm:text-icon-size-4 md:text-icon-size-4 lg:text-icon-size-5 xl:text-icon-size-5 transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </section>
  </div>

  <div class="bg-offwhite">
    <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 lg:p-uniform-2 gap-uniform-4 sm:gap-uniform-3 md:gap-uniform-3 lg:gap-uniform-2 xl:gap-uniform-2 xl:max-w-6xl xl:mx-auto" id="faq">
      <header class="font-playfair text-charcoal text-heading-5 sm:text-heading-4 md:text-heading-5 lg:text-heading-5 xl:text-heading-5 tracking-wider uppercase">■ COMMON QUESTIONS</header>
      <UAccordion
        :items="faqItems"
        type="single"
        collapsible
        class="md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
        :ui="{
          item: 'border-b border-charcoal',
          trigger: 'font-playfair text-heading-4 sm:text-heading-3 md:text-heading-3 lg:text-heading-4 xl:text-heading-4 text-charcoal bg-transparent rounded-none py-uniform-5 md:py-uniform-4 lg:py-uniform-3 xl:py-uniform-3 hover:bg-transparent focus:outline-none gap-uniform-5',
          content: 'pb-uniform-5 md:pb-uniform-4 lg:pb-uniform-3 xl:pb-uniform-3',
          body: 'text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 font-lato text-charcoal'
        }"
      />
    </section>
  </div>

  <AppFooter />
</template>
