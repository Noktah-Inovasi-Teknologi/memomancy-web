<script lang="ts" setup>
const navMenu = ref<any>(null);
const navigationRoutes = [
  { label: "Gallery", to: "/gallery" },
  { label: "Reservation", to: "/reservation" },
  { label: "Pricing", to: "/calculator" },
];
const philosophyPoints = [
  {
    title: "Narrative-First Approach",
    description:
      "We start with your story, not our equipment. Before a single shot, we understand your vision, your audience, and what makes this moment matter.",
  },
  {
    title: "Flexible Services",
    description:
      "Premium doesn't mean rigid. Our pricing adapts to your needs, no hidden fees.",
  },
  {
    title: "Excellence",
    description:
      "We are committed to delivering the highest quality in every aspect of our work, from technical execution to artistic expression.",
  },
];
const servicePoints = [
  {
    title: "Photography",
    description:
      "Capturing moments with precision and artistry, from portraits to events.",
  },
  {
    title: "Videography",
    description:
      "Bringing stories to life through dynamic and engaging video content.",
  },
  {
    title: "Professional Editing",
    description:
      "Enhancing your visuals with professional editing for a polished final product.",
  },
];

const config = useRuntimeConfig();

const getMediaUrl = (filename: string) => {
  // If R2 base URL is configured (production), use it
  if (config.public.r2BaseUrl) {
    return `${config.public.r2BaseUrl}/${filename}`;
  }
  // Otherwise use local public folder (development)
  return `/videos/${filename}`;
};

const galleryItems = [
  { type: "video", src: getMediaUrl("Tia.mp4"), label: "Featured Photography" },
  { type: "video", src: getMediaUrl("Rizvi.mp4"), label: "Featured Videography" },
  { type: "video", src: getMediaUrl("Tia.mp4"), label: "Recent Work" },
];

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

const toggleNavMenu = (event: Event) => {
  navMenu.value.toggle(event);
};

// Initialize parallax effect
useParallax();
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex p-uniform-3 font-playfair font-medium text-heading-2 justify-between items-center mix-blend-difference z-[999]"
    id="menubar"
  >
    <p class="text-white mix-blend-difference">Memomancy</p>
    <div class="flex gap-uniform-7">
      <Button
        aria-controls="navigation_menu"
        aria-haspopup="true"
        @click="toggleNavMenu"
        icon=""
        variant="text"
        size="large"
      >
        <Icon name="solar:hamburger-menu-linear" />
      </Button>

      <Menu
        ref="navMenu"
        id="navigation_menu"
        :model="navigationRoutes"
        :popup="true"
      />
    </div>
  </div>

  <div class="flex flex-col gap-uniform-3 bg-charcoal" id="hero" data-parallax>
    <div class="aspect-[9/16] md:aspect-[16/9] relative overflow-hidden">
      <video
        :src="getMediaUrl('Tia.mp4')"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      />
    </div>
    <div
      class="flex flex-col gap-uniform-1 px-uniform-3 text-offwhite font-lato"
    >
      <p class="font-playfair text-heading-2">Where moments become legacy.</p>
      <p class="text-normal-2">
        Premium photography & videography for those who value narrative.
      </p>
    </div>
    <AnimatedButton
      to="/gallery"
      classes="self-center mb-uniform-3 text-gold font-lato text-normal-4 px-4 py-2"
    >
      Explore Our Gallery
    </AnimatedButton>
  </div>

  <div
    class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite"
    id="philosophy"
    data-parallax
  >
    <div class="basis-2/5 font-playfair tracking-wider">■ VISUAL STORYTELLING</div>
    <div class="flex flex-col basis-2/5">
      <div
        v-for="point in philosophyPoints"
        :key="point.title"
        class="mb-uniform-3"
      >
        <p class="font-playfair text-heading-3 mb-uniform-6">
          {{ point.title }}
        </p>
        <p class="text-normal-4 font-lato">{{ point.description }}</p>
      </div>
    </div>
    <div class="basis-1/5 text-end">M✦ - 01</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="service" data-parallax>
    <div class="basis-2/5 font-playfair tracking-wider">■ SERVICES</div>
    <div class="flex flex-col basis-2/5">
      <Accordion
        value="0"
        :pt="{
          root: { class: 'flex flex-col gap-uniform-6 bg-transparent' }
        }"
      >
        <AccordionPanel
          v-for="item in servicePoints"
          :key="item.title"
          :value="item.description"
          :pt="{
            root: { class: 'border-b border-charcoal rounded-none bg-transparent' },
            header: { class: 'pb-uniform-6 bg-transparent rounded-none' },
            headerAction: {
              class: 'w-full flex justify-between items-center font-playfair text-heading-3 text-charcoal bg-transparent hover:bg-transparent p-0 transition-none rounded-none focus:shadow-none'
            },
            headerIcon: { class: 'text-charcoal text-normal-4' },
            content: { class: 'pb-uniform-6 pt-0 px-0 bg-transparent rounded-none' }
          }"
        >
          <AccordionHeader>
            <p class="font-playfair">{{ item.title }}</p>
          </AccordionHeader>
          <AccordionContent>
            <p class="text-normal-4 font-lato">{{ item.description }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
    <div class="basis-1/5 text-end">M✦ - 02</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-charcoal" id="gallery-showcase" data-parallax>
    <div class="basis-2/5 font-playfair text-offwhite tracking-wider">■ RECENT WORK</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <Carousel
        :value="galleryItems"
        :numVisible="1"
        :numScroll="1"
        :pt="{
          root: { class: 'bg-transparent' },
          content: { class: 'bg-transparent' },
          indicatorsContent: { class: 'bg-transparent' },
          indicator: { class: 'bg-transparent' },
          indicatorButton: {
            class: 'w-uniform-7 h-uniform-7 bg-transparent border border-offwhite rounded-none hover:bg-offwhite transition-colors'
          },
          previousButton: {
            class: 'text-offwhite bg-transparent hover:bg-transparent rounded-none focus:shadow-none'
          },
          nextButton: {
            class: 'text-offwhite bg-transparent hover:bg-transparent rounded-none focus:shadow-none'
          }
        }"
      >
        <template #item="slotProps">
          <div class="flex items-center justify-center aspect-[16/9] bg-charcoal">
            <video
              v-if="slotProps.data.type === 'video'"
              :src="slotProps.data.src"
              class="w-full h-full object-cover"
              autoplay
              muted
              loop
              playsinline
            />
            <span v-else class="text-offwhite text-normal-2 font-lato">
              {{ slotProps.data.label }}
            </span>
          </div>
        </template>
      </Carousel>
      <AnimatedButton
        to="/gallery"
        classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
      >
        View Full Gallery
      </AnimatedButton>
    </div>
    <div class="basis-1/5 text-end text-offwhite">M✦ - 03</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-charcoal" id="pricing-cta" data-parallax>
    <div class="basis-2/5 font-playfair text-offwhite tracking-wider">■ TRANSPARENT PRICING</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <div class="flex flex-col gap-uniform-6">
        <p class="font-playfair text-heading-3 text-offwhite">
          No hidden fees. No surprises.
        </p>
        <p class="text-normal-4 font-lato text-offwhite">
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
    <div class="basis-1/5 text-end text-offwhite">M✦ - 04</div>
  </div>

  <div class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="faq" data-parallax>
    <div class="basis-2/5 font-playfair tracking-wider">■ COMMON QUESTIONS</div>
    <div class="flex flex-col basis-2/5 gap-uniform-3">
      <Accordion
        :pt="{
          root: { class: 'flex flex-col gap-uniform-6 bg-transparent' }
        }"
      >
        <AccordionPanel
          v-for="item in faqItems"
          :key="item.question"
          :value="item.question"
          :pt="{
            root: { class: 'border-b border-charcoal rounded-none bg-transparent' },
            header: { class: 'pb-uniform-6 bg-transparent rounded-none' },
            headerAction: {
              class: 'w-full flex justify-between items-center font-playfair text-heading-3 text-charcoal bg-transparent hover:bg-transparent p-0 transition-none rounded-none focus:shadow-none'
            },
            headerIcon: { class: 'text-charcoal text-normal-4' },
            content: { class: 'pb-uniform-6 pt-0 px-0 bg-transparent rounded-none' }
          }"
        >
          <AccordionHeader>
            <p class="font-playfair">{{ item.question }}</p>
          </AccordionHeader>
          <AccordionContent>
            <p class="text-normal-4 font-lato">{{ item.answer }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <AnimatedButton
        to="/"
        classes="self-center text-gold font-lato text-normal-4 px-4 py-2"
      >
        View All FAQs
      </AnimatedButton>
    </div>
    <div class="basis-1/5 text-end">M✦ - 05</div>
  </div>

  <footer class="flex flex-col p-uniform-3 gap-uniform-3 bg-charcoal" id="footer" data-parallax>
    <div class="flex flex-col md:flex-row gap-uniform-3 text-offwhite">
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
            classes="text-offwhite hover:text-gold w-fit"
          >
            Gallery
          </AnimatedButton>
          <AnimatedButton
            to="/reservation"
            classes="text-offwhite hover:text-gold w-fit"
          >
            Reservation
          </AnimatedButton>
          <AnimatedButton
            to="/calculator"
            classes="text-offwhite hover:text-gold w-fit"
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
    <div class="border-t border-offwhite pt-uniform-3 mt-uniform-3">
      <p class="text-offwhite font-lato text-normal-5 text-center">
        © {{ new Date().getFullYear() }} Memomancy. All rights reserved.
      </p>
    </div>
  </footer>
</template>
