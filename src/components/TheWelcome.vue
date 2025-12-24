<script setup>
// Homepage component - no imports needed
</script>

<template>
  <header
    class="items-center dark:bg-gray-600 bg-white flex max-w-[480px] w-full flex-col mx-auto px-8 py-12"
  >
    <router-link
      :to="{ name: 'scorer' }"
      class="dark:bg-gray-900 bg-gray-200 rounded mt-6 px-6 py-4 flex justify-center items-stretch gap-2.5"
    >
      <font-awesome-icon
        icon="fa-solid fa-play"
        class="w-7 h-7 text-pink-700"
      />
      <div
        class="self-center my-auto text-3xl font-medium leading-6 tracking-wider dark:text-zinc-300 whitespace-nowrap"
      >
        QUICK START
      </div>
    </router-link>
    <div
      class="dark:text-white text-gray-800 text-center text-3xl tracking-[4.16px] self-stretch mt-20"
    >
      <h1 class="text-7xl">SCRABBLE</h1>
      <p class="tracking-[4.16px]">SCORE CALCULATOR</p>
    </div>
    <hr class="self-center w-20 h-2 mt-20 bg-rose-600 rounded-lg flex-col" />
    <div
      class="dark:text-white text-gray-800 text-center text-xl font-medium leading-7 tracking-widest max-w-[273px] self-center mt-16"
    >
      <p>Improve it</p>
      <p>it's open source on GitHub</p>
    </div>
    <a
      class="justify-between items-stretch bg-black rounded self-center flex gap-5 mt-16 mb-44 px-5 py-5"
      href="https://github.com/exSnake/scrabble-scorer"
      target="_blank"
    >
      <font-awesome-icon
        icon="fa-brands fa-github"
        class="w-12 h-12 text-white"
      />
      <div
        class="my-auto text-5xl font-medium leading-6 tracking-wider text-zinc-300"
      >
        GITHUB
      </div>
    </a>
  </header>
</template>
