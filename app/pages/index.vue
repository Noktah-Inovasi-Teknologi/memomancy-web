<script lang="ts" setup>
const navMenu = ref<HTMLElement | null>(null);
const isNavMenuOpen = ref(false);
const navigationRoutes = [
  { label: "Gallery", to: "/gallery" },
  { label: "Reservation", to: "/reservation" },
  { label: "Pricing", to: "/calculator" },
];
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

const toggleNavMenu = () => {
  isNavMenuOpen.value = !isNavMenuOpen.value;
};

const closeNavMenu = () => {
  isNavMenuOpen.value = false;
};

// Initialize parallax effect
useParallax();
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex p-uniform-3 font-playfair font-medium text-heading-2 justify-between items-center mix-blend-difference z-999"
    id="menubar"
  >
    <p class="text-white mix-blend-difference">Memomancy</p>
    <div class="flex gap-uniform-7 relative">
      <button
        aria-controls="navigation_menu"
        aria-haspopup="true"
        @click="toggleNavMenu"
        class="text-white p-2"
      >
        <Icon name="solar:hamburger-menu-linear" />
      </button>

      <nav
        v-if="isNavMenuOpen"
        id="navigation_menu"
        class="absolute top-full right-0 mt-2 bg-white rounded shadow-lg py-2 min-w-37.5"
        @click="closeNavMenu"
      >
        <NuxtLink
          v-for="route in navigationRoutes"
          :key="route.to"
          :to="route.to"
          class="block px-4 py-2 text-charcoal text-normal-4 hover:bg-gray-100"
        >
          {{ route.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>

  <div class="bg-offwhite aspect-9/16 md:aspect-video overflow-hidden" id="hero" data-parallax-media>
    <video
      :src="getVideoUrl('Tia.mp4')"
      class="w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    />
  </div>

  <div class="flex flex-col gap-uniform-3 p-uniform-3 bg-offwhite" id="hero-cta" data-parallax>
    <div class="flex flex-col gap-uniform-1 text-charcoal font-lato">
      <p class="font-playfair text-heading-2">Where moments become legacy.</p>
      <p class="text-normal-2">
        Premium photography & videography for those who value narrative.
      </p>
    </div>
    <AnimatedButton
      to="/gallery"
      classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
    >
      Explore Our Gallery
    </AnimatedButton>
  </div>

  <USeparator />

  <div
    class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite"
    id="philosophy"
    data-parallax
  >
    <div class="basis-2/5 font-playfair tracking-wider">■ OUR PHILOSOPHIES</div>
    <div class="flex flex-col basis-2/5">
      <UAccordion
        :items="philosophyItems"
        type="single"
        collapsible
        :ui="{
          item: 'border-b border-charcoal',
          trigger: 'font-playfair text-heading-3 text-charcoal bg-transparent rounded-none py-uniform-6 hover:bg-transparent focus:outline-none',
          content: 'pb-uniform-6',
          body: 'text-normal-4 font-lato text-charcoal'
        }"
      />
    </div>
  </div>

  <USeparator />

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="service" data-parallax>
    <div class="basis-2/5 font-playfair tracking-wider">■ SERVICES</div>
    <div class="flex flex-col basis-2/5">
      <div class="flex flex-col gap-uniform-6">
        <div
          v-for="(item, index) in servicePoints"
          :key="item.title"
          class="border-b border-charcoal"
        >
          <button
            @click="toggleService(index)"
            class="w-full flex justify-between items-center font-playfair text-heading-3 text-charcoal bg-transparent p-0 pb-uniform-6"
          >
            <p class="font-playfair">{{ item.title }}</p>
            <Icon
              :name="openServiceIndex === index ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'"
              class="text-charcoal text-normal-4"
            />
          </button>
          <div
            v-if="openServiceIndex === index"
            class="pb-uniform-6"
          >
            <p class="text-normal-4 font-lato">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="basis-1/5 text-end">M✦ - 02</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="gallery-showcase" data-parallax>
    <div class="basis-2/5 font-playfair text-charcoal tracking-wider">■ RECENT WORK</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <div class="relative">
        <div class="flex items-center justify-center aspect-video bg-offwhite overflow-hidden">

        </div>
        <div class="flex justify-center items-center gap-4 mt-uniform-4">
          <button
            @click="prevSlide"
            class="text-charcoal bg-transparent hover:bg-transparent p-2"
          >
            <Icon name="solar:arrow-left-linear" class="text-charcoal" />
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, index) in galleryItems"
              :key="index"
              @click="currentSlide = index"
              :class="[
                'w-uniform-7 h-uniform-7 border border-charcoal transition-colors',
                currentSlide === index ? 'bg-charcoal' : 'bg-transparent hover:bg-charcoal/50'
              ]"
            />
          </div>
          <button
            @click="nextSlide"
            class="text-charcoal bg-transparent hover:bg-transparent p-2"
          >
            <Icon name="solar:arrow-right-linear" class="text-charcoal" />
          </button>
        </div>
      </div>
      <AnimatedButton
        to="/gallery"
        classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
      >
        View Full Gallery
      </AnimatedButton>
    </div>
    <div class="basis-1/5 text-end text-charcoal">M✦ - 03</div>
  </div>

  <USeparator />

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="pricing-cta" data-parallax>
    <div class="basis-2/5 font-playfair text-charcoal tracking-wider">■ TRANSPARENT PRICING</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <div class="flex flex-col gap-uniform-6">
        <p class="font-playfair text-heading-3 text-charcoal">
          No hidden fees. No surprises.
        </p>
        <p class="text-normal-4 font-lato text-charcoal">
          Our interactive pricing calculator lets you build a custom package that fits your needs and budget. Get an instant estimate based on your project requirements.
        </p>
      </div>
      <AnimatedButton
        to="/calculator"
        classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
      >
        Calculate Your Project
      </AnimatedButton>
    </div>
    <div class="basis-1/5 text-end text-charcoal">M✦ - 04</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="faq" data-parallax>
    <div class="basis-2/5 font-playfair tracking-wider">■ COMMON QUESTIONS</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <div class="flex flex-col gap-uniform-6">
        <div
          v-for="(item, index) in faqItems"
          :key="item.question"
          class="border-b border-charcoal"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full flex justify-between items-center font-playfair text-heading-3 text-charcoal bg-transparent p-0 pb-uniform-6"
          >
            <p class="font-playfair">{{ item.question }}</p>
            <Icon
              :name="openFaqIndex === index ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'"
              class="text-charcoal text-normal-4"
            />
          </button>
          <div
            v-if="openFaqIndex === index"
            class="pb-uniform-6"
          >
            <p class="text-normal-4 font-lato">{{ item.answer }}</p>
          </div>
        </div>
      </div>
      <AnimatedButton
        to="/"
        classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
      >
        View All FAQs
      </AnimatedButton>
    </div>
    <div class="basis-1/5 text-end">M✦ - 05</div>
  </div>

  <USeparator />

  <footer class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="footer">
    <div class="flex flex-col md:flex-row gap-uniform-3 text-charcoal">
      <div class="flex-1 flex flex-col gap-uniform-6">
        <p class="font-playfair text-heading-3">Memomancy</p>
        <p class="font-lato text-normal-4">
          Where moments become legacy.
        </p>
      </div>
      <div class="flex-1 flex flex-col gap-uniform-6">
        <p class="font-playfair text-heading-5">Quick Links</p>
        <nav class="flex flex-col gap-uniform-7 font-lato text-normal-4">
          <AnimatedButton
            to="/gallery"
            classes="text-charcoal hover:text-gold w-fit"
          >
            Gallery
          </AnimatedButton>
          <AnimatedButton
            to="/reservation"
            classes="text-charcoal hover:text-gold w-fit"
          >
            Reservation
          </AnimatedButton>
          <AnimatedButton
            to="/calculator"
            classes="text-charcoal hover:text-gold w-fit"
          >
            Pricing
          </AnimatedButton>
        </nav>
      </div>
      <div class="flex-1 flex flex-col gap-uniform-6">
        <p class="font-playfair text-heading-5">Contact</p>
        <div class="flex flex-col gap-uniform-7 font-lato text-normal-4">
          <p>info@memomancy.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
    <div class="border-t border-charcoal pt-uniform-3 mt-uniform-3">
      <p class="text-charcoal font-lato text-normal-5 text-center">
        © {{ new Date().getFullYear() }} Memomancy. All rights reserved.
      </p>
    </div>
  </footer>
</template>
