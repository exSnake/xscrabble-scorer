<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { ref, onMounted, watch, computed, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

// Ottieni la lingua corrente dalla route
const currentLang = computed(() => route.path.split("/")[1] || "en");

// Sync vue-i18n locale with route language
watch(
  currentLang,
  (newLang) => {
    if (newLang && locale.value !== newLang) {
      locale.value = newLang;
      localStorage.setItem("locale", newLang);
    }
  },
  { immediate: true },
);

// Genera percorsi localizzati
const localePath = (path) => {
  const lang = currentLang.value;
  if (path) {
    return `/${lang}/${path}`;
  }
  return "/" + lang;
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

// Gestione dropdown lingua
const isLangDropdownOpen = ref(false);
const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

// Lingue supportate con bandiere e nomi
const languages = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "nl", flag: "🇳🇱", name: "Nederlands" },
  { code: "et", flag: "🇪🇪", name: "Eesti" },
  { code: "pt", flag: "🇵🇹", name: "Português" },
];

const currentLanguage = computed(() => {
  return (
    languages.find((lang) => lang.code === currentLang.value) || languages[0]
  );
});

const changeLanguage = (langCode) => {
  const currentPath = route.path.replace(/^\/[^/]+/, "");
  router.push(`/${langCode}${currentPath}`);
  isLangDropdownOpen.value = false;
  isMenuOpen.value = false;
};

// Chiudi il menu quando si cambia route
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
    isLangDropdownOpen.value = false;
  },
);

// Chiudi dropdown quando si fa click fuori
const handleClickOutside = (e) => {
  const langDropdown = document.getElementById("lang-dropdown");
  const langButton = document.getElementById("lang-button");
  const menu = document.getElementById("navbar-menu");
  const menuToggle = document.getElementById("menu-toggle");

  if (
    langDropdown &&
    langButton &&
    !langDropdown.contains(e.target) &&
    !langButton.contains(e.target)
  ) {
    isLangDropdownOpen.value = false;
  }

  if (
    menu &&
    menuToggle &&
    !menu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all duration-300"
    role="navigation"
    aria-label="Menu principale"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink
          :to="localePath('')"
          class="flex items-center gap-2 sm:gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Homepage xScrabbler"
        >
          <img
            src="/logo/logo.svg"
            alt="xScrabbler Logo"
            class="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            xScrabbler
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <RouterLink
            :to="localePath('')"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{
              'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                isActive(''),
            }"
            role="menuitem"
          >
            {{ t("nav.home") }}
          </RouterLink>
          <RouterLink
            :to="localePath('scorer')"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{
              'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                isActive('scorer'),
            }"
            role="menuitem"
          >
            {{ t("nav.scorer") }}
          </RouterLink>
          <RouterLink
            :to="localePath('board')"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{
              'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                isActive('board'),
            }"
            role="menuitem"
          >
            {{ t("nav.boardGame") }}
          </RouterLink>
          <RouterLink
            :to="localePath('settings')"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :class="{
              'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                isActive('settings'),
            }"
            role="menuitem"
          >
            {{ t("nav.settings") }}
          </RouterLink>
        </div>

        <!-- Right side controls (Desktop) -->
        <div class="hidden lg:flex items-center gap-2">
          <!-- Language Selector -->
          <div id="lang-dropdown" class="relative">
            <button
              id="lang-button"
              class="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Seleziona lingua"
              :aria-expanded="isLangDropdownOpen"
              aria-haspopup="true"
              @click="toggleLangDropdown"
            >
              <span class="text-xl">{{ currentLanguage.flag }}</span>
              <LucideChevronDown
                class="w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': isLangDropdownOpen }"
              />
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-if="isLangDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                role="menu"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  :class="{
                    'bg-gray-100 dark:bg-gray-700 text-rose-600 dark:text-rose-400':
                      lang.code === currentLang,
                  }"
                  role="menuitem"
                  @click="changeLanguage(lang.code)"
                >
                  <span class="text-xl">{{ lang.flag }}</span>
                  <span>{{ lang.name }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
            @click="toggleDark()"
          >
            <LucideMoon
              v-if="isDark"
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
            />
            <LucideSun v-if="!isDark" class="w-5 h-5 text-amber-500" />
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="flex lg:hidden items-center gap-2">
          <!-- Language Selector (Mobile - solo bandiera) -->
          <div id="lang-dropdown" class="relative">
            <button
              id="lang-button"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Seleziona lingua"
              :aria-expanded="isLangDropdownOpen"
              aria-haspopup="true"
              @click="toggleLangDropdown"
            >
              <span class="text-xl">{{ currentLanguage.flag }}</span>
            </button>

            <!-- Dropdown Menu Mobile -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-if="isLangDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                role="menu"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  :class="{
                    'bg-gray-100 dark:bg-gray-700 text-rose-600 dark:text-rose-400':
                      lang.code === currentLang,
                  }"
                  role="menuitem"
                  @click="changeLanguage(lang.code)"
                >
                  <span class="text-xl">{{ lang.flag }}</span>
                  <span>{{ lang.name }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Dark Mode Toggle (Mobile) -->
          <button
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
            @click="toggleDark()"
          >
            <LucideMoon
              v-if="isDark"
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
            />
            <LucideSun v-if="!isDark" class="w-5 h-5 text-amber-500" />
          </button>

          <!-- Hamburger Menu Button -->
          <button
            id="menu-toggle"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
            :aria-expanded="isMenuOpen"
            aria-controls="navbar-menu"
            @click.stop="toggleMenu"
          >
            <LucideX
              v-if="isMenuOpen"
              class="w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-200"
            />
            <LucideMenu
              v-else
              class="w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMenuOpen"
        id="navbar-menu"
        class="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        role="menu"
        aria-label="Menu mobile"
      >
        <div class="container mx-auto px-4 py-4">
          <nav class="flex flex-col space-y-1">
            <RouterLink
              :to="localePath('')"
              class="px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              :class="{
                'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                  isActive(''),
              }"
              role="menuitem"
              @click="isMenuOpen = false"
            >
              {{ t("nav.home") }}
            </RouterLink>
            <RouterLink
              :to="localePath('scorer')"
              class="px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              :class="{
                'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                  isActive('scorer'),
              }"
              role="menuitem"
              @click="isMenuOpen = false"
            >
              {{ t("nav.scorer") }}
            </RouterLink>
            <RouterLink
              :to="localePath('board')"
              class="px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              :class="{
                'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                  isActive('board'),
              }"
              role="menuitem"
              @click="isMenuOpen = false"
            >
              {{ t("nav.boardGame") }}
            </RouterLink>
            <RouterLink
              :to="localePath('settings')"
              class="px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              :class="{
                'bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400':
                  isActive('settings'),
              }"
              role="menuitem"
              @click="isMenuOpen = false"
            >
              {{ t("nav.settings") }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </Transition>
  </nav>
</template>
