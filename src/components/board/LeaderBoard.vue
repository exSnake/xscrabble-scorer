<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

const { t } = useI18n();

const props = defineProps({
  players: {
    type: Array,
    default: () => [],
  },
  activePlayer: {
    type: Object,
    default: () => null,
  },
  canAddPlayer: {
    type: Boolean,
    default: false,
  },
  canResetBoard: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "selectPlayer",
  "activatePlayer",
  "addPlayer",
  "resetBoard",
]);

const newPlayerName = ref("");
const showResetConfirm = ref(false);

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => {
    const scoreA = a.words.reduce((sum, w) => sum + w.points, 0);
    const scoreB = b.words.reduce((sum, w) => sum + w.points, 0);
    return scoreB - scoreA;
  });
});

const getPlayerScore = (player) => {
  return player.words.reduce((sum, w) => sum + w.points, 0);
};

const getRank = (index) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `${index + 1}.`;
};

const handleAddPlayer = () => {
  if (newPlayerName.value.trim()) {
    emit("addPlayer", newPlayerName.value.trim());
    newPlayerName.value = "";
  }
};

const handleResetBoard = () => {
  showResetConfirm.value = true;
};

const handleResetConfirm = (confirmed) => {
  if (confirmed) {
    emit("resetBoard");
  }
  showResetConfirm.value = false;
};
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 flex flex-col h-full"
  >
    <h3
      class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
    >
      {{ t("boardView.ranking") }}
    </h3>

    <!-- Add Player Form -->
    <div v-if="canAddPlayer" class="mb-3">
      <div class="flex gap-2">
        <input
          v-model="newPlayerName"
          type="text"
          placeholder="Player name..."
          class="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
          @keyup.enter="handleAddPlayer"
        />
        <button
          :disabled="!newPlayerName.trim()"
          class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          @click="handleAddPlayer"
        >
          ➕
        </button>
      </div>
    </div>

    <div
      v-if="players.length === 0"
      class="flex-1 flex items-center justify-center"
    >
      <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
        {{ t("boardView.noPlayers") }}
      </p>
    </div>

    <div v-else class="space-y-2 flex-1 overflow-y-auto">
      <div
        v-for="(player, index) in sortedPlayers"
        :key="player.id"
        class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all group"
        :class="[
          activePlayer?.id === player.id
            ? 'bg-blue-100 dark:bg-blue-900 border border-blue-500 ring-blue-500'
            : 'bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500',
        ]"
        @click="emit('selectPlayer', player)"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <span
            class="text-lg font-bold text-gray-600 dark:text-gray-300 flex-shrink-0"
          >
            {{ getRank(index) }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-800 dark:text-white truncate">
              {{ player.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ player.words.length }}
              {{
                player.words.length === 1
                  ? t("common.oneWord")
                  : t("common.words")
              }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold text-gray-800 dark:text-white">
            {{ getPlayerScore(player) }}
          </span>
          <button
            v-if="!player.active"
            class="opacity-0 group-hover:opacity-100 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded font-semibold transition-all"
            @click.stop="emit('activatePlayer', player)"
          >
            Play
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Board Button -->
    <div
      v-if="canResetBoard"
      class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600"
    >
      <button
        class="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-semibold transition-colors"
        @click="handleResetBoard"
      >
        🔄 Reset Board
      </button>
    </div>

    <!-- Reset Confirmation Modal -->
    <ConfirmationModal
      v-model:show="showResetConfirm"
      :title="t('boardView.resetBoardTitle')"
      :message="t('boardView.confirmReset')"
      :options="[t('boardView.resetBoard'), t('boardView.cancel')]"
      @confirm="handleResetConfirm"
    />
  </div>
</template>
