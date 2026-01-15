<template>
  <div class="exhibitions-page">
    <div class="container">
      <h1 class="page-title">EXHIBITIONS</h1>

      <!-- Filter Tabs -->
      <div class="exhibitions-filters">
        <div class="exhibitions-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="exhibitions-tab"
            :class="{ 'exhibitions-tab--active': activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <button class="view-toggle" @click="toggleView">
          {{ viewMode === 'grid' ? 'List' : 'Grid' }}
        </button>
      </div>

      <!-- Exhibitions Grid -->
      <div class="exhibitions-grid" :class="{ 'exhibitions-grid--list': viewMode === 'list' }">
        <ExhibitionCard
          v-for="exhibition in filteredExhibitions"
          :key="exhibition.id"
          :exhibition="exhibition"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExhibitionCard from '../components/ExhibitionCard.vue'
import { exhibitions } from '../data'

const activeTab = ref('Current')
const viewMode = ref('grid')

const tabs = ['Current', 'Upcoming', 'Archive']

const filteredExhibitions = computed(() => {
  if (activeTab.value === 'Current') {
    return exhibitions.filter(e => e.status === 'current' || e.status === 'extended')
  }
  return exhibitions
})

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}
</script>

<style scoped>
.exhibitions-page {
  padding-top: calc(var(--header-height) + 40px);
  padding-bottom: 80px;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  margin-bottom: 40px;
}

.exhibitions-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray-200);
}

.exhibitions-tabs {
  display: flex;
  gap: 32px;
}

.exhibitions-tab {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  transition: color var(--transition-fast);
  padding: 0;
}

.exhibitions-tab:hover {
  color: var(--color-black);
}

.exhibitions-tab--active {
  color: var(--color-black);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.view-toggle {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  transition: color var(--transition-fast);
}

.view-toggle:hover {
  color: var(--color-black);
}

.exhibitions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 24px;
}

.exhibitions-grid--list {
  grid-template-columns: 1fr;
  gap: 24px;
}

.exhibitions-grid--list :deep(.card) {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
}

.exhibitions-grid--list :deep(.card-image) {
  margin-bottom: 0;
}

.exhibitions-grid--list :deep(.card-image img) {
  aspect-ratio: 4/3;
}

@media (max-width: 1024px) {
  .exhibitions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .exhibitions-grid--list :deep(.card) {
    grid-template-columns: 200px 1fr;
  }
}

@media (max-width: 640px) {
  .exhibitions-grid {
    grid-template-columns: 1fr;
  }

  .exhibitions-grid--list :deep(.card) {
    grid-template-columns: 1fr;
  }
}
</style>
