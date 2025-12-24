<script setup>
import PlayerDetails from "@/components/PlayerDetails.vue";
import TimerTool from "@/components/TimerTool.vue";
import { useGameStore } from "@/stores/GameStore";
import { TButton, TInput } from "@variantjs/vue";
import { ref } from "vue";
import ScorerAddWord from "@/components/ScorerAddWord.vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const newPlayerName = ref("");
const game = useGameStore();
const {
  activatePlayer,
  addPlayer,
  addWord,
  deletePlayer,
  deleteWord,
  pauseTimer,
  restartTimer,
} = game;
const { activePlayer, canAddPlayer, players, timer } = storeToRefs(game);

const handleDeleteWord = ({ id, player }) => {
  deleteWord({ wordId: id, player });
};

const handleAddPlayer = () => {
  addPlayer(newPlayerName.value);
  newPlayerName.value = "";
};

const handleAddWord = (word) => {
  addWord(word);
};
</script>

<template>
  <div
    class="container lg:px-32 mx-auto bg-white p-4 dark:bg-gray-700 h-screen w-s overflow-x-hidden"
  >
    <!-- Timer -->
    <TimerTool
      class="flex flex-1 w-full flex-col items-center rounded-lg bg-gray-100 px-6 py-4 text-7xl text-gray-600 dark:bg-gray-600 dark:text-white"
      :timer="timer"
      @restart="restartTimer()"
      @pause="pauseTimer()"
    />
    <div class="flex flex-wrap lg:flex-nowrap gap-2 items-start mt-2">
      <!-- Add Word -->
      <Transition>
        <div
          class="order-last flex w-full flex-col rounded-lg bg-gray-200 p-3 dark:bg-gray-600 lg:order-first"
          v-if="activePlayer"
        >
          <ScorerAddWord :enabled="activePlayer != null" @add="handleAddWord" />
        </div>
      </Transition>

      <!-- New Player -->
      <Transition>
        <div
          class="flex w-full flex-col rounded-lg bg-gray-200 p-3 dark:bg-gray-600 lg:w-2/4"
          v-if="canAddPlayer"
        >
          <div class="flex gap-4">
            <TInput
              :placeholder="t('scorerView.newPlayer')"
              class="h-10 bg-gray-100 px-3 py-1 text-black dark:bg-white"
              type="text"
              @keyup.enter="handleAddPlayer"
              v-model="newPlayerName"
            />
            <TButton
              class="h-10 cursor-pointer rounded-lg bg-blue-400 px-6 py-2 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-200"
              @click="handleAddPlayer"
              :disabled="!canAddPlayer"
            >
              {{ t("scorerView.add") }}
            </TButton>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Person -->
    <div>
      <Transition>
        <div v-if="players.length == 0" class="text-center mt-4">
          <div class="text-2xl">{{ t("scorerView.addPlayerToStart") }}</div>
        </div>
      </Transition>
      <Transition>
        <div v-if="players.length != 0">
          <!-- Players title with small hint to click in player to activate -->
          <div class="mt-4">
            <div class="text-2xl mb-2">{{ t("scorerView.players") }}</div>
            <div class="text-sm text-gray-500" v-if="activePlayer === null">
              {{ t("scorerView.selectPlayerToAddWord") }}
            </div>
          </div>
          <div class="flex flex-wrap items-start gap-4 justify-between">
            <PlayerDetails
              v-for="player in game.players"
              :key="player.id"
              class="w-full md:w-[300px]"
              :player="player"
              @deleteWord="handleDeleteWord"
              @delete="deletePlayer(player)"
              @activate="activatePlayer(player)"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active {
  transition: opacity 2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
