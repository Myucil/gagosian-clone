<template>
  <div class="artist-detail" v-if="artist">
    <div class="container">
      <h1 class="artist-name">{{ artist.name.toUpperCase() }}</h1>

      <!-- Artist Sub-navigation -->
      <nav class="artist-nav">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="artist-nav__link"
          :class="{ 'artist-nav__link--active': activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </nav>

      <!-- Artist Content -->
      <div class="artist-content">
        <div class="artist-carousel">
          <div class="artist-carousel__image">
            <img :src="currentWork.image" :alt="currentWork.title" />
          </div>
          <button class="artist-carousel__nav artist-carousel__nav--prev" @click="prevWork">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button class="artist-carousel__nav artist-carousel__nav--next" @click="nextWork">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div class="artist-caption">
          <p class="artist-caption__name">{{ artist.name }}</p>
          <p class="artist-caption__title">{{ currentWork.title }}</p>
          <p class="artist-caption__year">{{ currentWork.year }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="artist-not-found">
    <div class="container">
      <p>Artist not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { artists } from '../data'

const route = useRoute()
const activeTab = ref('Works')
const currentWorkIndex = ref(0)

const tabs = ['Works', 'About', 'Exhibitions', 'Quarterly', 'Fairs', 'News', 'Press', 'Shop']

const artist = computed(() => {
  return artists.find(a => a.slug === route.params.slug)
})

// Sample works for the carousel
const works = [
  { id: 1, title: 'Gazing Ball (Titian Pastoral)', year: '2024-25', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80' },
  { id: 2, title: 'Balloon Dog (Orange)', year: '1994-2000', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80' },
  { id: 3, title: 'Rabbit', year: '1986', image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80' }
]

const currentWork = computed(() => works[currentWorkIndex.value])

const nextWork = () => {
  currentWorkIndex.value = (currentWorkIndex.value + 1) % works.length
}

const prevWork = () => {
  currentWorkIndex.value = (currentWorkIndex.value - 1 + works.length) % works.length
}
</script>

<style scoped>
.artist-detail {
  padding-top: calc(var(--header-height) + 40px);
  padding-bottom: 80px;
  background: var(--color-white);
}

.artist-name {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}

.artist-nav {
  display: flex;
  gap: 32px;
  margin-bottom: 60px;
  border-bottom: 1px solid var(--color-gray-200);
  padding-bottom: 16px;
}

.artist-nav__link {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  transition: color var(--transition-fast);
  padding: 0;
}

.artist-nav__link:hover {
  color: var(--color-black);
}

.artist-nav__link--active {
  color: var(--color-black);
  font-weight: 500;
}

.artist-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  align-items: start;
}

.artist-carousel {
  position: relative;
}

.artist-carousel__image {
  aspect-ratio: 4/3;
  overflow: hidden;
}

.artist-carousel__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.artist-carousel__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-600);
  transition: color var(--transition-fast);
}

.artist-carousel__nav:hover {
  color: var(--color-black);
}

.artist-carousel__nav svg {
  width: 32px;
  height: 32px;
}

.artist-carousel__nav--prev {
  left: -60px;
}

.artist-carousel__nav--next {
  right: -60px;
}

.artist-caption {
  padding-top: 20px;
}

.artist-caption__name {
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.artist-caption__title {
  font-size: 0.9375rem;
  font-style: italic;
  margin-bottom: 4px;
}

.artist-caption__year {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.artist-not-found {
  padding: 200px 0;
  text-align: center;
}

@media (max-width: 1024px) {
  .artist-content {
    grid-template-columns: 1fr;
  }

  .artist-carousel__nav--prev {
    left: 16px;
  }

  .artist-carousel__nav--next {
    right: 16px;
  }

  .artist-carousel__nav {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }
}

@media (max-width: 640px) {
  .artist-nav {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
