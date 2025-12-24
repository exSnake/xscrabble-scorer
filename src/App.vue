<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";

const isDark = useDark({});
const toggleDark = useToggle(isDark);
const { t, locale } = useI18n();
const storedLocale = useStorage("locale", "it");

// Sync locale with storage
locale.value = storedLocale.value;

const changeLocale = (newLocale) => {
  locale.value = newLocale;
  storedLocale.value = newLocale;
};

const languages = [
  { code: "it", name: "IT", flag: "🇮🇹" },
  { code: "en", name: "EN", flag: "🇬🇧" },
];
</script>

<template>
  <div class="dark:bg-gray-700 h-screen">
    <nav
      class="p-2 bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700"
    >
      <div
        class="container flex flex-wrap items-center justify-between mx-auto"
      >
        <a href="#" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-6 mr-3 sm:h-10"
            :alt="t('app.logoAlt')"
          />
          <RouterLink
            to="/"
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >xScrabbler
          </RouterLink>
        </a>
        <!-- Language Selector -->
        <div class="flex items-center gap-2 mr-2">
          <select
            v-model="locale"
            @change="changeLocale(locale)"
            class="text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.flag }} {{ lang.name }}
            </option>
          </select>
        </div>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span class="sr-only">{{ t("app.openMainMenu") }}</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          @click="toggleDark()"
          class="flex items-center p-2 ml-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <svg
            aria-hidden="true"
            data-toggle-icon="moon"
            class="w-4 h-4 hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            data-toggle-icon="sun"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">{{ t("app.toggleDarkMode") }}</span>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul
            class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <RouterLink
                to="/"
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {{ t("nav.home") }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/scorer"
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {{ t("nav.scorer") }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/board"
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {{ t("nav.boardGame") }}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/settings"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md: dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                {{ t("nav.settings") }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.active {
  color: theme(colors.blue.600);
}
</style>
