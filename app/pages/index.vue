<script lang="ts" setup>
const philosophyItems = [
  {
    label: "Narrative-First Approach",
    content:
      "We start with your story, not our equipment. Before a single shot, we understand your vision, your audience, and what makes this moment matter.",
  },
  {
    label: "Flexible Services",
    content:
      "Premium doesn't mean rigid. Our pricing adapts to your needs, no hidden fees.",
  },
  {
    label: "Excellence",
    content:
      "We are committed to delivering the highest quality in every aspect of our work, from technical execution to artistic expression.",
  },
];
const servicePoints = [
  {
    title: "Photography",
    description:
      "Capturing moments with precision and artistry, from portraits to events.",
    isOpen: false,
  },
  {
    title: "Videography",
    description:
      "Bringing stories to life through dynamic and engaging video content.",
    isOpen: false,
  },
  {
    title: "Professional Editing",
    description:
      "Enhancing your visuals with professional editing for a polished final product.",
    isOpen: false,
  },
];

const openServiceIndex = ref<number | null>(null);

const toggleService = (index: number) => {
  openServiceIndex.value = openServiceIndex.value === index ? null : index;
};

const { getVideoUrl } = useMedia();

const galleryItems = [
  { type: "video", src: getVideoUrl("Tia.mp4"), label: "Featured Photography" },
  { type: "video", src: getVideoUrl("Rizvi.mp4"), label: "Featured Videography" },
  { type: "video", src: getVideoUrl("Tia.mp4"), label: "Recent Work" },
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
    question: "How far in advance should I book?",
    answer: "We recommend booking 3-6 months in advance for optimal availability, especially for weddings and special events. However, we can often accommodate last-minute requests depending on our schedule."
  },
  {
    question: "What's included in your packages?",
    answer: "All packages include professional editing, high-resolution digital files, and online gallery access. Specific inclusions vary by package, use our pricing calculator to see what fits your needs."
  },
  {
    question: "Do you travel for shoots?",
    answer: "Yes, we travel locally and internationally for projects. Travel fees vary by location and are calculated during the booking process."
  }
];

const openFaqIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

const heroLoaded = ref(false);

// Initialize parallax effect
useParallax();
</script>

<template>
  <AppHeader />

  <div class="bg-offwhite aspect-9/16 md:aspect-video overflow-hidden relative" id="hero" data-parallax-media>
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

  <section class="flex flex-col gap-uniform-4 sm:gap-uniform-3 p-uniform-5 sm:p-uniform-4 md:p-uniform-3 bg-offwhite" id="hero-cta" data-parallax>
    <div class="flex flex-col gap-uniform-5 text-charcoal">
      <h1 class="font-playfair text-heading-2 sm:text-heading-1">Where moments become legacy.</h1>
      <p class="font-lato text-normal-3 sm:text-normal-2">
        Premium photography & videography for those who value narrative.
      </p>
    </div>
    <AnimatedButton
      to="/gallery"
      classes="self-center text-gold font-lato text-normal-4 sm:text-normal-3 py-uniform-6"
    >
      Explore Our Gallery
    </AnimatedButton>
  </section>

  <USeparator />

  <section
    class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 gap-uniform-4 sm:gap-uniform-3 bg-offwhite"
    id="philosophy"
    data-parallax
  >
    <header class="font-playfair text-charcoal text-heading-6 sm:text-heading-5 tracking-wider uppercase">■ OUR PHILOSOPHIES</header>
    <div class="flex flex-col basis-2/5">
      <UAccordion
        :items="philosophyItems"
        type="single"
        collapsible
        :ui="{
          item: 'border-b border-charcoal',
          trigger: 'font-playfair text-heading-4 sm:text-heading-3 text-charcoal bg-transparent rounded-none py-uniform-5 hover:bg-transparent focus:outline-none',
          content: 'pb-uniform-5',
          body: 'text-normal-4 sm:text-normal-3 font-lato text-charcoal'
        }"
      />
    </div>
  </section>

  <USeparator />

  <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 gap-uniform-4 sm:gap-uniform-3 bg-offwhite" id="service" data-parallax>
    <header class="font-playfair text-charcoal text-heading-6 sm:text-heading-5 tracking-wider uppercase">■ SERVICES</header>
    <div class="flex flex-col basis-2/5">
      <div class="flex flex-col gap-uniform-5">
        <div
          v-for="(item, index) in servicePoints"
          :key="item.title"
          class="border-b border-charcoal"
        >
          <button
            @click="toggleService(index)"
            class="w-full flex justify-between items-center font-playfair text-heading-4 sm:text-heading-3 text-charcoal bg-transparent p-0 pb-uniform-5 gap-uniform-5"
          >
            <span class="font-playfair text-left">{{ item.title }}</span>
            <Icon
              :name="openServiceIndex === index ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'"
              class="text-charcoal text-icon-size-4 sm:text-icon-size-5 shrink-0"
            />
          </button>
          <div
            v-if="openServiceIndex === index"
            class="pb-uniform-5"
          >
            <p class="text-normal-4 sm:text-normal-3 font-lato">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="text-end text-charcoal text-normal-5 sm:text-normal-4">M✦ - 02</footer>
  </section>

  <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 gap-uniform-4 sm:gap-uniform-3 bg-offwhite" id="gallery-showcase" data-parallax>
    <header class="font-playfair text-charcoal text-heading-6 sm:text-heading-5 tracking-wider uppercase">■ RECENT WORK</header>
    <div class="flex flex-col basis-2/5 gap-uniform-4 sm:gap-uniform-3">
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
        <div class="flex justify-center items-center gap-uniform-4 sm:gap-uniform-5 mt-uniform-5 sm:mt-uniform-4">
          <button
            @click="prevSlide"
            class="text-charcoal bg-transparent hover:bg-transparent active:text-gold min-w-11 min-h-11 flex items-center justify-center"
          >
            <Icon name="solar:arrow-left-linear" class="text-charcoal text-icon-size-4 sm:text-icon-size-5" />
          </button>
          <div class="flex gap-uniform-5 sm:gap-uniform-6">
            <button
              v-for="(_, index) in galleryItems"
              :key="index"
              @click="currentSlide = index"
              :class="[
                'w-3 h-3 sm:w-4 sm:h-4 border border-charcoal transition-colors',
                currentSlide === index ? 'bg-charcoal' : 'bg-transparent hover:bg-charcoal/50 active:bg-charcoal/70'
              ]"
            />
          </div>
          <button
            @click="nextSlide"
            class="text-charcoal bg-transparent hover:bg-transparent active:text-gold min-w-11 min-h-11 flex items-center justify-center"
          >
            <Icon name="solar:arrow-right-linear" class="text-charcoal text-icon-size-4 sm:text-icon-size-5" />
          </button>
        </div>
      </div>
      <AnimatedButton
        to="/gallery"
        classes="self-center text-gold font-lato text-normal-4 sm:text-normal-3 py-uniform-6"
      >
        View Full Gallery
      </AnimatedButton>
    </div>
    <footer class="text-end text-charcoal text-normal-5 sm:text-normal-4">M✦ - 03</footer>
  </section>

  <USeparator />

  <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 gap-uniform-4 sm:gap-uniform-3 bg-offwhite" id="pricing-cta" data-parallax>
    <header class="font-playfair text-charcoal text-heading-6 sm:text-heading-5 tracking-wider uppercase">■ TRANSPARENT PRICING</header>
    <div class="flex flex-col gap-uniform-4 sm:gap-uniform-3">
      <div class="flex flex-col gap-uniform-5">
        <h2 class="font-playfair text-heading-4 sm:text-heading-3 text-charcoal">
          No hidden fees. No surprises.
        </h2>
        <p class="text-normal-4 sm:text-normal-3 font-lato text-charcoal">
          Our interactive pricing calculator lets you build a custom package that fits your needs and budget. Get an instant estimate based on your project requirements.
        </p>
      </div>
      <AnimatedButton
        to="/calculator"
        classes="self-center text-gold font-lato text-normal-4 sm:text-normal-3 py-uniform-6"
      >
        Calculate Your Project
      </AnimatedButton>
    </div>
    <footer class="text-end text-charcoal text-normal-5 sm:text-normal-4">M✦ - 04</footer>
  </section>

  <section class="flex flex-col p-uniform-5 sm:p-uniform-4 md:p-uniform-3 gap-uniform-4 sm:gap-uniform-3 bg-offwhite" id="faq" data-parallax>
    <header class="font-playfair text-charcoal text-heading-6 sm:text-heading-5 tracking-wider uppercase">■ COMMON QUESTIONS</header>
    <div class="flex flex-col gap-uniform-4 sm:gap-uniform-3">
      <div class="flex flex-col gap-uniform-5">
        <div
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="border-b border-charcoal"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex justify-between items-center font-playfair text-heading-4 sm:text-heading-3 text-charcoal bg-transparent p-0 pb-uniform-5 gap-uniform-5"
          >
            <span class="font-playfair text-left">{{ item.question }}</span>
            <Icon
              :name="openFaqIndex === index ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'"
              class="text-charcoal text-icon-size-4 sm:text-icon-size-5 shrink-0"
            />
          </button>
          <div
            v-if="openFaqIndex === index"
            class="pb-uniform-5"
          >
            <p class="text-normal-4 sm:text-normal-3 font-lato">{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <AnimatedButton
        to="/"
        classes="self-center text-gold font-lato text-normal-4 sm:text-normal-3 py-uniform-6"
      >
        View All FAQs
      </AnimatedButton>
    </div>
    <footer class="text-end text-charcoal text-normal-5 sm:text-normal-4">M✦ - 05</footer>
  </section>

  <AppFooter />
</template>
