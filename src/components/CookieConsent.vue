<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAnalytics } from "@/composables/useAnalytics";

const { t } = useI18n();
const { initGA } = useAnalytics();

const showBanner = ref(false);
const isVisible = ref(false);

const CONSENT_KEY = "cookie_consent";
const ANIMATION_DURATION = 300; // ms

onMounted(() => {
  const consent = localStorage.getItem(CONSENT_KEY);

  if (consent === null) {
    // No decision yet, show banner
    showBanner.value = true;
    // Small delay for animation
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  } else if (consent === "accepted") {
    // Already accepted, init GA
    initGA();
  }
  // If refused, do nothing
});

const acceptCookies = () => {
  localStorage.setItem(CONSENT_KEY, "accepted");
  initGA();
  closeBanner();
};

const refuseCookies = () => {
  localStorage.setItem(CONSENT_KEY, "refused");
  closeBanner();
};

const closeBanner = () => {
  isVisible.value = false;
  setTimeout(() => {
    showBanner.value = false;
  }, ANIMATION_DURATION);
};
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="showBanner && isVisible"
        class="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div
          class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-6"
        >
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <!-- Icon and Text -->
            <div class="flex-1">
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 flex-shrink-0 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-rose-600 dark:text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    {{ t("cookies.title") }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ t("cookies.description") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                @click="refuseCookies"
              >
                {{ t("cookies.refuse") }}
              </button>
              <button
                class="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-md"
                @click="acceptCookies"
              >
                {{ t("cookies.accept") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
