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

const { $viewport } = useNuxtApp();

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
    title: "Sesi Foto/Video Dimulai!✨",
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

// Social media information
const socialMediaPlatforms = ref([
  {
    name: "Instagram",
    username: instagramName,
    link: instagramLink,
    icon: "uil:instagram",
    iconBgClass: "bg-gradient-to-br from-[#E4405F] to-[#F77737]",
    buttonText: "Follow",
    stats: {
      followers: socialMediaStats.instagram.followers,
      metric: socialMediaStats.instagram.metric,
    },
  },
  {
    name: "TikTok",
    username: tiktokName,
    link: tiktokLink,
    icon: "ic:baseline-tiktok",
    iconBgClass: "bg-black",
    buttonText: "Follow",
    stats: {
      followers: socialMediaStats.tiktok.followers,
      metric: socialMediaStats.tiktok.metric,
    },
  },
  {
    name: "Facebook",
    username: facebookName,
    link: facebookLink,
    icon: "uil:facebook-f",
    iconBgClass: "bg-blue-600",
    buttonText: "Like",
    stats: {
      followers: socialMediaStats.facebook.followers,
      metric: socialMediaStats.facebook.metric,
    },
  },
  {
    name: "YouTube",
    username: youtubeName,
    link: youtubeLink,
    icon: "uil:youtube",
    iconBgClass: "bg-red-600",
    buttonText: "Subscribe",
    stats: {
      followers: socialMediaStats.youtube.followers,
      metric: socialMediaStats.youtube.metric,
    },
  },
]);

// Calculator and Consult cards data
const serviceCards = ref([
  {
    id: "calculator",
    title: "Kalkulator Harga",
    icon: "uil:calculator",
    iconSecondary: "uil:clock",
    subtitle: "Estimasi dalam 2 menit",
    steps: [
      "1. Pilih jenis layanan",
      "2. Tentukan lokasi", 
      "3. Dapatkan harga transparan"
    ],
    buttonText: "Hitung Harga",
    buttonIcon: "uil:arrow-up-right",
    linkTo: "/calculator",
    isExternal: false
  },
  {
    id: "consult",
    title: "Konsultasi Langsung",
    icon: "uil:comments",
    iconSecondary: "uil:phone",
    subtitle: "Respon cepat dalam 15-30 menit",
    steps: [
      "- Konsultasi gratis",
      "- Saran profesional", 
      "- Paket custom sesuai budget"
    ],
    buttonText: "Hubungi Kami",
    buttonIcon: "uil:whatsapp",
    linkTo: whatsappLink,
    isExternal: true
  }
]);

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

// Category animation data
const categories = [
  "Pre-Wed",
  "Content Creator Wed",
  "Birthday",
  "Graduation",
  "Corporate Event",
  "Sport",
];

const currentCategoryIndex = ref(0);
let categoryInterval: NodeJS.Timeout | null = null;

// Calculate item height based on screen size
const getItemHeight = () => {
  if ($viewport.isLessOrEquals("xs")) return 16;
  if ($viewport.isLessOrEquals("sm")) return 24; // Mobile: smaller
  if ($viewport.isLessOrEquals("md")) return 36; // Tablet: medium
  if ($viewport.isLessOrEquals("lg")) return 48;
  return 64; // Desktop: larger
};

// Category styling function
const getCategoryClass = (index: number) => {
  const currentIndex = currentCategoryIndex.value % categories.length;
  const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
  const nextIndex = (currentIndex + 1) % categories.length;

  if (index === currentIndex) {
    return {
      class:
        "text-color-consistent-charcoal bg-contrast rounded-3xl px-3 max-md:pt-1 md:pt-2 font-semibold opacity-100 inline-block transition-all duration-500 leading-none",
      style: "transform: scale(1);",
    };
  } else if (index === prevIndex || index === nextIndex) {
    return {
      class:
        "text-inverse opacity-60 inline-block transition-all duration-500 leading-none",
      style: "transform: scale(0.5);",
    };
  } else {
    return {
      class:
        "text-red-500 opacity-30 inline-block transition-all duration-500 leading-none",
      style: "transform: scale(0.3);",
    };
  }
};

// Auto-scroll function
const startCategoryAnimation = () => {
  categoryInterval = setInterval(() => {
    currentCategoryIndex.value =
      (currentCategoryIndex.value + 1) % categories.length;
  }, 2000);
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

  // Start category animation
  startCategoryAnimation();

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

  // Cleanup category animation
  if (categoryInterval) {
    clearInterval(categoryInterval);
  }

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
    <div class="flex flex-col gap-uniform-4" id="hero" style="margin: var(--padding-container)">
      <div class="flex flex-col items-center text-center gap-uniform-2">
        <div class="flex flex-col items-center gap-uniform-6">
          <h1 class="heading-1 text-inverse leading-tight">
            Abadikan Hari Ini
          </h1>
          <h2 class="heading-1 text-inverse leading-tight">
            Ceritakan Selamanya
          </h2>
        </div>
        
        <div class="flex max-md:flex-col md:flex-row items-center gap-2 text-inverse heading-3">
          <span class="leading-none max-md:text-center">Foto & Video Profesional untuk</span>
          <div
            class="relative overflow-hidden"
            :style="`height: ${getItemHeight() * 3}px`"
          >
            <!-- Text scroller -->
            <div
              ref="categoryScroller"
              class="flex flex-col transition-transform duration-500 ease-in-out"
              :style="`transform: translateY(-${currentCategoryIndex * getItemHeight()}px)`"
            >
              <!-- Empty item to center the first category -->
              <div
                class="flex items-center justify-center transition-all duration-500 whitespace-nowrap px-4"
                :style="`height: ${getItemHeight()}px`"
              >
                <span class="opacity-0">&nbsp;</span>
              </div>

              <div
                v-for="(category, index) in categories"
                :key="index"
                class="flex items-center justify-center transition-all duration-500 whitespace-nowrap px-4"
                :style="`height: ${getItemHeight()}px`"
              >
                <span
                  :class="getCategoryClass(index).class"
                  :style="getCategoryClass(index).style"
                >
                  {{ category }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-uniform-4 w-content text-nowrap mx-auto">
          <Button severity="contrast">
            <NuxtLink
              to="/reservation"
              class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
            >
              <p>Reservasi Sekarang</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>
          <Button severity="secondary">
            <NuxtLink
              to="/calculator"
              class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
            >
              <p>Hitung Harga</p>
              <Icon name="uil:arrow-up-right" class="icon-size-4" />
            </NuxtLink>
          </Button>
        </div>
      </div>
      
      <div class="w-full max-sm:mt-6 sm:mt-8">
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
          <Skeleton
            v-else
            class="main-image bg-gray-300 dark:bg-gray-600 animate-pulse"
            height="15rem"
            />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-uniform-4" id="gallery" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Cerita yang Udah Kami Abadikan</h2>
        <p class="text-normal-4 max-w-4xl mx-auto">
          Kumpulan momen spesial dari berbagai perjalanan yang pernah kami
          tangkap. Dari kisah cinta, kelahiran, hingga momen penuh semangat.
          Inilah jejak visual yang kami banggakan.
        </p>
      </div>
      
      <div class="flex justify-center max-sm:px-2">
        <SelectButton
          v-model="selectedCategory"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          class="max-sm:text-sm"
        />
      </div>
      
      <div class="grid max-md:grid-cols-1 md:max-xl:grid-cols-2 xl:grid-cols-3 gap-uniform-4">
        <Card v-for="(item, index) in filteredImages.slice(0, 3)" :key="index" class="h-full">
          <template #content>
            <div class="flex flex-col gap-uniform-4 padding-uniform-4 h-full">
              <img
                :src="item.src"
                :alt="item.alt"
                class="w-full aspect-square object-cover rounded-[calc(var(--radius-memomancy)-var(--spacing-uniform-4))]"
              />
              <div class="flex flex-col gap-uniform-4 flex-grow">
                <h3 class="heading-4 font-bold text-inverse">
                  {{ item.title }}
                </h3>
                <div class="flex flex-col gap-2 mt-auto">
                  <div class="flex items-center gap-2">
                    <Icon name="uil:map-marker" class="icon-size-6 text-inverse flex-shrink-0" />
                    <p class="text-normal-4 text-inverse truncate">
                      {{ item.location }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="uil:camera" class="icon-size-6 text-inverse flex-shrink-0" />
                    <p class="text-normal-4 text-inverse truncate">
                      {{ item.serviceType }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <Icon name="uil:calendar-alt" class="icon-size-6 text-inverse flex-shrink-0" />
                    <p class="text-normal-4 text-inverse truncate">
                      {{ item.date }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
      
      <div class="flex justify-center max-sm:mt-6">
        <Button severity="contrast" class="max-sm:w-full max-sm:max-w-sm">
          <NuxtLink
            to="/gallery"
            class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
          >
            <p>Lihat Galeri Portfolio Lengkap</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-uniform-4" id="reservation-steps" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <p class="text-normal-4 text-inverse">
          Suka sama hasilnya? Booking-nya juga gampang kok, cuma 5 langkah!
        </p>
        <h2 class="heading-2 text-inverse">Cara Reservasi</h2>
      </div>
      
      <!-- Steps Grid -->
      <div class="grid max-sm:grid-cols-1 sm:max-md:grid-cols-2 md:max-lg:grid-cols-3 lg:max-xl:grid-cols-4 xl:grid-cols-5 gap-uniform-4">
        <div
          v-for="(step, index) in reservationSteps"
          :key="index"
          class="flex flex-col items-center text-center gap-uniform-4 max-sm:px-4 sm:px-6"
        >
          <!-- Icon with Number -->
          <div class="relative flex-shrink-0">
            <div class="flex items-center justify-center max-sm:w-16 max-sm:h-16 sm:w-20 sm:h-20 border-2 border-color-alternating-inverted rounded-2xl bg-color-alternating p-3">
              <Icon :name="step.icon" class="max-sm:icon-size-3 sm:icon-size-2 text-inverse" />
            </div>
            <!-- Number Badge -->
            <div
              class="absolute -top-2 -right-2 flex items-center justify-center max-sm:w-6 max-sm:h-6 sm:w-8 sm:h-8 rounded-full font-bold max-sm:text-xs sm:text-sm"
              style="background: var(--color-contrast); border: 2px solid var(--color-primary-border); color: var(--color-text-contrast);"
            >
              {{ step.number }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-2 min-h-0">
            <h3 class="heading-4 font-bold text-inverse leading-tight">
              {{ step.title }}
            </h3>
            <p class="text-normal-4 text-inverse leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Call to Action Button -->
      <div class="flex justify-center max-sm:mt-6">
        <Button severity="contrast" class="max-sm:w-full max-sm:max-w-sm">
          <NuxtLink
            to="/reservation"
            class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
          >
            <p>Mulai Reservasi</p>
            <Icon name="uil:arrow-up-right" class="icon-size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-uniform-4" id="calculate-and-consult" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Mulai Abadikan Momenmu</h2>
        <p class="text-normal-4 max-w-3xl mx-auto">
          Dapatkan estimasi harga yang akurat, atau konsultasikan langsung
          dengan tim profesional kami.
        </p>
      </div>
      
      <!-- Calculator and Consult Options -->
      <div class="grid max-md:grid-cols-1 md:grid-cols-2 gap-uniform-4">
        <Card v-for="card in serviceCards" :key="card.id" class="card-elevated h-full">
          <template #content>
            <div class="flex flex-col gap-uniform-6 h-full">
              <div class="flex items-center gap-uniform-4">
                <div class="flex items-center justify-center max-sm:w-10 max-sm:h-10 sm:w-12 sm:h-12 bg-contrast rounded-full shrink-0">
                  <Icon :name="card.icon" class="max-sm:icon-size-6 sm:icon-size-5 text-color-consistent-charcoal" />
                </div>
                <h3 class="heading-3 font-bold text-color-standard">
                  {{ card.title }}
                </h3>
              </div>

              <div class="flex gap-uniform-4 text-color-standard flex-grow">
                <div class="flex items-center justify-center max-sm:w-8 max-sm:h-8 sm:w-10 sm:h-10 border-2 bg-transparent rounded-full shrink-0 mt-1">
                  <Icon :name="card.iconSecondary" class="max-sm:icon-size-6 sm:icon-size-6" />
                </div>
                <div class="flex flex-col gap-2 flex-grow mb-uniform-4">
                  <p class="text-normal-4 font-medium">{{ card.subtitle }}</p>
                  <div class="space-y-1">
                    <p 
                      v-for="step in card.steps" 
                      :key="step"
                      class="text-normal-5"
                    >
                      {{ step }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <Button class="w-full" severity="secondary">
              <NuxtLink
                v-if="!card.isExternal"
                :to="card.linkTo"
                class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
              >
                <p>{{ card.buttonText }}</p>
                <Icon :name="card.buttonIcon" class="icon-size-4" />
              </NuxtLink>
              <a
                v-else
                :href="card.linkTo"
                target="_blank"
                class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
              >
                <p>{{ card.buttonText }}</p>
                <Icon :name="card.buttonIcon" class="icon-size-4" />
              </a>
            </Button>
          </template>
        </Card>
      </div>
    </div>
    <!-- Interactive East Java Map Section -->
    <div class="flex flex-col gap-uniform-4" id="service-areas" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Area Layanan Kami</h2>
        <p class="text-normal-4 max-w-2xl mx-auto">
          Klik pada wilayah untuk melihat detail layanan di area tersebut
        </p>
      </div>
      
      <div class="flex max-lg:flex-col lg:flex-row gap-uniform-4 max-lg:items-stretch lg:items-start">
        <!-- Map Container -->
        <div class="flex-1 relative">
          <div class="bg-color-alternating border-2 border-color-alternating-inverted rounded-3xl" style="padding: var(--padding-section)">
            <!-- Background East Java Map -->
            <div
              class="relative overflow-hidden rounded-2xl max-sm:h-64 sm:max-md:h-80 md:max-lg:h-96 lg:aspect-[2/1] bg-color-alternating-inverted touch-pan-x touch-pan-y"
              ref="mapContainer"
              @wheel="handleWheel"
            >
              <!-- Zoom Controls -->
              <div class="absolute max-sm:top-2 max-sm:right-2 sm:top-4 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2">
                <button
                  @click="zoomIn"
                  class="max-sm:w-8 max-sm:h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon name="uil:plus" class="icon-size-6 text-gray-700" />
                </button>
                <button
                  @click="zoomOut"
                  class="max-sm:w-8 max-sm:h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon name="uil:minus" class="icon-size-6 text-gray-700" />
                </button>
                <button
                  @click="resetZoom"
                  class="max-sm:w-8 max-sm:h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200 transition-all duration-200"
                >
                  <Icon name="uil:expand-arrows-alt" class="icon-size-6 text-gray-700" />
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
                        'fill-contrast stroke-neutral-800':
                          selectedRegion?.id === region.id,
                        'fill-neutral-200 stroke-neutral-800 hover:fill-contrast':
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
                        'fill-contrast stroke-neutral-800':
                          selectedRegion?.id === region.id,
                        'fill-neutral-100 stroke-neutral-800 hover:fill-contrast':
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
        <div class="max-lg:w-full lg:w-80 xl:w-96">
          <div class="bg-color-alternating border-2 border-color-alternating-inverted rounded-3xl" style="padding: var(--padding-section)">
            <div v-if="selectedRegion" class="flex flex-col gap-uniform-4">
              <div class="flex items-center gap-uniform-4">
                <div class="flex items-center justify-center max-sm:w-10 max-sm:h-10 sm:w-12 sm:h-12 bg-contrast rounded-full shrink-0">
                  <Icon name="uil:map-marker" class="max-sm:icon-size-6 sm:icon-size-5 text-color-consistent-charcoal" />
                </div>
                <div class="min-w-0 flex-1">
                  <h3 class="max-sm:heading-5 sm:heading-4 font-bold text-inverse truncate">
                    {{ selectedRegion.name }}
                  </h3>
                  <p
                    class="text-normal-4"
                    :class="{
                      'text-green-600': selectedRegion.status === 'covered',
                      'text-orange-600': selectedRegion.status === 'coming_soon',
                    }"
                  >
                    {{ selectedRegion.status === "covered" ? "Tersedia" : "Segera Hadir" }}
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center gap-uniform-2">
                  <Icon name="uil:users-alt" class="icon-size-6 text-inverse flex-shrink-0" />
                  <p class="text-normal-4 text-inverse">
                    {{ selectedRegion.photographers }}
                  </p>
                </div>
                <div class="flex items-center gap-uniform-2">
                  <Icon name="uil:clock" class="icon-size-6 text-inverse flex-shrink-0" />
                  <p class="text-normal-4 text-inverse">
                    Respon: {{ selectedRegion.response }}
                  </p>
                </div>
                <div v-if="selectedRegion.popular" class="flex items-center gap-uniform-2">
                  <Icon name="uil:star" class="icon-size-6 text-yellow-500 flex-shrink-0" />
                  <p class="text-normal-4 text-inverse">Area Populer</p>
                </div>
              </div>

              <Button severity="contrast" v-if="selectedRegion.status === 'covered'" class="w-full">
                <NuxtLink
                  to="/reservation"
                  class="w-full flex items-center gap-uniform-4 justify-betweentext-color-consistent-charcoal font-semibold"
                >
                  <p class="truncate">Reservasi di {{ selectedRegion.name }}</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4 flex-shrink-0" />
                </NuxtLink>
              </Button>
            </div>

            <div v-else class="text-center max-sm:py-6 sm:py-8">
              <Icon name="uil:map" class="max-sm:icon-size-2 sm:icon-size-1 text-inverse mx-auto mb-4" />
              <p class="max-sm:heading-6 sm:heading-5 text-inverse mb-2">Jelajahi Area Layanan</p>
              <p class=" text-inverse">
                Klik pada peta untuk melihat detail layanan di setiap wilayah
              </p>
            </div>
          </div>
        </div>
      </div>
      <Card class="card-elevated">
        <template #content>
          <div class="flex flex-col text-center gap-uniform-6" style="padding: var(--padding-card)">
            <div class="flex max-sm:flex-col sm:flex-row items-center justify-center gap-uniform-4">
              <div class="flex items-center justify-center max-sm:w-10 max-sm:h-10 sm:w-12 sm:h-12 bg-contrast rounded-full shrink-0">
                <Icon name="uil:map-marker-alt" class="max-sm:icon-size-6 sm:icon-size-5 text-text-contrast" />
              </div>
              <h3 class="heading-2 font-bold text-inverse">
                Ada Event di Luar Area Layanan?
              </h3>
            </div>

            <p class="text-normal-4 text-inverse max-w-2xl mx-auto mb-uniform-4">
              Kami senang melakukan perjalanan ke luar coverage area untuk acara
              yang spesial. Yuk, diskusikan visimu biar kita bisa bikin cerita
              yang luar biasa, bersama.
            </p>

            <div class="flex justify-center">
              <Button severity="secondary" class="max-sm:w-auto max-sm:max-w-sm w-auto">
                <a
                  :href="whatsappLink"
                  target="_blank"
                  class="w-full flex items-center gap-uniform-4 justify-between  font-semibold"
                >
                  <p>Konsultasikan dengan Kami</p>
                </a>
              </Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="flex flex-col gap-uniform-4" id="why-us" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Kenapa Harus Pilih Memomancy?</h2>
      </div>
      
      <div class="grid max-sm:grid-cols-1 sm:max-lg:grid-cols-2 lg:grid-cols-4 gap-uniform-4">
        <Card v-for="(item, index) in whyUs" :key="index" class="h-full">
          <template #content>
            <div class="flex flex-col gap-uniform-4 text-inverse items-center text-center h-full p-uniform-4">
              <div class="flex gap-uniform-5 relative flex-shrink-0">
                <!-- Magical glow effect -->
                <div class="absolute inset-0 bg-contrast rounded-full blur-sm opacity-20 animate-pulse"></div>
                <Icon :name="item.icons[1]" class="icon-size-3 relative z-10" />
              </div>
              
              <div class="flex flex-col gap-uniform-4 flex-grow">
                <h3 class="heading-3 font-bold text-inverse leading-tight">
                  {{ item.title }}
                </h3>
                <p class="text-normal-4 text-inverse leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="flex flex-col gap-uniform-4" id="contact-us" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Siap mengabadikan momen spesialmu?</h2>
        <p class="text-normal-4 text-inverse max-w-3xl mx-auto">
          Yuk ceritain visimu! Kami siap bantu wujudkan cerita yang luar biasa
          bareng kamu.
        </p>
      </div>
      
      <div class="grid max-sm:grid-cols-1 sm:max-md:grid-cols-2 md:grid-cols-3 gap-uniform-4">
        <Card class="card-elevated h-full" v-for="method in contactMethods" :key="method.title">
          <template #content>
            <div class="flex flex-col gap-uniform-4 text-inverse items-center text-center h-full" style="padding: var(--padding-card)">
              <div class="flex items-center justify-center max-sm:w-10 max-sm:h-10 sm:w-12 sm:h-12 bg-contrast rounded-full shrink-0">
                <Icon :name="method.icon" class="icon-sze-4 text-color-consistent-charcoal" />
              </div>
              
              <div class="flex flex-col gap-uniform-4 flex-grow">
                <h3 class="heading-3 font-bold text-inverse">
                  {{ method.title }}
                </h3>
                <p class="text-normal-4 text-inverse">
                  {{ method.subtitle }}
                </p>
                <p class="text-normal-2 text-inverse font-semibold">
                  {{ method.contact }}
                </p>
              </div>
              
              <Button severity="secondary" class="w-full mt-auto">
                <a
                  :href="method.href"
                  :target="method.title === 'WhatsApp' ? '_blank' : undefined"
                  class="w-full flex items-center gap-uniform-4 justify-between  font-semibold"
                >
                  <p>{{ method.buttonText }}</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </a>
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <!-- Social Media Section -->
    <div class="flex flex-col gap-uniform-4" id="social-media" style="margin: var(--padding-container)">
      <div class="flex flex-col gap-uniform-6 text-center">
        <h2 class="heading-2 text-inverse">Ikuti Sosial Media Kami</h2>
        <p class="text-normal-4 text-inverse max-w-2xl mx-auto">
          Ikuti perjalanan kreatif kami dan dapatkan inspirasi terbaru!
        </p>
      </div>
      
      <div class="grid max-md:grid-cols-1 md:grid-cols-2 gap-uniform-4">
        <Card v-for="platform in socialMediaPlatforms" :key="platform.name" class="h-full">
          <template #content>
            <div class="flex items-center gap-uniform-4 text-inverse p-uniform-4">
              <!-- Icon -->
              <div
                class="flex items-center justify-center rounded-full shrink-0 w-[var(--icon-size-2)] h-[var(--icon-size-2)]"
                :class="platform.iconBgClass"
              >
                <Icon :name="platform.icon" class="icon-size-4 text-white" />
              </div>

              <!-- Info -->
              <div class="flex flex-col gap-1 flex-grow min-w-0">
                <h3 class="heading-3 text-inverse">
                  {{ platform.name }}
                </h3>
                <p class="text-normal-3 text-inverse truncate">{{ platform.username }}</p>
                <p class="text-normal-4 text-inverse font-semibold">
                  {{ platform.stats.followers }} {{ platform.stats.metric }}
                </p>
              </div>

              <!-- Button -->
              <Button severity="secondary" class="flex-shrink-0">
                <a
                  :href="platform.link"
                  target="_blank"
                  class="flex items-center gap-2  font-semibold"
                >
                  <p class="max-sm:hidden">{{ platform.buttonText }}</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-6" />
                </a>
              </Button>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="flex flex-col gap-uniform-4" id="quick-action" style="margin: var(--padding-container)">
      <Card class="card-elevated">
        <template #content>
          <div class="flex flex-col text-inverse text-center gap-uniform-6" style="padding: var(--padding-card)">
            <div class="flex flex-col gap-uniform-4 mb-uniform-4">
              <h2 class="heading-2 text-inverse">Akses Cepat</h2>
              <p class="text-normal-4 text-inverse max-w-2xl mx-auto">
                Akses langsung ke layanan utama kami dengan sekali klik
              </p>
            </div>

            <div class="flex max-sm:flex-col sm:max-md:flex-col md:flex-row gap-uniform-4 justify-center max-md:items-stretch">
              <!-- Reservasi Sekarang -->
              <Button severity="contrast" class="max-sm:w-full md:min-w-0">
                <NuxtLink
                  to="/reservation"
                  class="w-full flex items-center gap-uniform-4 justify-between font-semibold"
                >
                  <p>Reservasi Sekarang</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>

              <!-- Lihat Portfolio -->
              <Button severity="secondary" class="max-sm:w-full md:min-w-0">
                <NuxtLink
                  to="/gallery"
                  class="w-full flex items-center gap-uniform-4 justify-between  font-semibold"
                >
                  <p>Lihat Galeri Portfolio</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>

              <!-- Hitung Harga -->
              <Button severity="secondary" class="max-sm:w-full md:min-w-0">
                <NuxtLink
                  to="/calculator"
                  class="w-full flex items-center gap-uniform-4 justify-between  font-semibold"
                >
                  <p>Hitung Harga</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-4" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
