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
const reservationSteps = ref([
  {
    title: "Mulai Reservasi",
    description:
      "Klik tombol reservasi di bawah untuk mulai proses booking yang mudah dan cepat.",
    number: 1,
    icon: "uil:calendar-alt",
  },
  {
    title: "Pilih Paket & Waktu",
    description:
      "Tentukan jenis sesi foto, tanggal, waktu, dan lokasi yang kamu inginkan.",
    number: 2,
    icon: "uil:map-marker",
    details: [
      "Pilih paket foto/video",
      "Tentukan tanggal & jam",
      "Pilih lokasi shooting",
    ],
  },
  {
    title: "Bayar dengan Mudah",
    description:
      "Pembayaran fleksibel via transfer bank, e-wallet, atau QRIS. Aman dan terpercaya.",
    number: 3,
    icon: "uil:credit-card",
    details: ["Transfer Bank", "E-wallet (OVO, Dana, Gopay)", "QRIS"],
  },
  {
    title: "Konfirmasi Otomatis",
    description:
      "Tim kami akan menghubungi via WhatsApp untuk konfirmasi detail dalam 24 jam.",
    number: 4,
    icon: "uil:whatsapp",
    details: ["Konfirmasi booking", "Brief konsep foto", "Koordinasi teknis"],
  },
  {
    title: "Sesi Foto Dimulai! ✨",
    description:
      "Fotografer profesional kami siap mengabadikan momen spesialmu dengan magic touch Memomancy.",
    number: 5,
    icon: "uil:camera",
    details: [
      "Photographer datang tepat waktu",
      "Sesi foto/video profesional",
      "Hasil edit dalam 3-7 hari",
    ],
    celebration: true,
  },
]);
const selectedCategory = ref("life-stories");
const categoryOptions = [
  { label: "Life Stories & Celebrations", value: "life-stories" },
  { label: "Love & Union", value: "love-union" },
  { label: "Sport", value: "sport" },
  { label: "Event", value: "event" },
];

const categoryImages = {
  "life-stories": [
    { src: "/images/x2.png", alt: "Life story image", title: "Life Stories" },
    { src: "/images/x7.png", alt: "Life story image", title: "Life Stories" },
    { src: "/images/x11.png", alt: "Life story image", title: "Life Stories" },
  ],
  "love-union": [
    { src: "/images/x10.png", alt: "Love union image", title: "Love & Union" },
    { src: "/images/x3.png", alt: "Love union image", title: "Love & Union" },
    { src: "/images/x13.png", alt: "Love union image", title: "Love & Union" },
  ],
  sport: [
    { src: "/images/x5.png", alt: "Sport image", title: "Sport" },
    { src: "/images/x8.png", alt: "Sport image", title: "Sport" },
    { src: "/images/x12.png", alt: "Sport image", title: "Sport" },
  ],
  event: [
    { src: "/images/x1.png", alt: "Event image", title: "Event" },
    { src: "/images/x6.png", alt: "Event image", title: "Event" },
    { src: "/images/x9.png", alt: "Event image", title: "Event" },
  ],
};

const carouselVisible = computed(() => {
  if (process.client) {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  }
  return 1; // Server-side default
});

const carouselScroll = computed(() => {
  return carouselVisible.value;
});

const carouselOrientation = computed(() => {
  if (process.client) {
    const width = window.innerWidth;
    return width < 640 ? "vertical" : "horizontal";
  }
  return "horizontal"; // Server-side default
});

const filteredImages = computed(() => {
  return (
    categoryImages[selectedCategory.value as keyof typeof categoryImages] || []
  );
});
const whyUs = ref([
  {
    title: "Kualitas Terjamin & Terstandarisasi",
    description:
      "Sudah coba macem-macem foto-videografer dan hasilnya beda semua? Pilih Memomancy kalo kamu pengen hasil yang konsisten dimana aja kapan aja momenmu direkam.",
    icons: ["uil:camera", "uil:check-circle", "uil:star"],
  },
  {
    title: "Fleksibel & Bisa Custom Request",
    description:
      "Butuh 3 kru? Gass. Butuh 2 angle kamera? Gass. Butuh edit video yang ada narasinya? Gass. Apapun yang kamu butuhin, tambahin aja toppingnya.",
    icons: ["uil:setting", "uil:edit-alt", "uil:icons"],
  },
  {
    title: "Ada di Banyak Kota & Tempat",
    description:
      "Lagi di surabaya nyari foto-videografer? Ada Memomancy. Lagi di Gili Labak Sumenep? Ada Memomancy. Pokoknya kalo lagi di Surabaya, Gresik, dan Madura, langsung kontak Memomancy.",
    icons: ["uil:map-marker", "uil:location-arrow", "uil:home"],
  },
  {
    title: "Murah Luar Biasa, Serius",
    description:
      "Kalo kamu udah liat harga di halaman reservasi, kamu pasti setuju kalo Memomancy itu murah luar biasa. Murahnya bukan berarti murahan, tapi karena kami percaya semua orang berhak ngeabadikan momennya.",
    icons: ["uil:money-bill", "uil:money-withdrawal", "uil:money-stack"],
  },
]);
const testimonials = ref([
  {
    name: "Alifieya P. N.",
    text: "Hasilnya bagus banget, sumpah aku juga ga expect bakal mudah banget buat reservasi.",
    avatar: "F",
  },
  {
    name: "Riska A. P.",
    text: "Jadi bisa ngambil sisi-sisi aku yang fotogenik.",
    avatar: "R",
  },
  {
    name: "M. Atthaariq M.",
    text: "Dilayanin dengan baik sampe detail-detail kecilnya, suka banget sama foto & video yang diambil.",
    avatar: "A",
  },
]);

import {
  getCoveredRegions,
  getComingSoonRegions,
  type EastJavaRegion,
} from "~/data/eastJavaRegions";

const eastJavaRegions = ref<EastJavaRegion[]>([
  ...getCoveredRegions(),
  ...getComingSoonRegions(),
]);

const hoveredRegion = ref<EastJavaRegion | null>(null);
const selectedRegion = ref<EastJavaRegion | null>(null);

// Map zoom and pan state
const minZoomLevel = ref(1);
const zoomLevel = ref(1);
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);
const lastPanPoint = reactive({ x: 0, y: 0 });

// Map refs
const mapContainer = ref(null);
const mapContent = ref(null);

// Calculate minimum zoom level to fill container width
const calculateMinZoom = () => {
  const container = mapContainer.value as HTMLElement | null;
  if (container) {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // SVG viewBox dimensions: 497.320907 x 345.6
    const mapAspectRatio = 497.320907 / 345.6; // ~1.439
    const containerAspectRatio = containerWidth / containerHeight;
    
    if (containerAspectRatio > mapAspectRatio) {
      // Container is wider than map - need to zoom to fill width
      minZoomLevel.value = containerWidth / (containerHeight * mapAspectRatio);
    } else {
      // Container is taller than map - map already fills width at 1x
      minZoomLevel.value = 1;
    }
    
    // Set initial zoom to minimum
    if (zoomLevel.value < minZoomLevel.value) {
      zoomLevel.value = minZoomLevel.value;
    }
  }
};

// Map interaction methods - simplified, allow free panning
const constrainPan = () => {
  // Allow free panning - no constraints
  // Background color will hide transparent areas
};

const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(zoomLevel.value + 0.25, 3);
  }
};

const zoomOut = () => {
  if (zoomLevel.value > minZoomLevel.value) {
    zoomLevel.value = Math.max(zoomLevel.value - 0.25, minZoomLevel.value);
  }
};

const resetZoom = () => {
  zoomLevel.value = minZoomLevel.value;
  panX.value = 0;
  panY.value = 0;
};

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const delta = -event.deltaY * 0.001;
  const newZoom = Math.max(minZoomLevel.value, Math.min(3, zoomLevel.value + delta));
  zoomLevel.value = newZoom;
};

const startPan = (event: MouseEvent) => {
  isPanning.value = true;
  lastPanPoint.x = event.clientX;
  lastPanPoint.y = event.clientY;
  event.preventDefault();
};

const handlePan = (event: MouseEvent) => {
  if (isPanning.value) {
    const deltaX = event.clientX - lastPanPoint.x;
    const deltaY = event.clientY - lastPanPoint.y;

    // Simple free panning - no constraints
    panX.value += deltaX;
    panY.value += deltaY;

    lastPanPoint.x = event.clientX;
    lastPanPoint.y = event.clientY;
    event.preventDefault();
  }
};

const endPan = () => {
  isPanning.value = false;
};

const setHoveredRegion = (region: EastJavaRegion) => {
  hoveredRegion.value = region;
};

const clearHoveredRegion = () => {
  hoveredRegion.value = null;
};

const selectRegion = (region: EastJavaRegion, event: MouseEvent) => {
  // Prevent pan from triggering when clicking on region
  event.stopPropagation();
  
  // Toggle selection - if clicking the same region, deselect it
  if (selectedRegion.value?.id === region.id) {
    selectedRegion.value = null;
  } else {
    selectedRegion.value = region;
  }
};

// Initialize map zoom when component mounts
onMounted(() => {
  nextTick(() => {
    calculateMinZoom();
  });
  
  // Recalculate on window resize
  window.addEventListener('resize', calculateMinZoom);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateMinZoom);
});

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
  <div class="flex flex-col w-full bg-color-alternating">
    <div class="flex flex-col m-8 gap-uniform-4" id="hero">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex flex-col items-center md:items-start">
          <p class="heading-1 main-tagline text-color-alternating">
            Abadikan Hari Ini
          </p>
          <p class="heading-1 main-tagline text-color-alternating">
            Ceritakan Selamanya
          </p>
          <p
            class="heading-4 mt-6 text-color-alternating text-center md:text-start sub-tagline"
          >
            Kami foto dan rekam momenmu tanpa ribet
          </p>
          <div class="flex flex-col sm:flex-row gap-uniform-4 mt-6 lg:mt-12">
            <Button>
              <NuxtLink
                to="/reservation"
                class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
              >
                <p>Reservasi Sekarang</p>
                <Icon name="uil:arrow-up-right" class="icon-size-4" />
              </NuxtLink>
            </Button>
            <Button
              pt:root:class="!bg-[#F5F2EB] !border-[#1F1F1F] !rounded-full !px-3 !py-[0.375rem] hover:!bg-[#D9D491] dark:!bg-[#1F1F1F] dark:!border-[#F5F2EB] dark:hover:!bg-[#2E2E2E] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem]"
            >
              <NuxtLink
                to="/calculator"
                class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-color-alternating font-semibold"
              >
                <p>Hitung Harga</p>
                <Icon name="uil:arrow-up-right" class="icon-size-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
      <div class="w-full mt-8">
        <div class="image-container">
          <img
            src="/images/blue_beach.png"
            alt="Blue Beach"
            class="main-image"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="gallery">
      <div class="flex flex-col gap-uniform-1">
        <p class="heading-1 text-color-alternating">
          Cerita yang Telah Kami Abadikan
        </p>
        <p>
          Kumpulan momen spesial dari berbagai perjalanan yang pernah kami
          tangkap. Dari kisah cinta, kelahiran, hingga momen penuh semangat.
          Inilah jejak visual yang kami banggakan.
        </p>
        <SelectButton
          v-model="selectedCategory"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          :pt="{
            root: {
              class:
                'flex flex-wrap !rounded-3xl border border-color-alternating-inverted [&>button]:!px-4 [&>button]:!py-2 [&>button]:!rounded-3xl [&>button]:!border-0 [&>button]:!bg-color-alternating [&>button]:!text-color-alternating [&>button]:!paragraph-3 [&>button]:!font-semibold [&>button]:!transition-colors [&>button]:!duration-200 [&>button.p-highlight]:!bg-transparent [&>button.p-highlight]:!text-color-alternating [&>button.p-togglebutton-checked]:!bg-transparent [&>button.p-togglebutton-checked]:!text-color-alternating [&>button.p-togglebutton-checked>.p-togglebutton-content]:!bg-[#E3FE01] [&>button.p-togglebutton-checked>.p-togglebutton-content]:!text-[#1F1F1F] [&>button.p-togglebutton-checked>.p-togglebutton-content]:!shadow-none [&>button[data-p-active=true]]:!bg-transparent [&>button[data-p-active=true]]:!text-color-alternating [&>button:hover:not(.p-highlight)]:!bg-[#EDEEBB] [&>button:hover:not(.p-highlight)]:dark:!bg-[#2E2E2E]',
            },
            pcToggleButton: {
              content: '!rounded-full',
            },
          }"
        />

        <Carousel
          :value="filteredImages"
          :numVisible="carouselVisible"
          :numScroll="carouselScroll"
          :orientation="carouselOrientation"
          class="mt-8"
        >
          <template #item="{ data }">
            <img :src="data.src" :alt="data.alt" />
          </template>
        </Carousel>
      </div>
      <div class="flex justify-end">
        <Button>
          <NuxtLink
            to="/gallery"
            class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
          >
            <p>Lihat Galeri Portfolio Lengkap</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div
      class="flex flex-col margin-uniform-4 gap-uniform-4"
      id="reservation-steps"
    >
      <div class="flex flex-col gap-uniform-1 text-center">
        <p class="paragraph-2">
          Suka sama hasilnya? Booking-nya juga gampang kok, cuma 5 langkah!
        </p>
        <p class="heading-1 text-color-alternating">Cara Reservasi</p>
      </div>

      <!-- Steps Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-uniform-4"
      >
        <div
          v-for="(step, index) in reservationSteps"
          :key="index"
          class="flex flex-col items-center text-center gap-uniform-4 px-8"
        >
          <!-- Icon with Number -->
          <div class="relative">
            <div
              class="flex items-center justify-center w-20 h-20 border-2 border-color-alternating-inverted rounded-2xl bg-color-alternating p-4"
            >
              <Icon
                :name="step.icon"
                class="w-10 h-10 text-color-alternating"
              />
            </div>
            <!-- Number Badge -->
            <div
              class="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-[#E3FE01] border-2 border-[#1F1F1F] rounded-full font-bold text-sm text-[#1F1F1F]"
            >
              {{ step.number }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1">
            <h3 class="heading-6 font-bold text-color-alternating">
              {{ step.title }}
            </h3>
            <p class="paragraph-4 text-color-alternating">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Call to Action Button -->
      <div class="flex justify-center mt-8">
        <Button>
          <NuxtLink
            to="/reservation"
            class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
          >
            <p>Mulai Reservasi</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="calculate-and-consult">
      <div class="flex flex-col gap-uniform-4">
        <p class="heading-1 text-color-alternating">Mulai Abadikan Momenmu</p>
        <p class="paragraph-4">
          Dapatkan estimasi harga yang akurat, atau konsultasikan langsung
          dengan tim profesional kami.
        </p>
      </div>

      <!-- Calculator and Consult Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-uniform-4">
        <!-- Calculator -->
        <div
          class="flex flex-col gap-uniform-4 p-6 border-2 border-[#1F1F1F] rounded-3xl transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <div class="flex items-center gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
            >
              <Icon name="uil:calculator" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <h3 class="heading-4 font-bold text-color-alternating">
              Kalkulator Harga
            </h3>
          </div>

          <div class="flex gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 border-2 border-color-alternating-inverted rounded-full shrink-0"
            >
              <Icon name="uil:clock" class="w-6 h-6 text-color-alternating" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="paragraph-4 text-color-alternating font-medium">
                Estimasi dalam 2 menit
              </p>
              <div class="space-y-1">
                <p class="paragraph-4 text-color-alternating">
                  1. Pilih jenis layanan
                </p>
                <p class="paragraph-4 text-color-alternating">
                  2. Tentukan lokasi
                </p>
                <p class="paragraph-4 text-color-alternating">
                  3. Dapatkan harga transparan
                </p>
              </div>
            </div>
          </div>

          <Button>
            <NuxtLink
              to="/calculator"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
            >
              <p>Hitung Harga</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Consult -->
        <div
          class="flex flex-col gap-uniform-4 p-6 border-2 border-[#1F1F1F] rounded-3xl transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <div class="flex items-center gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
            >
              <Icon name="uil:comments" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <h3 class="heading-4 font-bold text-color-alternating">
              Konsultasi Langsung
            </h3>
          </div>

          <div class="flex gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 border-2 border-color-alternating-inverted rounded-full shrink-0"
            >
              <Icon name="uil:phone" class="w-6 h-6 text-color-alternating" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="paragraph-4 text-color-alternating font-medium">
                Respon cepat dalam 15-30 menit
              </p>
              <div class="space-y-1">
                <p class="paragraph-4 text-color-alternating">
                  - Konsultasi gratis
                </p>
                <p class="paragraph-4 text-color-alternating">
                  - Saran profesional
                </p>
                <p class="paragraph-4 text-color-alternating">
                  - Paket custom sesuai budget
                </p>
              </div>
            </div>
          </div>

          <Button
            pt:root:class="!bg-[#F5F2EB] !border-[#1F1F1F] !rounded-full !px-3 !py-[0.375rem] hover:!bg-[#D9D491] dark:!bg-[#1F1F1F] dark:!border-[#F5F2EB] dark:hover:!bg-[#2E2E2E] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem]"
          >
            <a
              href="https://wa.me/your-whatsapp-number"
              target="_blank"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-color-alternating font-semibold"
            >
              <p>Hubungi Kami</p>
              <Icon name="uil:whatsapp" class="icon-size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>

    <!-- Interactive East Java Map Section -->
    <div class="flex flex-col m-8 gap-uniform-4" id="service-areas">
      <div class="flex flex-col gap-uniform-1 text-center">
        <p class="heading-1 text-color-alternating">Area Layanan Kami</p>
        <p class="paragraph-4">
          Klik pada wilayah untuk melihat detail layanan di area tersebut
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-uniform-4 items-center lg:items-start">
        <!-- Map Container -->
        <div class="flex-1 relative">
          <div
            class="bg-color-alternating border-2 border-color-alternating-inverted rounded-3xl p-8"
          >
            <!-- Background East Java Map -->
            <div
              class="relative overflow-hidden rounded-2xl h-80 md:h-96 xl:aspect-[2/1] xl:h-auto bg-[#212830]"
              ref="mapContainer"
              @wheel="handleWheel"
            >
              <!-- Zoom Controls -->
              <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  @click="zoomIn"
                  class="w-10 h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon name="uil:plus" class="w-5 h-5 text-gray-700" />
                </button>
                <button
                  @click="zoomOut"
                  class="w-10 h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon name="uil:minus" class="w-5 h-5 text-gray-700" />
                </button>
                <button
                  @click="resetZoom"
                  class="w-10 h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon
                    name="uil:expand-arrows-alt"
                    class="w-5 h-5 text-gray-700"
                  />
                </button>
              </div>

              <div
                ref="mapContent"
                class="transition-transform duration-300 origin-center cursor-grab active:cursor-grabbing w-full h-full"
                :style="{
                  transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                }"
                @mousedown="startPan"
                @mousemove="handlePan"
                @mouseup="endPan"
                @mouseleave="endPan"
              >
                <!-- Combined SVG with background and interactive overlay -->
                <svg
                  viewBox="0 0 497.320907 345.6"
                  class="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <!-- Background map -->
                  <image
                    href="/svgs/id-ji.min.svg"
                    x="0"
                    y="0"
                    width="497.320907"
                    height="345.6"
                    opacity="1"
                  />
                  <!-- Dynamic Interactive Regions -->
                  <template v-for="region in eastJavaRegions" :key="region.id">
                    <!-- Regions with SVG paths -->
                    <path
                      v-if="region.svgPath"
                      :id="'region-' + region.id"
                      :d="region.svgPath"
                      :class="{
                        'fill-[#E3FE01] stroke-[#1F1F1F]':
                          selectedRegion?.id === region.id,
                        'fill-[#F5F2EB] stroke-[#1F1F1F] hover:fill-[#E3FE01]':
                          selectedRegion?.id !== region.id &&
                          region.status === 'covered',
                        'fill-gray-200 stroke-gray-400 hover:fill-gray-300':
                          selectedRegion?.id !== region.id &&
                          region.status === 'coming_soon',
                        'opacity-60': region.status === 'coming_soon',
                        'opacity-90': region.status === 'covered',
                        'stroke-1 cursor-pointer transition-all duration-200': true,
                      }"
                      @click="selectRegion(region, $event)"
                    />

                    <!-- Regions without SVG paths (fallback to circle) -->
                    <circle
                      v-if="!region.svgPath && region.labelPosition"
                      :id="'region-' + region.id"
                      :cx="region.labelPosition.x"
                      :cy="region.labelPosition.y"
                      r="15"
                      :class="{
                        'fill-[#E3FE01] stroke-[#1F1F1F]':
                          selectedRegion?.id === region.id,
                        'fill-[#F5F2EB] stroke-[#1F1F1F] hover:fill-[#E3FE01]':
                          selectedRegion?.id !== region.id &&
                          region.status === 'covered',
                        'fill-gray-200 stroke-gray-400 hover:fill-gray-300':
                          selectedRegion?.id !== region.id &&
                          region.status === 'coming_soon',
                        'opacity-60': region.status === 'coming_soon',
                        'opacity-90': region.status === 'covered',
                        'stroke-2 cursor-pointer transition-all duration-200': true,
                      }"
                      @click="selectRegion(region, $event)"
                    />

                    <!-- Region labels -->
                    <!-- <text
                    v-if="region.labelPosition"
                    :x="region.labelPosition.x"
                    :y="region.labelPosition.y + 5"
                    :class="
                      region.status === 'coming_soon'
                        ? 'fill-gray-600'
                        : 'fill-[#1F1F1F]'
                    "
                    class="text-xs font-bold pointer-events-none"
                    text-anchor="middle"
                  >
                    {{
                      region.name
                        .replace("Kab. ", "")
                        .replace("Kota ", "")
                        .replace(" (Kab. + Kota)", "")
                    }}
                  </text> -->
                  </template>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Panel -->
        <div class="lg:w-80">
          <div
            class="bg-color-alternating border-2 border-color-alternating-inverted rounded-3xl p-6"
          >
            <div v-if="selectedRegion" class="flex flex-col gap-uniform-4">
              <div class="flex items-center gap-uniform-2">
                <div
                  class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
                >
                  <Icon name="uil:map-marker" class="w-6 h-6 text-[#1F1F1F]" />
                </div>
                <div>
                  <h3 class="heading-4 font-bold text-color-alternating">
                    {{ selectedRegion.name }}
                  </h3>
                  <p
                    class="paragraph-4"
                    :class="{
                      'text-green-600': selectedRegion.status === 'covered',
                      'text-orange-600': selectedRegion.status === 'coming_soon',
                    }"
                  >
                    {{
                      selectedRegion.status === "covered"
                        ? "Tersedia"
                        : "Segera Hadir"
                    }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center gap-uniform-2">
                  <Icon
                    name="uil:users-alt"
                    class="w-4 h-4 text-color-alternating"
                  />
                  <p class="paragraph-4 text-color-alternating">
                    {{ selectedRegion.photographers }}
                  </p>
                </div>
                <div class="flex items-center gap-uniform-2">
                  <Icon
                    name="uil:clock"
                    class="w-4 h-4 text-color-alternating"
                  />
                  <p class="paragraph-4 text-color-alternating">
                    Respon: {{ selectedRegion.response }}
                  </p>
                </div>
                <div
                  v-if="selectedRegion.popular"
                  class="flex items-center gap-uniform-2"
                >
                  <Icon name="uil:star" class="w-4 h-4 text-yellow-500" />
                  <p class="paragraph-4 text-color-alternating">Area Populer</p>
                </div>
              </div>

              <Button v-if="selectedRegion.status === 'covered'">
                <NuxtLink
                  to="/reservation"
                  class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
                >
                  <p>Reservasi di {{ selectedRegion.name }}</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>
            </div>

            <div v-else class="text-center py-8">
              <Icon
                name="uil:map"
                class="w-16 h-16 text-color-alternating mx-auto mb-4"
              />
              <p class="heading-5 text-color-alternating mb-2">
                Jelajahi Area Layanan
              </p>
              <p class="paragraph-4 text-color-alternating">
                Klik pada peta untuk melihat detail layanan di setiap wilayah
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col m-8 gap-uniform-4" id="why-us">
      <div class="flex flex-col gap-uniform-1">
        <p class="heading-1 text-color-alternating">
          Kenapa Mending Pake Memomancy
        </p>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-uniform-0 bg-color-alternating-inverted padding-uniform-4 rounded-[3rem]"
      >
        <div
          class="flex flex-col gap-uniform-4 text-color-alternating-inverted items-center text-center"
          v-for="(item, index) in whyUs"
          :key="index"
        >
          <div class="flex gap-uniform-1">
            <Icon :name="item.icons[1]" class="icon-size-1" />
          </div>
          <p class="heading-5 text-color-alternating-inverted">
            {{ item.title }}
          </p>
          <p class="paragraph-4">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="testimonials">
      <div class="flex flex-col gap-uniform-1">
        <p class="paragraph-2">Buat finishing, bisa dilihat</p>
        <p class="heading-1 text-color-alternating">
          Testimoni Pelanggan Memomancy
        </p>
      </div>
      <div class="w-full overflow-hidden">
        <div
          class="flex w-max gap-uniform-4 animate-infinite-loop-scroll-horizontal ease-in-out"
        >
          <div
            class="flex flex-col max-w-[240px] lg:max-w-[360px] xl:max-w-[480px] justify-between gap-uniform-4 text-color-alternating border border-color-alternating-inverted p-8 rounded-[3rem] min-w-[300px]"
            v-for="(testimonial, index) in [...testimonials, ...testimonials]"
            :key="index"
          >
            <p class="paragraph-3">{{ testimonial.text }}</p>
            <div class="flex gap-uniform-4 items-center">
              <Avatar
                :label="testimonial.avatar"
                class="w-8 h-8 rounded-full border border-color-alternating-inverted"
                shape="circle"
                size="large"
              />
              <p class="heading-6 text-color-alternating">
                {{ testimonial.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="call-to-action">
      <div class="w-full">
        <div class="relative image-container">
          <img
            src="/images/blue_beach.png"
            alt="Blue Beach"
            class="w-full h-auto main-image"
          />
          <div class="absolute inset-0 bg-black/60 rounded-[3rem]" />

          <div
            class="absolute inset-0 flex flex-col gap-uniform-0 items-center justify-center"
          >
            <div
              class="flex flex-col gap-uniform-7 text-center text-[#F5F2EB] heading-4"
            >
              <p>Udah liat galerinya kan?</p>
              <p>Sekarang giliranmu nyumbang momenmu ke dalamnya.</p>
            </div>
            <div class="flex flex-col md:flex-row gap-uniform-4">
              <Button>
                <NuxtLink
                  to="/reservation"
                  class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-[#1F1F1F] font-semibold"
                >
                  <p>Reservasi Sekarang</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>
              <Button
                pt:root:class="!bg-[#F5F2EB] dark:!bg-[#1F1F1F] dark:hover:!bg-[#2E2E2E] !border-0 !rounded-full !px-3 !py-[0.375rem] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem] hover:!bg-[#D9D491]"
              >
                <NuxtLink
                  to="/calculator"
                  class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 text-color-alternating font-semibold"
                >
                  <p>Hitung Harga</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
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
  @apply w-full text-center font-system font-bold leading-tight;
  @apply sm:w-auto sm:text-start;
  @apply md:text-nowrap;
  font-size: clamp(1.5rem, 8vw, 12rem);
}
.sub-tagline {
  @apply mt-6 text-center text-xs font-han;
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
  @apply w-full aspect-[2/3] sm:aspect-[2/3] md:aspect-[2/1] lg:aspect-[2/1] xl:aspect-[3/1];
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
