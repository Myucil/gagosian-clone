<template>
  <router-link :to="`/exhibitions/${exhibition.slug}`" class="card">
    <div class="card-image">
      <img :src="exhibition.image" :alt="exhibition.title" loading="lazy" />
      <span v-if="exhibition.status === 'extended'" class="card-badge">Extended</span>
    </div>
    <div class="card-content">
      <p v-if="exhibition.artist" class="card-title">{{ exhibition.artist }}</p>
      <p class="card-subtitle">{{ exhibition.title }}</p>
      <p v-if="exhibition.subtitle" class="card-subtitle-secondary">{{ exhibition.subtitle }}</p>
      <p class="card-meta">{{ exhibition.dates }}</p>
      <p class="card-location">{{ exhibition.location }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  exhibition: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  display: block;
}

.card-image {
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
}

.card-image img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.card:hover .card-image img {
  transform: scale(1.02);
}

.card-badge {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 8px;
  background: var(--color-white);
  font-size: 0.75rem;
  color: var(--color-gray-600);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.card-subtitle {
  font-size: 1rem;
  font-weight: 600;
}

.card-subtitle-secondary {
  font-size: 1rem;
  font-weight: 400;
  margin-top: 2px;
}

.card-meta {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-top: 8px;
}

.card-location {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}
</style>
