<template>
  <div class="home">
    <!-- Hero Carousel -->
    <HeroCarousel :slides="heroSlides" />

    <!-- On View Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">On View</h2>
        <div class="grid grid-3">
          <ExhibitionCard
            v-for="exhibition in exhibitions.slice(0, 9)"
            :key="exhibition.id"
            :exhibition="exhibition"
          />
        </div>
      </div>
    </section>

    <!-- From the Quarterly Section -->
    <section class="section section-dark">
      <div class="container">
        <div class="quarterly-header">
          <h2 class="section-title text-italic">From the Quarterly</h2>
          <button class="carousel-nav" aria-label="Next" @click="scrollQuarterly">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div class="quarterly-grid" ref="quarterlyGridRef">
          <article
            v-for="(article, index) in quarterlyArticles"
            :key="article.id"
            class="quarterly-card"
            :class="{
              'quarterly-card--featured': article.featured,
              'quarterly-card--text-top': index % 2 === 1
            }"
          >
            <div class="quarterly-card__content">
              <span v-if="article.subtitle" class="quarterly-card__tag">{{ article.subtitle }}</span>
              <h3 class="quarterly-card__title">{{ article.title }}</h3>
              <p v-if="article.excerpt" class="quarterly-card__excerpt">{{ article.excerpt }}</p>
            </div>
            <img :src="article.image" :alt="article.title" loading="lazy" />
          </article>
        </div>
      </div>
    </section>

    <!-- Gagosian Shop Section -->
    <section class="section">
      <div class="container">
        <div class="shop-header">
          <h2 class="section-title">Gagosian Shop</h2>
          <button class="carousel-nav carousel-nav--dark" aria-label="Next" @click="scrollShop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div class="shop-grid" ref="shopGridRef">
          <article v-for="item in shopItems" :key="item.id" class="shop-card">
            <div class="shop-card__image">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </div>
            <h3 class="shop-card__title">{{ item.title }}</h3>
            <p class="shop-card__price">${{ item.price }}</p>
            <button class="shop-card__btn">Shop</button>
          </article>
        </div>
        <a href="#" class="see-more">See more at the Gagosian Shop</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import ExhibitionCard from '../components/ExhibitionCard.vue'
import { heroSlides, exhibitions, quarterlyArticles, shopItems } from '../data'

const quarterlyGridRef = ref(null)
const shopGridRef = ref(null)

const scrollQuarterly = () => {
  if (quarterlyGridRef.value) {
    const scrollAmount = quarterlyGridRef.value.offsetWidth * 0.8
    quarterlyGridRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

const scrollShop = () => {
  if (shopGridRef.value) {
    const scrollAmount = shopGridRef.value.offsetWidth * 0.8
    shopGridRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.quarterly-header,
.shop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.quarterly-header .section-title,
.shop-header .section-title {
  margin-bottom: 0;
}

.carousel-nav {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.carousel-nav--dark {
  color: var(--color-black);
}

.carousel-nav:hover {
  opacity: 1;
}

.carousel-nav svg {
  width: 24px;
  height: 24px;
}

/* Quarterly Grid */
.quarterly-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.quarterly-grid::-webkit-scrollbar {
  display: none;
}

.quarterly-card {
  cursor: pointer;
  flex: 0 0 calc(33.333% - 16px);
  min-width: 280px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
}

.quarterly-card img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  order: 1;
}

.quarterly-card__content {
  order: 2;
  padding-top: 12px;
}

.quarterly-card--text-top .quarterly-card__content {
  order: 0;
  padding-top: 0;
  padding-bottom: 12px;
}

.quarterly-card--text-top img {
  order: 1;
}

.quarterly-card__tag {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.quarterly-card__title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1.3;
}

.quarterly-card__excerpt {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
  line-height: 1.5;
}

/* Shop Grid */
.shop-grid {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.shop-grid::-webkit-scrollbar {
  display: none;
}

.shop-card {
  cursor: pointer;
  flex: 0 0 calc(25% - 18px);
  min-width: 220px;
  scroll-snap-align: start;
}

.shop-card__image {
  background: var(--color-gray-100);
  padding: 24px;
  margin-bottom: 16px;
}

.shop-card__image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.shop-card__title {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 8px;
}

.shop-card__price {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-bottom: 12px;
}

.shop-card__btn {
  padding: 8px 16px;
  border: 1px solid var(--color-black);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
}

.shop-card__btn:hover {
  background: var(--color-black);
  color: var(--color-white);
}

.see-more {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 1.125rem;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.see-more:hover {
  text-decoration-thickness: 2px;
}

@media (max-width: 1024px) {
  .quarterly-card {
    flex: 0 0 calc(50% - 12px);
  }

  .shop-card {
    flex: 0 0 calc(50% - 12px);
  }
}

@media (max-width: 640px) {
  .quarterly-card {
    flex: 0 0 calc(100% - 24px);
  }

  .shop-card {
    flex: 0 0 calc(100% - 24px);
  }
}
</style>
