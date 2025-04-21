<script lang="ts" setup>
const colorMode = useColorMode();
const { $viewport } = useNuxtApp();
const emoticons = ref(["✨", "🧙", "📸", "🧙‍♂️", "🪄", "🧙‍♀️", "📷"]);
const { currentEmoticon } = useEmoticonLooper(emoticons.value);
const galleryImages = ref([
  { src: "/images/x1.png", alt: "Cat girl model", title: "Cat girl model" },
  {
    src: "/images/x2.png",
    alt: "Pink angel sculpture",
    title: "Pink angel sculpture",
  },
  {
    src: "/images/x3.png",
    alt: "Cat cartoon dwarf riding a mouse",
    title: "Cat cartoon dwarf riding a mouse",
  },
  {
    src: "/images/x4.png",
    alt: "Leopard on pink flower field",
    title: "Leopard on pink flower field",
  },
  {
    src: "/images/x13.png",
    alt: "Sakura tree on a hill",
    title: "Sakura tree on a hill",
  },
]);
const galleryImages1 = ref([
  {
    src: "/images/x5.png",
    alt: "Colorful frank knight",
    title: "Colorful frank knight",
  },
  {
    src: "/images/x6.png",
    alt: "Elegant glossy white-pink flower",
    title: "Elegant glossy white-pink flower",
  },
  {
    src: "/images/x7.png",
    alt: "Bug on an egg-shaped chinese decoration",
    title: "Bug on an egg-shaped chinese decoration",
  },
  {
    src: "/images/x8.png",
    alt: "Cartoonish white dog with green sweater",
    title: "Cartoonish white dog with green sweater",
  },
]);
const galleryImages2 = ref([
  { src: "/images/x9.png", alt: "Whale in the sky", title: "Whale on the sky" },
  { src: "/images/x10.png", alt: "Couple kissing", title: "Couple kissing" },
  {
    src: "/images/x11.png",
    alt: "Japanese woman below toris",
    title: "Japanese woman below toris",
  },
  {
    src: "/images/x12.png",
    alt: "Urban ape samurai hobbyist",
    title: "Urban ape samurai hobbyist",
  },
]);

function useEmoticonLooper(emojis: string[], interval = 2000) {
  const current = ref(emojis[0]);
  let index = 0;
  let intervalId: ReturnType<typeof setInterval>;

  onMounted(() => {
    intervalId = setInterval(() => {
      index = (index + 1) % emojis.length;
      current.value = emojis[index];
    }, interval);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return {
    currentEmoticon: current,
  };
}
</script>

<template>
  <div class="flex flex-col w-full bg-[#F5F2EB] dark:bg-[#1F1F1F]">
    <div class="m-8" id="hero">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex flex-col items-start">
          <p class="heading-1 main-tagline top-tagline">Abadikan Hari Ini</p>
          <p class="heading-1 main-tagline bottom-tagline">
            Ceritakan Selamanya
          </p>
          <p class="heading-4 mt-6 text-color-alternating">
            Kami foto dan rekam momenmu tanpa ribet
          </p>
        </div>
        <div>
          <transition name="fade" mode="out-in">
            <p :key="currentEmoticon" class="emoji">
              {{ currentEmoticon }}
            </p>
          </transition>
        </div>
      </div>
      <div class="w-full flex flex-col gap-8">
        <div class="w-full mt-8">
          <div class="relative image-container">
            <img
              src="/images/blue_beach.png"
              alt="Blue Beach"
              class="main-image"
            />
            <div
              class="flex flex-col absolute bottom-0 left-0 w-full padding-1 gap-uniform-1"
            >
              <div class="w-full">
                <p class="heading-2 text-center md:text-start">
                  Mending Pake Jasa Kami
                </p>
              </div>
              <div
                class="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4"
              >
                <p
                  class="secondary-list paragraph-3 padding-4 bg-color-alternating text-color-alternating"
                >
                  🗺️ Ada di banyak kota dan tempat
                </p>
                <p
                  class="secondary-list paragraph-3 padding-4 bg-color-alternating text-color-alternating"
                >
                  🛠️ Fleksibel dan dapat dikustomisasi
                </p>
                <p
                  class="secondary-list paragraph-3 padding-4 bg-color-alternating text-color-alternating"
                >
                  ⏱️ Reservasi waktu & tempat gampang anti ribet
                </p>
                <Button>
                  <NuxtLink
                    to="/reservation"
                    class="flex items-center gap-8 paragraph-3 text-[#1F1F1F] font-semibold"
                  >
                    <p>Reservasi Sekarang</p>
                    <Icon name="uil:arrow-up-right" class="w-8 h-8" />
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="gallery">
      <div class="flex flex-col gap-uniform-1">
        <p class="paragraph-2">Masih ragu sama hasilnya? Scroll dulu ke</p>
        <p class="heading-1 text-color-alternating">Galeri Portfolio</p>
      </div>
      <div
        class="flex gap-8 h-[360px] sm:h-[480px] 2xl:h-[560px] overflow-hidden"
      >
        <div
          class="flex flex-col gap-8 md:basis-1/2 xl:basis-1/3 animate-infinite-loop-scroll ease-in-out"
        >
          <div
            class="relative"
            v-for="(image, index) in galleryImages"
            :key="index"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="rounded-[3rem] w-full"
            />
            <div class="absolute top-0 left-0 padding-uniform-2">
              <p
                class="padding-5 rounded-[3rem] bg-color-alternating text-color-alternating paragraph-3"
              >
                {{ image.title }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-8 basis-1/2 xl:basis-1/3 animate-infinite-loop-scroll-inverted ease-in-out"
          v-if="$viewport.isGreaterOrEquals('md')"
        >
          <div
            class="relative"
            v-for="(image, index) in galleryImages1"
            :key="index"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="rounded-[3rem] w-full"
            />
            <div class="absolute top-0 left-0 padding-uniform-2">
              <p
                class="padding-5 rounded-[3rem] bg-color-alternating text-color-alternating paragraph-3"
              >
                {{ image.title }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col gap-8 basis-1/3 animate-infinite-loop-scroll-5 ease-in-out"
          v-if="$viewport.isGreaterOrEquals('xl')"
        >
          <div
            class="relative"
            v-for="(image, index) in galleryImages2"
            :key="index"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="rounded-[3rem] w-full"
            />
            <div class="absolute top-0 left-0 padding-uniform-2">
              <p
                class="padding-5 rounded-[3rem] bg-color-alternating text-color-alternating paragraph-3"
              >
                {{ image.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button>
          <NuxtLink
            to="/gallery"
            class="flex items-center paragraph-3 text-[#1F1F1F] font-semibold gap-8"
          >
            <p>Lihat Galeri Portfolio Lengkap</p>
            <Icon name="uil:arrow-up-right" class="w-8 h-8" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-styling {
  @apply !rounded-full border-0 hover:bg-[#E3FE01];
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200 ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.main-tagline {
  @apply w-full px-8 bg-[#E3FE01] text-center;
  @apply sm:w-auto sm:px-0 sm:text-start;
  @apply md:px-4 text-nowrap;
}
.top-tagline {
  @apply pt-4 rounded-t-[3rem];
  @apply sm:pt-0 sm:rounded-t-[3rem];
  @apply md:pt-2 md:rounded-t-[1rem];
  @apply lg:pt-4 lg:rounded-t-[2rem];
}
.bottom-tagline {
  @apply pb-2 rounded-b-[3rem];
  @apply sm:pb-0 sm:rounded-b-none sm:rounded-r-[3rem];
  @apply md:pt-1 md:pb-0 md:rounded-none md:rounded-r-[1rem] md:rounded-bl-[1rem];
  @apply lg:pb-2 lg:rounded-r-[2rem] lg:rounded-bl-[2rem];
}
.sub-tagline {
  @apply mt-6 text-center text-base font-han;
  @apply sm:text-start sm:text-2xl;
  @apply md:text-base;
}
.emoji {
  @apply text-[2rem] text-center transition-all duration-200 ease-in-out transform;
  @apply md:text-[7rem];
  @apply lg:text-[10rem];
  @apply xl:text-[12rem];
  @apply 2xl:text-[15rem];
}
.image-container {
  @apply w-full aspect-[1/2] sm:aspect-[1/2] md:aspect-[2/1] lg:aspect-[2/1] xl:aspect-[3/1];
}
.main-image {
  @apply rounded-[3rem] w-full h-full object-cover;
}
.text-content-normal {
  @apply text-white text-sm;
  @apply md:text-base;
  @apply lg:text-base;
}
.secondary-list {
  @apply flex rounded-full text-center items-center justify-center;
}
</style>
