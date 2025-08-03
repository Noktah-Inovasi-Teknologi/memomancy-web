<script lang="ts" setup>
import {
  getCoveredRegions,
  getComingSoonRegions,
} from "~/data/eastJavaRegions";
import {
  phoneNumber,
  phoneLink,
  whatsappLink,
  emailAddress,
  emailLink,
  instagramName,
  instagramLink,
  tiktokName,
  tiktokLink,
  facebookName,
  facebookLink,
  youtubeName,
  youtubeLink,
  socialMediaStats,
} from "~/data/commonInformations";
import type {
  EastJavaRegion,
  GalleryImage,
  ContactMethod,
  ReservationStep,
  WhyUsItem,
} from "~/types";

// Media URLs and references
const videoUrl = ref<string | null>(null);
const imageUrl = ref<string | null>(null);
const video_thumbnail = ref<Blob | null>(null);
const image_thumbnail = ref<Blob | null>(null);

// Contact information
const contactMethods = ref<ContactMethod[]>([
  {
    icon: "uil:whatsapp",
    title: "WhatsApp",
    subtitle: "Respon Paling Cepat",
    contact: phoneNumber,
    buttonText: "Chat Sekarang",
    href: whatsappLink,
  },
  {
    icon: "uil:phone",
    title: "Telepon",
    subtitle: "Obrolan Langsung",
    contact: phoneNumber,
    buttonText: "Telepon Sekarang",
    href: phoneLink,
  },
  {
    icon: "uil:envelope",
    title: "Email",
    subtitle: "Pesanan Secara Detail",
    contact: emailAddress,
    buttonText: "Kirim Email",
    href: emailLink,
  },
]);

// Reservation process
const reservationSteps = ref<ReservationStep[]>([
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

// Category filtering
const selectedCategory = ref("life-stories");
const categoryOptions = [
  { label: "Life Stories & Celebrations", value: "life-stories" },
  { label: "Love & Union", value: "love-union" },
  { label: "Sport", value: "sport" },
  { label: "Event", value: "event" },
];

const categoryImages: Record<string, GalleryImage[]> = {
  "life-stories": [
    {
      src: "/images/x2.png",
      alt: "Life story image",
      title: "Maternity Photoshoot",
      location: "Surabaya",
      serviceType: "Photography",
      date: "15 Jan 2024",
    },
    {
      src: "/images/x7.png",
      alt: "Life story image",
      title: "Family Portrait",
      location: "Gresik",
      serviceType: "Photography",
      date: "28 Dec 2023",
    },
    {
      src: "/images/x11.png",
      alt: "Life story image",
      title: "Birthday Celebration",
      location: "Sidoarjo",
      serviceType: "Photo & Video",
      date: "05 Feb 2024",
    },
  ],
  "love-union": [
    {
      src: "/images/x10.png",
      alt: "Love union image",
      title: "Pre-Wedding Session",
      location: "Surabaya",
      serviceType: "Photography",
      date: "12 Feb 2024",
    },
    {
      src: "/images/x3.png",
      alt: "Love union image",
      title: "Wedding Ceremony",
      location: "Madura",
      serviceType: "Photo & Video",
      date: "20 Jan 2024",
    },
    {
      src: "/images/x13.png",
      alt: "Love union image",
      title: "Engagement Photos",
      location: "Gresik",
      serviceType: "Photography",
      date: "08 Mar 2024",
    },
  ],
  sport: [
    {
      src: "/images/x5.png",
      alt: "Sport image",
      title: "Football Tournament",
      location: "Surabaya",
      serviceType: "Videography",
      date: "03 Feb 2024",
    },
    {
      src: "/images/x8.png",
      alt: "Sport image",
      title: "Basketball Match",
      location: "Sidoarjo",
      serviceType: "Photo & Video",
      date: "18 Jan 2024",
    },
    {
      src: "/images/x12.png",
      alt: "Sport image",
      title: "Marathon Event",
      location: "Gresik",
      serviceType: "Photography",
      date: "25 Feb 2024",
    },
  ],
  event: [
    {
      src: "/images/x1.png",
      alt: "Event image",
      title: "Corporate Event",
      location: "Surabaya",
      serviceType: "Photo & Video",
      date: "10 Mar 2024",
    },
    {
      src: "/images/x6.png",
      alt: "Event image",
      title: "Product Launch",
      location: "Gresik",
      serviceType: "Videography",
      date: "22 Feb 2024",
    },
    {
      src: "/images/x9.png",
      alt: "Event image",
      title: "Conference",
      location: "Sidoarjo",
      serviceType: "Photography",
      date: "14 Mar 2024",
    },
  ],
};

// Company information
const whyUs = ref<WhyUsItem[]>([
  {
    title: "Kualitas Konsisten & Profesional",
    description:
      "Pernah kecewa sama hasil foto yang ga sesuai ekspektasi? Di Memomancy, setiap sesi dijamin hasilnya berkualitas tinggi dan konsisten. Tim profesional kami pakai standar yang sama di setiap project!",
    icons: ["uil:camera", "uil:check-circle", "uil:star"],
  },
  {
    title: "Super Fleksibel, Apapun Bisa!",
    description:
      "Mau tambah kru? Boleh! Butuh multiple angle? Siap! Pengen edit video dengan narasi? Gas terus! Semua request kamu bisa kita wujudkan sesuai budget dan kebutuhan.",
    icons: ["uil:setting", "uil:edit-alt", "uil:icons"],
  },
  {
    title: "Coverage Area Luas",
    description:
      "Dari Surabaya sampai ujung Madura, tim Memomancy siap datang ke lokasimu! Udah beroperasi di Surabaya, Gresik, Sidoarjo, dan seluruh wilayah Madura dengan response time yang cepat.",
    icons: ["uil:map-marker", "uil:location-arrow", "uil:home"],
  },
  {
    title: "Harga Terjangkau, Kualitas Premium",
    description:
      "Siapa bilang foto profesional harus mahal? Memomancy hadir dengan harga yang ramah di kantong tanpa mengorbankan kualitas. Karena setiap orang berhak punya kenangan yang indah!",
    icons: ["uil:money-bill", "uil:money-withdrawal", "uil:money-stack"],
  },
]);

// Map functionality
const eastJavaRegions = ref<EastJavaRegion[]>([
  ...getCoveredRegions(),
  ...getComingSoonRegions(),
]);

const selectedRegion = ref<EastJavaRegion | null>(null);

// Map zoom and pan state
const minZoomLevel = ref(1);
const zoomLevel = ref(1);
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);
const lastPanPoint = reactive({ x: 0, y: 0 });

// Map refs
const mapContainer = ref<HTMLElement | null>(null);
const mapContent = ref<HTMLElement | null>(null);

// Computed properties
const filteredImages = computed(() => {
  return categoryImages[selectedCategory.value] || [];
});

// Media blob handlers
const handleVideoBlob = (blob: Blob) => {
  if (videoUrl.value) {
    URL.revokeObjectURL(videoUrl.value);
  }
  videoUrl.value = URL.createObjectURL(blob);
};

const handleImageBlob = (blob: Blob) => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
  imageUrl.value = URL.createObjectURL(blob);
};

// Map utility functions
const calculateMinZoom = () => {
  const container = mapContainer.value;
  if (container) {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const mapAspectRatio = 497.320907 / 345.6;
    const containerAspectRatio = containerWidth / containerHeight;

    if (containerAspectRatio > mapAspectRatio) {
      minZoomLevel.value = containerWidth / (containerHeight * mapAspectRatio);
    } else {
      minZoomLevel.value = 1;
    }

    if (zoomLevel.value < minZoomLevel.value) {
      zoomLevel.value = minZoomLevel.value;
    }
  }
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

// Map event handlers
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const delta = -event.deltaY * 0.001;
  const newZoom = Math.max(
    minZoomLevel.value,
    Math.min(3, zoomLevel.value + delta)
  );
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

const selectRegion = (region: EastJavaRegion, event: MouseEvent) => {
  event.stopPropagation();

  if (selectedRegion.value?.id === region.id) {
    selectedRegion.value = null;
  } else {
    selectedRegion.value = region;
  }
};

// Lifecycle hooks
onBeforeMount(async () => {
  // Only load media on client side
  if (!import.meta.client) return;

  try {
    image_thumbnail.value = await $fetch(`/api/media`, {
      query: {
        id: "images/image_thumbnail.jpg",
      },
    });
    if (image_thumbnail.value) {
      handleImageBlob(image_thumbnail.value);
    }
  } catch (error) {
    imageUrl.value = null;
  }
});

onMounted(async () => {
  nextTick(() => {
    calculateMinZoom();
  });

  window.addEventListener("resize", calculateMinZoom);

  // Only load media on client side
  if (!import.meta.client) return;

  try {
    video_thumbnail.value = await $fetch(`/api/media`, {
      query: {
        id: "videos/video_thumbnail.mp4",
      },
    });
    if (video_thumbnail.value) {
      handleVideoBlob(video_thumbnail.value);
    }
  } catch (error) {
    videoUrl.value = null;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateMinZoom);

  if (videoUrl.value) {
    URL.revokeObjectURL(videoUrl.value);
  }
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
});
</script>

<template>
  <div class="flex flex-col w-full bg-color-alternating">
    <div class="flex flex-col m-8 gap-uniform-4" id="hero">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="w-full flex flex-col items-center">
          <p class="w-auto heading-1 main-tagline text-color-alternating">
            Abadikan Hari Ini
          </p>
          <p class="w-auto heading-1 main-tagline text-color-alternating">
            Ceritakan Selamanya
          </p>
          <p class="text-color-alternating sub-tagline">
            Kami foto dan rekam momenmu gapake ribet
          </p>
          <div class="flex flex-col sm:flex-row gap-uniform-4 mt-6 lg:mt-12">
            <Button severity="contrast">
              <NuxtLink
                to="/reservation"
                class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
              >
                <p>Reservasi Sekarang</p>
                <Icon name="uil:arrow-up-right" class="icon-size-4" />
              </NuxtLink>
            </Button>
            <Button severity="primary">
              <NuxtLink
                to="/calculator"
                class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
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
          <video
            :src="videoUrl"
            autoplay
            muted
            loop
            playsinline
            class="main-image"
            v-if="videoUrl"
          />
          <img
            :src="imageUrl"
            alt="Video thumbnail"
            class="main-image"
            v-else-if="imageUrl"
          />
          <div
            v-else
            class="main-image bg-gray-300 dark:bg-gray-600 animate-pulse"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="gallery">
      <div class="flex flex-col gap-uniform-8 text-center">
        <p class="heading-1 text-color-alternating">
          Cerita yang Udah Kami Abadikan
        </p>
        <p class="paragraph-2">
          Kumpulan momen spesial dari berbagai perjalanan yang pernah kami
          tangkap. Dari kisah cinta, kelahiran, hingga momen penuh semangat.
          Inilah jejak visual yang kami banggakan.
        </p>
      </div>
      <SelectButton
        v-model="selectedCategory"
        :options="categoryOptions"
        optionLabel="label"
        optionValue="value"
        :pt="{
          pcToggleButton: {
            content: '!rounded-full',
          },
        }"
      />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-uniform-4 mt-8">
        <div
          v-for="(item, index) in filteredImages.slice(0, 3)"
          :key="index"
          class="flex flex-col gap-uniform-4 p-4 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:shadow-lg gallery-item"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="w-full aspect-square object-cover rounded-2xl"
          />
          <div class="flex flex-col gap-uniform-8">
            <h3 class="heading-5 font-bold text-color-alternating">
              {{ item.title }}
            </h3>
            <div
              class="flex flex-col lg:flex-row lg:justify-between gap-1 lg:gap-2"
            >
              <div class="flex items-center gap-2">
                <Icon
                  name="uil:map-marker"
                  class="w-4 h-4 text-color-alternating"
                />
                <p class="paragraph-4 text-color-alternating">
                  {{ item.location }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <Icon
                  name="uil:camera"
                  class="w-4 h-4 text-color-alternating"
                />
                <p class="paragraph-4 text-color-alternating">
                  {{ item.serviceType }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <Icon
                  name="uil:calendar-alt"
                  class="w-4 h-4 text-color-alternating"
                />
                <p class="paragraph-4 text-color-alternating">
                  {{ item.date }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <Button severity="contrast">
          <NuxtLink
            to="/gallery"
            class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
          >
            <p>Lihat Galeri Portfolio Lengkap</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="reservation-steps">
      <div class="flex flex-col gap-uniform-8 text-center">
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
              class="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm"
              style="
                background: var(--memomancy-primary);
                border: 2px solid var(--memomancy-dark);
                color: var(--memomancy-dark);
              "
            >
              {{ step.number }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-1">
            <h3 class="heading-4 font-bold text-color-alternating">
              {{ step.title }}
            </h3>
            <p class="paragraph-3 text-color-alternating">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
      <!-- Call to Action Button -->
      <div class="flex justify-center">
        <Button severity="contrast">
          <NuxtLink
            to="/reservation"
            class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
          >
            <p>Mulai Reservasi</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="calculate-and-consult">
      <div class="flex flex-col gap-uniform-8 text-center">
        <p class="heading-1 text-color-alternating">Mulai Abadikan Momenmu</p>
        <p class="paragraph-2">
          Dapatkan estimasi harga yang akurat, atau konsultasikan langsung
          dengan tim profesional kami.
        </p>
      </div>
      <!-- Calculator and Consult Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-uniform-4">
        <!-- Calculator -->
        <div
          class="flex flex-col gap-uniform-4 p-8 border-2 border-[#E3FE01] rounded-3xl bg-gradient-to-br from-[#F5F2EB] to-[#EDEEBB] shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#EDEEBB] hover:-translate-y-1"
        >
          <div class="flex items-center gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
            >
              <Icon name="uil:calculator" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <h3 class="heading-4 font-bold text-[#1F1F1F]">Kalkulator Harga</h3>
          </div>

          <div class="flex gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 border-2 border-[#1F1F1F] rounded-full shrink-0"
            >
              <Icon name="uil:clock" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="paragraph-4 text-[#1F1F1F] font-medium">
                Estimasi dalam 2 menit
              </p>
              <div class="space-y-1">
                <p class="paragraph-4 text-[#1F1F1F]">1. Pilih jenis layanan</p>
                <p class="paragraph-4 text-[#1F1F1F]">2. Tentukan lokasi</p>
                <p class="paragraph-4 text-[#1F1F1F]">
                  3. Dapatkan harga transparan
                </p>
              </div>
            </div>
          </div>

          <Button severity="contrast">
            <NuxtLink
              to="/calculator"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
            >
              <p>Hitung Harga</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>
        </div>

        <!-- Consult -->
        <div
          class="flex flex-col gap-uniform-4 p-8 border-2 border-[#E3FE01] rounded-3xl bg-gradient-to-br from-[#F5F2EB] to-[#EDEEBB] shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#EDEEBB] hover:-translate-y-1"
        >
          <div class="flex items-center gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
            >
              <Icon name="uil:comments" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <h3 class="heading-4 font-bold text-[#1F1F1F]">
              Konsultasi Langsung
            </h3>
          </div>

          <div class="flex gap-uniform-2">
            <div
              class="flex items-center justify-center w-12 h-12 border-2 border-[#1F1F1F] rounded-full shrink-0"
            >
              <Icon name="uil:phone" class="w-6 h-6 text-[#1F1F1F]" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="paragraph-3 text-[#1F1F1F] font-medium">
                Respon cepat dalam 15-30 menit
              </p>
              <div class="space-y-1">
                <p class="paragraph-3 text-[#1F1F1F]">- Konsultasi gratis</p>
                <p class="paragraph-3 text-[#1F1F1F]">- Saran profesional</p>
                <p class="paragraph-3 text-[#1F1F1F]">
                  - Paket custom sesuai budget
                </p>
              </div>
            </div>
          </div>

          <Button severity="primary">
            <a
              :href="whatsappLink"
              target="_blank"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 font-semibold"
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
      <div class="flex flex-col gap-uniform-8 text-center">
        <p class="heading-1 text-color-alternating">Area Layanan Kami</p>
        <p class="paragraph-2">
          Klik pada wilayah untuk melihat detail layanan di area tersebut
        </p>
      </div>
      <div
        class="flex flex-col lg:flex-row gap-uniform-4 items-center lg:items-start"
      >
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
        <div>
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
                    class="paragraph-3"
                    :class="{
                      'text-green-600': selectedRegion.status === 'covered',
                      'text-orange-600':
                        selectedRegion.status === 'coming_soon',
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
                  <p class="paragraph-3 text-color-alternating">
                    {{ selectedRegion.photographers }}
                  </p>
                </div>
                <div class="flex items-center gap-uniform-2">
                  <Icon
                    name="uil:clock"
                    class="w-4 h-4 text-color-alternating"
                  />
                  <p class="paragraph-3 text-color-alternating">
                    Respon: {{ selectedRegion.response }}
                  </p>
                </div>
                <div
                  v-if="selectedRegion.popular"
                  class="flex items-center gap-uniform-2"
                >
                  <Icon name="uil:star" class="w-4 h-4 text-yellow-500" />
                  <p class="paragraph-3 text-color-alternating">Area Populer</p>
                </div>
              </div>

              <Button v-if="selectedRegion.status === 'covered'">
                <NuxtLink
                  to="/reservation"
                  class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 text-[#1F1F1F] font-semibold"
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
              <p class="paragraph-3 text-color-alternating">
                Klik pada peta untuk melihat detail layanan di setiap wilayah
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-uniform-4 p-7 border-2 border-color-alternating-inverted rounded-3xl bg-gradient-to-r from-[#E3FE01]/10 to-transparent shadow-lg transition-all duration-300 hover:border-[#E3FE01] hover:shadow-xl hover:from-[#E3FE01]/20 text-center"
      >
        <div class="flex items-center justify-center gap-uniform-2">
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
          >
            <Icon name="uil:map-marker-alt" class="w-6 h-6 text-[#1F1F1F]" />
          </div>
          <h3 class="heading-4 font-bold text-color-alternating">
            Ada Event di Luar Area Layanan?
          </h3>
        </div>

        <p class="paragraph-3 text-color-alternating max-w-2xl mx-auto">
          Kami senang melakukan perjalanan ke luar coverage area untuk acara
          yang spesial. Yuk, diskusikan visimu biar kita bisa bikin cerita yang
          luar biasa, bersama.
        </p>

        <div class="flex justify-center">
          <Button severity="primary">
            <a
              :href="whatsappLink"
              target="_blank"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 font-semibold"
            >
              <p>Konsultasikan dengan Kami</p>
              <Icon name="uil:whatsapp" class="icon-size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="why-us">
      <div class="flex flex-col gap-uniform-1 text-center">
        <p class="heading-1 text-color-alternating">
          Kenapa Harus Pilih Memomancy?
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-uniform-4">
        <div
          class="flex flex-col gap-uniform-4 text-color-alternating items-center text-center p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
          v-for="(item, index) in whyUs"
          :key="index"
        >
          <div class="flex gap-uniform-1 relative">
            <!-- Magical glow effect -->
            <div
              class="absolute inset-0 bg-[#E3FE01] rounded-full blur-sm opacity-20 animate-pulse"
            ></div>
            <Icon :name="item.icons[1]" class="icon-size-1 relative z-10" />
          </div>
          <p class="heading-5 text-color-alternating">
            {{ item.title }}
          </p>
          <p class="paragraph-3 text-color-alternating">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="contact-us">
      <div class="flex flex-col gap-uniform-8 text-center">
        <p class="heading-1 text-color-alternating">
          Siap mengabadikan momen spesialmu?
        </p>
        <p class="paragraph-2 text-color-alternating">
          Yuk ceritain visimu! Kami siap bantu wujudkan cerita yang luar biasa
          bareng kamu.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-uniform-4">
        <div
          v-for="method in contactMethods"
          :key="method.title"
          class="flex flex-col gap-uniform-4 text-color-alternating items-center text-center p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#E3FE01] rounded-full shrink-0"
          >
            <Icon :name="method.icon" class="w-6 h-6 text-[#1F1F1F]" />
          </div>
          <div class="flex flex-col gap-uniform-8">
            <h3 class="heading-5 font-bold text-color-alternating">
              {{ method.title }}
            </h3>
            <p class="paragraph-3 text-color-alternating">
              {{ method.subtitle }}
            </p>
            <p class="paragraph-3 text-color-alternating font-semibold">
              {{ method.contact }}
            </p>
          </div>
          <Button severity="primary">
            <a
              :href="method.href"
              :target="method.title === 'WhatsApp' ? '_blank' : undefined"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 font-semibold"
            >
              <p>{{ method.buttonText }}</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
    <!-- Social Media Section -->
    <div class="flex flex-col m-8 gap-uniform-4" id="social-media">
      <div class="flex flex-col gap-uniform-8 text-center">
        <p class="heading-1 text-color-alternating">Ikuti Sosial Media Kami</p>
        <p class="paragraph-2 text-color-alternating">
          Ikuti perjalanan kreatif kami dan dapatkan inspirasi terbaru!
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-uniform-4">
        <!-- Instagram -->
        <div
          class="flex items-center gap-uniform-4 text-color-alternating p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#E4405F] to-[#F77737] rounded-full shrink-0"
          >
            <Icon name="uil:instagram" class="w-6 h-6 text-white" />
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-1 flex-grow">
            <h3 class="heading-5 font-bold text-color-alternating">
              Instagram
            </h3>
            <p class="paragraph-3 text-color-alternating">
              {{ instagramName }}
            </p>
            <p class="paragraph-3 text-color-alternating font-semibold">
              {{ socialMediaStats.instagram.followers }}
              {{ socialMediaStats.instagram.metric }}
            </p>
          </div>

          <!-- Button -->
          <Button severity="primary">
            <a
              :href="instagramLink"
              target="_blank"
              class="flex items-center gap-2 paragraph-3 font-semibold"
            >
              <p>Follow</p>
              <Icon name="uil:arrow-up-right" class="w-4 h-4" />
            </a>
          </Button>
        </div>

        <!-- TikTok -->
        <div
          class="flex items-center gap-uniform-4 text-color-alternating p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#000000] rounded-full shrink-0"
          >
            <Icon name="ic:baseline-tiktok" class="w-6 h-6 text-white" />
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-1 flex-grow">
            <h3 class="heading-5 font-bold text-color-alternating">TikTok</h3>
            <p class="paragraph-3 text-color-alternating">{{ tiktokName }}</p>
            <p class="paragraph-3 text-color-alternating font-semibold">
              {{ socialMediaStats.tiktok.followers }}
              {{ socialMediaStats.tiktok.metric }}
            </p>
          </div>

          <!-- Button -->
          <Button severity="primary">
            <a
              :href="tiktokLink"
              target="_blank"
              class="flex items-center gap-2 paragraph-3 font-semibold"
            >
              <p>Follow</p>
              <Icon name="uil:arrow-up-right" class="w-4 h-4" />
            </a>
          </Button>
        </div>

        <!-- Facebook -->
        <div
          class="flex items-center gap-uniform-4 text-color-alternating p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#1877F2] rounded-full shrink-0"
          >
            <Icon name="uil:facebook-f" class="w-6 h-6 text-white" />
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-1 flex-grow">
            <h3 class="heading-5 font-bold text-color-alternating">Facebook</h3>
            <p class="paragraph-3 text-color-alternating">
              {{ facebookName }}
            </p>
            <p class="paragraph-3 text-color-alternating font-semibold">
              {{ socialMediaStats.facebook.followers }}
              {{ socialMediaStats.facebook.metric }}
            </p>
          </div>

          <!-- Button -->
          <Button severity="primary">
            <a
              :href="facebookLink"
              target="_blank"
              class="flex items-center gap-2 paragraph-3 font-semibold"
            >
              <p>Like</p>
              <Icon name="uil:arrow-up-right" class="w-4 h-4" />
            </a>
          </Button>
        </div>

        <!-- YouTube -->
        <div
          class="flex items-center gap-uniform-4 text-color-alternating p-6 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
        >
          <!-- Icon -->
          <div
            class="flex items-center justify-center w-12 h-12 bg-[#FF0000] rounded-full shrink-0"
          >
            <Icon name="uil:youtube" class="w-6 h-6 text-white" />
          </div>

          <!-- Info -->
          <div class="flex flex-col gap-1 flex-grow">
            <h3 class="heading-5 font-bold text-color-alternating">YouTube</h3>
            <p class="paragraph-3 text-color-alternating">{{ youtubeName }}</p>
            <p class="paragraph-3 text-color-alternating font-semibold">
              {{ socialMediaStats.youtube.followers }}
              {{ socialMediaStats.youtube.metric }}
            </p>
          </div>

          <!-- Button -->
          <Button severity="primary">
            <a
              :href="youtubeLink"
              target="_blank"
              class="flex items-center gap-2 paragraph-3 font-semibold"
            >
              <p>Subscribe</p>
              <Icon name="uil:arrow-up-right" class="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="quick-action">
      <div
        class="flex flex-col gap-uniform-4 text-color-alternating text-center p-8 border-2 border-color-alternating-inverted rounded-3xl bg-color-alternating transition-all duration-300 hover:border-[#E3FE01] hover:shadow-lg"
      >
        <div class="flex flex-col gap-uniform-8">
          <h2 class="heading-1 font-bold text-color-alternating">
            Tindakan Pintas
          </h2>
          <p class="paragraph-2 text-color-alternating">
            Akses langsung ke layanan utama kami dengan sekali klik
          </p>
        </div>

        <div class="flex flex-col md:flex-row gap-uniform-4 justify-center">
          <!-- Reservasi Sekarang -->
          <Button severity="contrast">
            <NuxtLink
              to="/reservation"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-2 font-semibold"
            >
              <p>Reservasi Sekarang</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>

          <!-- Lihat Portfolio -->
          <Button severity="primary">
            <NuxtLink
              to="/gallery"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 font-semibold"
            >
              <p>Lihat Portfolio</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>

          <!-- Hitung Harga -->
          <Button severity="primary">
            <NuxtLink
              to="/calculator"
              class="w-full flex items-center gap-uniform-4 justify-between paragraph-3 font-semibold"
            >
              <p>Hitung Harga</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-styling {
  @apply !rounded-full border-0;
  &:hover {
    background: var(--memomancy-primary);
  }
}

.gallery-item:hover {
  border-color: var(--memomancy-primary);
}

.feature-card {
  border-color: var(--memomancy-primary);
  background: linear-gradient(
    135deg,
    var(--memomancy-light),
    var(--memomancy-primary-hover)
  );
}

.feature-card:hover {
  border-color: var(--memomancy-primary-hover);
}

.icon-primary {
  background: var(--memomancy-primary);
  color: var(--memomancy-dark);
}

.icon-border {
  border: 2px solid var(--memomancy-dark);
}

.text-dark {
  color: var(--memomancy-dark);
}

.bg-gradient-primary {
  background: linear-gradient(
    135deg,
    var(--memomancy-primary) / 10,
    transparent
  );
}

.bg-gradient-primary:hover {
  background: linear-gradient(
    135deg,
    var(--memomancy-primary) / 20,
    transparent
  );
  border-color: var(--memomancy-primary);
}

.testimonial-card:hover {
  border-color: var(--memomancy-primary);
}

.contact-card:hover {
  border-color: var(--memomancy-primary);
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
  @apply font-system font-bold leading-tight;
  @apply md:text-nowrap;
  font-size: clamp(1.5rem, 8vw, 12rem);
}
.sub-tagline {
  @apply mt-8 font-han leading-relaxed;
  font-size: clamp(0.875rem, 3vw, 4rem);
}
.emoji {
  @apply text-center transition-all duration-200 ease-in-out transform;
  font-size: clamp(2rem, 8vw, 15rem);
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
