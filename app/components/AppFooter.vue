<script lang="ts" setup>
</script>

<template>
  <USeparator />

  <footer class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite" id="footer">
    <div class="flex flex-col md:flex-row gap-uniform-3 text-charcoal">
      <div class="flex-1 flex flex-col gap-uniform-5">
        <h4 class="font-playfair text-heading-4">Memomancy</h4>
        <p class="font-lato text-normal-3">
          Where moments become legacy.
        </p>
      </div>
      <div class="flex-1 flex flex-col gap-uniform-5">
        <h4 class="font-playfair text-heading-4">Quick Links</h4>
        <nav class="flex flex-col gap-uniform-6 font-lato text-normal-3">
          <AnimatedButton
            to="/"
            classes="text-charcoal hover:text-gold w-fit"
          >
            Home
          </AnimatedButton>
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
      <div class="flex-1 flex flex-col gap-uniform-5">
        <h4 class="font-playfair text-heading-4">Contact</h4>
        <div class="flex flex-col gap-uniform-6 font-lato text-normal-3">
          <p>info@memomancy.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
    </div>
    <div class="border-t border-charcoal pt-uniform-3 mt-uniform-3">
      <p class="text-charcoal font-lato text-normal-4 text-center">
        © {{ new Date().getFullYear() }} Memomancy. All rights reserved.
      </p>
    </div>
  </footer>
</template>