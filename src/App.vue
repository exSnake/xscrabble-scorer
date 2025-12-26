<script setup>
import { RouterView, useRoute } from "vue-router";
import { watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Analytics } from "@vercel/analytics/vue";
import NavBar from "@/components/NavBar.vue";
import CookieConsent from "@/components/CookieConsent.vue";
import Footer from "@/components/Footer.vue";
import { useAnalytics } from "@/composables/useAnalytics";

const { locale } = useI18n();
const route = useRoute();
const { trackPageView, hasConsent, initGA } = useAnalytics();

// Initialize GA if consent was already given
if (hasConsent()) {
  initGA();
}

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

// Track page views on route change
watch(
  () => route.fullPath,
  (newPath) => {
    trackPageView(newPath, document.title);
  },
);
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <Analytics />

    <!-- Cookie Consent Banner -->
    <CookieConsent />

    <!-- NavBar -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- Global Footer -->
    <Footer />
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
