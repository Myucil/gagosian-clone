<template>
  <section class="hero">
    <div class="hero__slides">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero__slide"
        :class="{ 'hero__slide--active': index === currentIndex }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="hero__content">
          <span class="hero__location">{{ slide.location }}</span>
          <h1 class="hero__title">{{ slide.title }}</h1>
          <p v-if="slide.artist" class="hero__artist">{{ slide.artist }}</p>
          <p class="hero__dates">{{ slide.dates }}</p>
          <p class="hero__venue">{{ slide.venue }}</p>
          <router-link :to="slide.link" class="hero__btn">Learn More</router-link>
        </div>
      </div>
    </div>

    <button class="hero__nav hero__nav--prev" @click="prev" aria-label="Previous slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <button class="hero__nav hero__nav--next" @click="next" aria-label="Next slide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>

    <div class="hero__progress">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="hero__progress-bar"
        :class="{ 'hero__progress-bar--active': index === currentIndex }"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let interval = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

const startAutoplay = () => {
  interval = setInterval(next, 6000)
}

const stopAutoplay = () => {
  if (interval) clearInterval(interval)
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero__slides {
  height: 100%;
}

.hero__slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.hero__slide--active {
  opacity: 1;
}

.hero__slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
}

.hero__content {
  position: absolute;
  left: var(--container-padding);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-white);
  max-width: 600px;
}

.hero__location {
  display: block;
  font-size: 1rem;
  margin-bottom: 16px;
  opacity: 0.9;
}

.hero__title {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 400;
  font-style: italic;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 24px;
}

.hero__artist {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.hero__dates {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 4px;
}

.hero__venue {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 32px;
}

.hero__btn {
  display: inline-block;
  padding: 14px 28px;
  border: 1px solid var(--color-white);
  color: var(--color-white);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
}

.hero__btn:hover {
  background: var(--color-white);
  color: var(--color-black);
}

.hero__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
  z-index: 10;
}

.hero__nav:hover {
  opacity: 1;
}

.hero__nav svg {
  width: 32px;
  height: 32px;
}

.hero__nav--prev {
  left: var(--container-padding);
}

.hero__nav--next {
  right: var(--container-padding);
}

.hero__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3px;
}

.hero__progress-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  transition: background var(--transition-fast);
}

.hero__progress-bar--active {
  background: var(--color-white);
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 2.5rem;
  }

  .hero__content {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>
