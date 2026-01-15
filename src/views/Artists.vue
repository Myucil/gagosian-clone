<template>
  <div class="artists-page">
    <div class="container">
      <h1 class="page-title">ARTISTS</h1>

      <!-- Artist Grid -->
      <div class="artists-grid">
        <router-link
          v-for="artist in artists"
          :key="artist.id"
          :to="`/artists/${artist.slug}`"
          class="artist-item"
        >
          <div class="artist-item__image">
            <img :src="artist.image" :alt="artist.name" loading="lazy" />
          </div>
          <span class="artist-item__name">{{ artist.name }}</span>
        </router-link>
      </div>

      <!-- Artist List -->
      <div class="artists-list">
        <div
          v-for="column in artistColumns"
          :key="column[0]?.id"
          class="artists-list__column"
        >
          <router-link
            v-for="artist in column"
            :key="artist.id"
            :to="`/artists/${artist.slug}`"
            class="artists-list__link"
          >
            {{ artist.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { artists } from '../data'

// Split artists into 4 columns for the list view
const artistColumns = computed(() => {
  const columns = [[], [], [], []]
  artists.forEach((artist, index) => {
    columns[index % 4].push(artist)
  })
  return columns
})
</script>

<style scoped>
.artists-page {
  padding-top: calc(var(--header-height) + 40px);
  padding-bottom: 80px;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 60px;
}

/* Artists Grid (Masonry-like) */
.artists-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 80px;
}

.artist-item {
  position: relative;
  overflow: hidden;
}

.artist-item:nth-child(3n+1) {
  grid-column: span 2;
  grid-row: span 2;
}

.artist-item__image {
  aspect-ratio: 1;
  overflow: hidden;
}

.artist-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all var(--transition-base);
}

.artist-item:hover .artist-item__image img {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.artist-item__name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: var(--color-white);
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.artist-item:hover .artist-item__name {
  opacity: 1;
}

/* Artists List */
.artists-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding-top: 40px;
  border-top: 1px solid var(--color-gray-200);
}

.artists-list__column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.artists-list__link {
  font-size: 1rem;
  color: var(--color-black);
  transition: color var(--transition-fast);
}

.artists-list__link:hover {
  color: var(--color-gray-600);
}

@media (max-width: 1024px) {
  .artists-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .artists-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .artist-item:nth-child(3n+1) {
    grid-column: span 1;
    grid-row: span 1;
  }

  .artists-list {
    grid-template-columns: 1fr;
  }
}
</style>
