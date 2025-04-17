<script lang="ts" setup>
const colorMode = useColorMode();
const emoticons = ref(["✨", "🧙", "📸", "🧙‍♂️", "🪄", "🧙‍♀️", "📷"]);
const { currentEmoticon } = useEmoticonLooper(emoticons.value);

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
    <div class="p-8" id="hero">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex flex-col items-start">
          <p class="heading-1 main-tagline top-tagline">Abadikan Hari Ini</p>
          <p class="heading-1 main-tagline bottom-tagline">
            Ceritakan Selamanya
          </p>
          <p class="sub-tagline text-color-alternating">
            Memomancy menangkap jejak visual dalam setiap momenmu. Panggil
            kembali kenangannya lewat foto dan video, yang kami abadikan.
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
            <div class="absolute top-0 left-0 w-full text-white p-8 lg:p-12">
              <p class="text-content-normal text-color-alternating">
                Memomancy hadir untukmu yang ingin mengabadikan momen-momen
                berharga dalam hidupmu. Setiap tawa, pelukan, dan kehangatan
                bisa menjadi cerita yang abadi. Rasakan kembali emosinya,
                seolah-olah waktu berhenti, dan kamu ada di sana lagi.
              </p>
            </div>
            <img
              src="/images/blue_beach.png"
              alt="Blue Beach"
              class="main-image"
            />
            <div class="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12">
              <div
                class="w-full flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4"
              >
                <p
                  class="secondary-list bg-color-alternating text-color-alternating"
                >
                  🗺️ Ada di banyak kota dan tempat
                </p>
                <p
                  class="secondary-list bg-color-alternating text-color-alternating"
                >
                  🛠️ Fleksibel dan dapat dikustomisasi
                </p>
                <p
                  class="secondary-list bg-color-alternating text-color-alternating"
                >
                  ⏱️ Reservasi waktu & tempat gampang anti ribet
                </p>
                <Button pt:root:class="button-styling">
                  <NuxtLink to="/reservation" class="text-black">
                    Reservasi Sekarang
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-styling {
  @apply !rounded-full border-0 hover:bg-[#E3FE01] text-xs;
  @apply md:text-xs;
  @apply lg:text-base;
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
  @apply flex px-2 py-1 rounded-full text-xs text-center items-center justify-center;
  @apply md:text-xs;
  @apply lg:px-4 lg:text-base;
}
</style>
