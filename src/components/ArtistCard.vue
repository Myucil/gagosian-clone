<template>
  <router-link :to="`/artists/${artist.slug}`" class="artist-card">
    <div class="artist-card__image">
      <img :src="artist.image" :alt="artist.name" loading="lazy" />
    </div>
    <p class="artist-card__name">{{ artist.name }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  artist: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.artist-card {
  display: block;
  text-align: center;
}

.artist-card__image {
  overflow: hidden;
  margin-bottom: 12px;
}

.artist-card__image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all var(--transition-base);
}

.artist-card:hover .artist-card__image img {
  filter: grayscale(0%);
  transform: scale(1.02);
}

.artist-card__name {
  font-size: 0.875rem;
  color: var(--color-gray-800);
}
</style>
