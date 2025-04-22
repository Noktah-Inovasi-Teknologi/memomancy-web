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
    title: "Pergi ke halaman reservasi",
    number: 1,
    emojis: ["🗺️", "📅", "📝"],
    button: {
      text: "Reservasi",
      link: "/reservation",
    },
  },
  {
    title: "Tentukan waktu dan tempat",
    description:
      "Tentukan waktu dan tempat yang kamu mau, beserta detail lainnya.",
    number: 2,
    emojis: ["📍", "🗓️", "⏰"],
  },
  {
    title: "Lakukan pembayaran",
    description:
      "Lakukan pembayaran sesuai dengan metode yang tersedia, QRIS juga bisa.",
    number: 3,
    emojis: ["💳", "💵", "💰"],
  },
  {
    title: "Tunggu konfirmasi",
    description:
      "Tunggu konfirmasi dari staff kami lewat Whatsapp, biasanya tidak lebih dari 1x24 jam.",
    number: 4,
    emojis: ["⏳", "📩", "📬"],
  },
  {
    title: "Nikmati momenmu",
    description:
      "Kami akan datang sesuai dengan waktu dan tempat yang sudah ditentukan, untuk mengabadikan momenmu.",
    number: 5,
    emojis: ["🎉", "🎊", "🎈"],
  },
]);
const emoticonLoopers = reservationSteps.value.map((step) =>
  useEmoticonLooper(step.emojis, 1000)
);
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
          <p class="heading-1 main-tagline top-tagline">Abadikan Hari Ini</p>
          <p class="heading-1 main-tagline bottom-tagline">
            Ceritakan Selamanya
          </p>
          <p
            class="heading-4 mt-6 text-color-alternating text-center md:text-start"
          >
            Kami foto dan rekam momenmu tanpa ribet
          </p>
          <div class="flex gap-uniform-4 mt-4 lg:mt-12">
            <Button>
              <NuxtLink
                to="/reservation"
                class="flex items-center gap-8 paragraph-3 text-[#1F1F1F] font-semibold"
              >
                <p>Reservasi Sekarang</p>
                <Icon name="uil:arrow-up-right" class="icon-size-5" />
              </NuxtLink>
            </Button>
            <Button
              pt:root:class="!bg-[#F5F2EB] dark:!bg-[#1F1F1F] dark:hover:!bg-[#2E2E2E] !border-[#1F1F1F] dark:!border-[#F5F2EB] !rounded-full !px-3 !py-[0.375rem] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem] hover:!bg-[#D9D491]"
            >
              <NuxtLink
                to="/calculator"
                class="flex items-center gap-uniform-4 paragraph-3 text-color-alternating font-semibold"
              >
                <p>Hitung Harga</p>
                <Icon name="uil:arrow-up-right" class="icon-size-5" />
              </NuxtLink>
            </Button>
          </div>
        </div>
        <div>
          <transition name="fade" mode="out-in">
            <p :key="currentEmoticon" class="emoji">
              {{ currentEmoticon }}
            </p>
          </transition>
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
            <Icon name="uil:arrow-up-right" class="icon-size-5" />
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="reservation-steps">
      <div class="flex flex-col gap-uniform-1">
        <p class="paragraph-2">
          Suka sama hasilnya? Booking-nya juga gampang kok, cek aja
        </p>
        <p class="heading-1 text-color-alternating">Cara Reservasi</p>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-uniform-4 items-stretch"
      >
        <div
          class="border border-color-alternating-inverted p-8 rounded-[3rem]"
          v-for="(step, index) in reservationSteps"
          :key="index"
        >
          <div
            class="flex h-[120px] md:h-[100px] lg:h-[180px] xl:h-[120px] 2xl:h-[260px] gap-uniform-6 items-center justify-between"
          >
            <div
              class="flex flex-col justify-between items-center h-full gap-uniform-6"
            >
              <p class="heading-7 text-color-alternating">{{ step.number }}</p>
            </div>
            <div class="flex flex-col gap-2 justify-between h-full">
              <p class="heading-7 text-color-alternating">{{ step.title }}</p>
              <p
                class="paragraph-4 text-color-alternating"
                v-if="step.description"
              >
                {{ step.description }}
              </p>
              <div v-if="step.button">
                <Button>
                  <NuxtLink
                    :to="step.button.link"
                    class="flex items-center gap-4 paragraph-4 text-[#1F1F1F] font-semibold"
                  >
                    <p>{{ step.button.text }}</p>
                    <Icon name="uil:arrow-up-right" class="icon-size-5" />
                  </NuxtLink>
                </Button>
              </div>
            </div>
            <div
              class="flex flex-col justify-between items-center h-full gap-uniform-6"
            >
              <p>
                {{ emoticonLoopers[index].currentEmoticon }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col m-8 gap-uniform-4" id="why-us">
      <div class="flex flex-col gap-uniform-1">
        <p class="paragraph-2">
          Sampe sini kamu pasti mikir, "foto-videografer kan banyak, apa yang
          bikin Memomancy ini beda?". Nah, ini alasannya
        </p>
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
                  class="flex items-center gap-uniform-4 paragraph-3 text-[#1F1F1F] font-semibold"
                >
                  <p>Reservasi Sekarang</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-5" />
                </NuxtLink>
              </Button>
              <Button
                pt:root:class="!bg-[#F5F2EB] dark:!bg-[#1F1F1F] dark:hover:!bg-[#2E2E2E] !border-0 !rounded-full !px-3 !py-[0.375rem] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem] hover:!bg-[#D9D491]"
              >
                <NuxtLink
                  to="/calculator"
                  class="flex items-center gap-uniform-4 paragraph-3 text-color-alternating font-semibold"
                >
                  <p>Hitung Harga</p>
                  <Icon name="uil:arrow-up-right" class="icon-size-5" />
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
