<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { t } = useI18n();
const route = useRoute();

const currentLang = computed(() => {
  return route.path.split("/")[1] || "en";
});

const localePath = (path) => {
  const lang = currentLang.value;
  return `/${lang}${path ? `/${path}` : ""}`;
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
  >
    <!-- Hero Section -->
    <section class="relative px-6 py-20 mx-auto max-w-7xl overflow-hidden">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column: Hero Text -->
        <div class="text-center lg:text-left">
          <h1
            class="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4 leading-tight"
          >
            {{ t("home.title") }}
          </h1>
          <p
            class="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-rose-600 dark:text-rose-400 mb-6"
          >
            {{ t("home.subtitle") }}
          </p>
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            {{ t("home.aboutDesc") }}
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <router-link
              :to="localePath('scorer')"
              class="inline-flex items-center justify-center py-3 px-6 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-lg transition-colors duration-300 shadow-lg hover:shadow-rose-500/20"
              aria-label="Inizia a usare xScrabbler"
            >
              <LucidePlay class="w-5 h-5 mr-2" />
              {{ t("home.getStarted") }}
            </router-link>
            <a
              href="https://github.com/exSnake/scrabble-scorer"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-medium text-lg transition-colors duration-300 shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600"
              aria-label="Visita repository GitHub"
            >
              <LucideGithub class="w-5 h-5 mr-2" />
              GitHub
            </a>
          </div>
        </div>

        <!-- Right Column: Illustration or Screenshot -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-lg">
            <!-- Decorative word tiles as background elements -->
            <div
              class="absolute -top-4 -left-4 w-20 h-20 bg-amber-200 rounded border-2 border-amber-400 flex items-center justify-center rotate-6 shadow-md"
            >
              <span class="text-4xl font-bold text-gray-800">S</span>
              <span class="absolute bottom-1 right-2 text-sm font-bold">1</span>
            </div>
            <div
              class="absolute top-20 -right-8 w-16 h-16 bg-amber-200 rounded border-2 border-amber-400 flex items-center justify-center -rotate-12 shadow-md"
            >
              <span class="text-3xl font-bold text-gray-800">C</span>
              <span class="absolute bottom-1 right-2 text-sm font-bold">3</span>
            </div>
            <div
              class="absolute bottom-10 left-16 w-24 h-24 bg-blue-400 rounded border-2 border-blue-500 flex items-center justify-center rotate-3 shadow-md"
            >
              <span class="text-5xl font-bold text-gray-800">O</span>
              <span class="absolute bottom-1 right-2 text-sm font-bold">1</span>
            </div>
            <div
              class="absolute -bottom-12 right-12 w-20 h-20 bg-amber-200 rounded border-2 border-amber-400 flex items-center justify-center -rotate-6 shadow-md"
            >
              <span class="text-4xl font-bold text-gray-800">R</span>
              <span class="absolute bottom-1 right-2 text-sm font-bold">1</span>
            </div>
            <div
              class="absolute top-40 left-0 w-16 h-16 bg-blue-700 rounded border-2 border-blue-800 flex items-center justify-center rotate-12 shadow-md"
            >
              <span class="text-3xl font-bold text-white">E</span>
              <span
                class="absolute bottom-1 right-2 text-sm font-bold text-white"
                >1</span
              >
            </div>

            <!-- Main mockup device -->
            <div
              class="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 p-2 transform rotate-1"
            >
              <div
                class="border-2 rounded-xl overflow-hidden dark:border-gray-600"
              >
                <div
                  class="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b dark:border-gray-600 flex items-center"
                >
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 rounded-full bg-red-500" />
                    <div class="w-3 h-3 rounded-full bg-yellow-500" />
                    <div class="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div
                    class="text-center text-xs text-gray-500 dark:text-gray-400 w-full"
                  >
                    xScrabbler
                  </div>
                </div>
                <div class="p-6">
                  <div class="flex justify-center mb-6">
                    <div
                      class="flex items-center justify-center rounded-full w-28 h-28 bg-rose-100 dark:bg-rose-900/30"
                    >
                      <div
                        class="text-5xl font-bold text-rose-600 dark:text-rose-400"
                      >
                        42
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between items-center mb-4">
                    <div
                      class="text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {{ t("general.currentScore") }}
                    </div>
                    <div
                      class="text-xl font-bold text-gray-800 dark:text-white"
                    >
                      152
                    </div>
                  </div>
                  <div class="grid grid-cols-5 gap-1 mb-4">
                    <div
                      class="w-full aspect-square bg-amber-200 border-2 border-amber-400 rounded flex items-center justify-center"
                    >
                      <span class="text-xl font-bold text-gray-800">S</span>
                    </div>
                    <div
                      class="w-full aspect-square bg-amber-200 border-2 border-amber-400 rounded flex items-center justify-center"
                    >
                      <span class="text-xl font-bold text-gray-800">C</span>
                    </div>
                    <div
                      class="w-full aspect-square bg-blue-400 border-2 border-blue-500 rounded flex items-center justify-center"
                    >
                      <span class="text-xl font-bold text-gray-800">O</span>
                    </div>
                    <div
                      class="w-full aspect-square bg-amber-200 border-2 border-amber-400 rounded flex items-center justify-center"
                    >
                      <span class="text-xl font-bold text-gray-800">R</span>
                    </div>
                    <div
                      class="w-full aspect-square bg-amber-200 border-2 border-amber-400 rounded flex items-center justify-center"
                    >
                      <span class="text-xl font-bold text-gray-800">E</span>
                    </div>
                  </div>
                  <div
                    class="w-full h-10 bg-blue-500 rounded-lg text-white font-medium flex items-center justify-center"
                  >
                    {{ t("general.addButton") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      class="py-16 px-6 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ t("home.features") }}
          </h2>
          <div class="w-20 h-1 bg-rose-600 mx-auto" />
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideGlobe class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.multipleLanguages") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.multipleLanguagesDesc") }}
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideStar
                class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.wordBonus") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.wordBonusDesc") }}
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideClock class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.timer") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.timerDesc") }}
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideUsers class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.playerTracking") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.playerTrackingDesc") }}
            </p>
          </div>

          <!-- Feature 5 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideSettings
                class="w-6 h-6 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.customizable") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.customizableDesc") }}
            </p>
          </div>

          <!-- Feature 6 -->
          <div
            class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
          >
            <div
              class="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4"
            >
              <LucideCode class="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ t("home.openSource") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ t("home.openSourceDesc") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Ways to Play Section -->
    <section class="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {{ t("home.twoWaysTitle") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {{ t("home.twoWaysSubtitle") }}
          </p>
          <div class="w-20 h-1 bg-rose-600 mx-auto" />
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Board Mode -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div
              class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6"
            >
              <LucideGrid class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3
              class="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              {{ t("home.boardModeTitle") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {{ t("home.boardModeDesc") }}
            </p>
            <router-link
              :to="localePath('board')"
              class="inline-flex items-center justify-center py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {{ t("home.tryBoard") }}
            </router-link>
          </div>

          <!-- Scorer Mode -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div
              class="w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mb-6"
            >
              <LucideStar class="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h3
              class="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
            >
              {{ t("home.scorerModeTitle") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {{ t("home.scorerModeDesc") }}
            </p>
            <router-link
              :to="localePath('scorer')"
              class="inline-flex items-center justify-center py-3 px-6 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {{ t("home.tryScorer") }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 px-6 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-600 opacity-90"
      />
      <div class="relative z-10 max-w-5xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          {{ t("home.aboutTitle") }}
        </h2>
        <p class="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
          {{ t("home.aboutDesc") }}
        </p>
        <router-link
          :to="localePath('scorer')"
          class="inline-flex items-center justify-center py-3 px-8 rounded-lg bg-white hover:bg-gray-100 text-rose-600 font-medium text-lg transition-colors duration-300 shadow-lg"
          aria-label="Inizia subito a usare xScrabbler"
        >
          {{ t("home.quickStart") }}
        </router-link>
      </div>
    </section>

    <!-- Hidden SEO Content -->
    <section class="sr-only">
      <div>
        <h2>Calcolatore di punteggio per Scrabble e Scarabeo</h2>
        <p>
          xScrabbler è il miglior calcolatore di punteggio online per Scrabble e
          Scarabeo. Questo strumento gratuito ti permette di tenere traccia dei
          punteggi di tutti i giocatori in modo semplice e intuitivo. Aggiungi
          parole, calcola i bonus e visualizza il punteggio totale con
          un'interfaccia moderna e facile da usare.
        </p>
        <p>
          Ideale per partite di Scrabble o Scarabeo con amici e familiari,
          xScrabbler ti aiuta a concentrarti sul gioco senza preoccuparti di
          calcolare manualmente i punteggi.
        </p>
        <h2>Online Scrabble Score Tracker</h2>
        <p>
          xScrabbler is a free online score calculator for Scrabble and similar
          word games. This web application lets you easily track scores, add
          words, calculate bonuses, and manage game time with a built-in timer.
        </p>
        <p>
          Perfect for casual games or competitive matches, xScrabbler supports
          multiple languages including English, Italian, French, Spanish,
          German, Dutch, Portuguese, and Estonian, making it the ideal companion
          for your word games.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float {
  0% {
    transform: translateY(0px) rotate(-6deg);
  }
  50% {
    transform: translateY(-10px) rotate(-2deg);
  }
  100% {
    transform: translateY(0px) rotate(-6deg);
  }
}
</style>
