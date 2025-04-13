<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { ref, onMounted, watch, computed, onBeforeUnmount } from "vue";
import { useLocaleStore } from "@/stores/LocaleStore";

const localeStore = useLocaleStore();
const { t } = localeStore;
const route = useRoute();

// Ottieni la lingua corrente dalla route
const currentLang = computed(() => {
  const lang = route.path.split("/")[1] || "en";
  return lang;
});

// Genera percorsi localizzati
const localePath = (path) => {
  const lang = currentLang.value;
  const fullPath = `/${lang}${path ? `/${path}` : ""}`;
  return fullPath;
};

// Verifica se un percorso è attivo
const isActive = (path) => {
  const fullPath = localePath(path);
  const isExactMatch = route.path === fullPath;
  const isSubPath = path && route.path.startsWith(fullPath);
  return isExactMatch || isSubPath;
};

const isDark = useDark({});
const toggleDark = useToggle(isDark);

// Gestione menu mobile
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Chiudi il menu quando si cambia route
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  }
);

// Chiudi il menu quando si fa click fuori
onMounted(() => {
  document.addEventListener("click", (e) => {
    const menu = document.getElementById("navbar-menu");
    const toggle = document.getElementById("menu-toggle");
    if (menu && !menu.contains(e.target) && !toggle.contains(e.target)) {
      isMenuOpen.value = false;
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", (e) => {
    const menu = document.getElementById("navbar-menu");
    const toggle = document.getElementById("menu-toggle");
    if (menu && !menu.contains(e.target) && !toggle.contains(e.target)) {
      isMenuOpen.value = false;
    }
  });
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <!-- Navbar -->
    <nav
      class="sticky pl-4 top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200"
      role="navigation"
      aria-label="Menu principale"
    >
      <div
        class="container mx-auto px-4 py-3 flex items-center justify-between"
      >
        <!-- Logo e titolo -->
        <RouterLink
          :to="localePath('')"
          class="flex items-center gap-2"
          aria-label="Homepage xScrabbler"
        >
          <div class="relative flex items-center">
            <div
              class="absolute w-8 h-8 bg-amber-200 rounded border-2 border-amber-400 flex items-center justify-center rotate-6 shadow-sm"
            >
              <span class="text-lg font-bold text-gray-800">S</span>
            </div>
            <div
              class="absolute -right-2 w-8 h-8 bg-blue-400 rounded border-2 border-blue-500 flex items-center justify-center -rotate-6 shadow-sm z-10"
            >
              <span class="text-lg font-bold text-gray-800">X</span>
            </div>
          </div>
          <span
            class="text-xl font-bold ml-10 text-gray-900 dark:text-white tracking-tighter"
          >
            xScrabbler
          </span>
        </RouterLink>

        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDark()"
          class="z-40 p-3 rounded-full bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Toggle dark mode"
        >
          <LucideMoon v-if="isDark" class="w-5 h-5 text-blue-600" />
          <LucideSun v-if="!isDark" class="w-5 h-5 text-amber-500" />
          <span class="sr-only">{{
            isDark ? t("nav.lightMode") : t("nav.darkMode")
          }}</span>
        </button>

        <!-- Menu Toggle (Mobile) -->
        <button
          id="menu-toggle"
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
          aria-expanded="isMenuOpen"
          aria-controls="navbar-menu"
        >
          <LucideMenu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1" role="menubar">
          <RouterLink
            :to="localePath('')"
            class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800 font-medium transition-colors"
            :class="{
              'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                isActive(''),
            }"
            role="menuitem"
          >
            {{ t("nav.home") }}
          </RouterLink>
          <RouterLink
            :to="localePath('scorer')"
            class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800 font-medium transition-colors"
            :class="{
              'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                isActive('scorer'),
            }"
            role="menuitem"
          >
            {{ t("nav.scorer") }}
          </RouterLink>
          <RouterLink
            :to="localePath('settings')"
            class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800 font-medium transition-colors"
            :class="{
              'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                isActive('settings'),
            }"
            role="menuitem"
          >
            {{ t("nav.settings") }}
          </RouterLink>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        id="navbar-menu"
        :class="{
          'translate-x-0 opacity-100': isMenuOpen,
          '-translate-x-full opacity-0 lg:hidden': !isMenuOpen,
        }"
        class="fixed inset-0 z-20 w-full h-screen lg:hidden transition-all duration-300 transform ease-in-out bg-white/95 dark:bg-gray-900/95 backdrop-blur-md pt-20"
        role="menu"
        aria-label="Menu mobile"
      >
        <div class="container mx-auto px-6 py-8">
          <div class="flex flex-col space-y-3">
            <RouterLink
              :to="localePath('')"
              class="px-4 py-3 rounded-lg text-lg font-medium border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800"
              :class="{
                'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                  isActive(''),
              }"
              @click="isMenuOpen = false"
              role="menuitem"
            >
              {{ t("nav.home") }}
            </RouterLink>
            <RouterLink
              :to="localePath('scorer')"
              class="px-4 py-3 rounded-lg text-lg font-medium border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800"
              :class="{
                'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                  isActive('scorer'),
              }"
              @click="isMenuOpen = false"
              role="menuitem"
            >
              {{ t("nav.scorer") }}
            </RouterLink>
            <RouterLink
              :to="localePath('settings')"
              class="px-4 py-3 rounded-lg text-lg font-medium border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-gray-800"
              :class="{
                'bg-rose-100 dark:bg-gray-700 text-rose-600 dark:text-white':
                  isActive('settings'),
              }"
              @click="isMenuOpen = false"
              role="menuitem"
            >
              {{ t("nav.settings") }}
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: theme("colors.rose.600");
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
