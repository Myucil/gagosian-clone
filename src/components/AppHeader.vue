<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container">
      <router-link to="/" class="header__logo">
        {{ isScrolled || !isHome ? 'Gagosian' : 'GAGOSIAN' }}
      </router-link>

      <nav class="header__nav">
        <router-link to="/exhibitions" class="header__link">Exhibitions</router-link>
        <router-link to="/artists" class="header__link">Artists</router-link>
        <a href="#" class="header__link">Fairs & Collecting</a>
        <a href="#" class="header__link">Quarterly</a>
        <a href="#" class="header__link">News</a>
        <a href="#" class="header__link">Locations</a>
        <a href="#" class="header__link">Shop</a>
        <a href="#" class="header__link">Premieres</a>
      </nav>

      <div class="header__actions">
        <a href="#" class="header__link">Subscribe</a>
        <button class="header__link">Search</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isScrolled = ref(false)

const isHome = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  transition: all var(--transition-base);
}

.header--scrolled {
  background: var(--color-white);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.header__logo {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-black);
  transition: color var(--transition-fast);
}

.header:not(.header--scrolled) .header__logo {
  color: var(--color-white);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__link {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  transition: color var(--transition-fast);
}

.header:not(.header--scrolled) .header__link {
  color: rgba(255, 255, 255, 0.8);
}

.header__link:hover {
  color: var(--color-black);
}

.header:not(.header--scrolled) .header__link:hover {
  color: var(--color-white);
}

.header__link.router-link-active {
  font-weight: 600;
  color: var(--color-black);
}

.header:not(.header--scrolled) .header__link.router-link-active {
  color: var(--color-white);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

@media (max-width: 1024px) {
  .header__nav {
    display: none;
  }
}
</style>
