<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({});
const toggleDark = useToggle(isDark);
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
            alt="Flowbite Logo"
          />
          <RouterLink
            to="/"
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >xScrabbler
          </RouterLink>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <LucideMenu class="w-6 h-6" />
        </button>
        <button
          type="button"
          @click="toggleDark()"
          class="flex items-center p-2 ml-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <LucideMoon v-if="isDark" class="w-4 h-4" />
          <LucideSun v-if="!isDark" class="w-4 h-4" />
          <span class="sr-only">Toggle dark/light mode</span>
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
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/scorer"
                class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Scorer
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/settings"
                class="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md: dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Settings
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
  color: theme("colors.blue.600");
}
</style>
