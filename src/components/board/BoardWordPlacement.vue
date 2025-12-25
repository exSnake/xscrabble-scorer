<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  enabled: Boolean,
});

defineEmits(["place"]);

const boardGame = useBoardGameStore();
const { selectedCell, direction, bonus } = storeToRefs(boardGame);
const { updatePreviewWord, placeWordFromPreview, clearSelection } = boardGame;

const word = ref("");
const inputRef = ref(null);
const showInstructions = ref(false);
const hasBonus = ref(false); // Toggle per il bonus (bingo - tutte le tessere usate)
let focusTimeout = null;

// Watch for word changes to update preview
watch(word, (newWord) => {
  updatePreviewWord(newWord);
});

// Auto-focus input when cell is selected or direction changes
const focusInput = () => {
  // Clear any pending timeout
  if (focusTimeout) {
    clearTimeout(focusTimeout);
  }

  focusTimeout = setTimeout(() => {
    // Check if inputRef still exists and is mounted
    if (inputRef.value && inputRef.value.parentNode) {
      try {
        inputRef.value.focus({ preventScroll: true });
      } catch (e) {
        // Ignore focus errors during component unmount
        console.debug("Focus error (likely during unmount):", e);
      }
    }
  }, 50);
};

watch(selectedCell, (newCell) => {
  if (newCell) {
    focusInput();
  }
});

watch(direction, () => {
  if (selectedCell.value) {
    focusInput();
  }
});

// Cleanup on unmount
onBeforeUnmount(() => {
  if (focusTimeout) {
    clearTimeout(focusTimeout);
  }
  // Clear selection when component unmounts
  clearSelection();
});

function toggleBonus() {
  hasBonus.value = !hasBonus.value;
}

function handlePlace() {
  if (!word.value || !selectedCell.value) {
    return;
  }

  placeWordFromPreview(hasBonus.value);

  // Reset
  word.value = "";
  hasBonus.value = false;
}

function handleClear() {
  word.value = "";
  hasBonus.value = false;
  clearSelection();
}
</script>

<template>
  <div>
    <!-- Floating input when cell is selected -->
    <Transition name="slide-down">
      <div
        v-if="selectedCell"
        class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
      >
        <div
          class="bg-white dark:bg-gray-700 rounded-lg shadow-2xl p-3 border-2 border-blue-500"
        >
          <div class="flex gap-2 items-end">
            <div class="flex-1">
              <label
                for="word-input-floating"
                class="text-2xs uppercase text-gray-600 dark:text-gray-400 block mb-1 font-semibold"
                >{{ t("boardWordPlacement.wordLabel") }}</label
              >
              <div class="flex">
                <input
                  id="word-input-floating"
                  ref="inputRef"
                  v-model="word"
                  class="h-10 w-full uppercase bg-gray-50 dark:bg-gray-600 dark:text-white font-mono text-base px-3 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-700 transition-all"
                  :class="{
                    '!border-green-500 border-2 !bg-green-50 dark:!bg-green-900/30':
                      hasBonus,
                  }"
                  :placeholder="t('boardWordPlacement.placeholder')"
                  :disabled="!enabled"
                  @keyup.enter="handlePlace"
                  @keyup.esc="handleClear"
                />
                <!-- Bonus Toggle Button -->
                <button
                  type="button"
                  class="h-10 px-2 rounded-r-lg text-white text-xs font-bold transition-all select-none"
                  :class="{
                    'bg-green-500 hover:bg-green-600': hasBonus,
                    'bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400':
                      !hasBonus,
                  }"
                  :title="t('boardWordPlacement.bonusTooltip')"
                  @click="toggleBonus"
                >
                  B
                </button>
              </div>
              <div
                v-if="hasBonus"
                class="text-xs text-green-600 dark:text-green-400 mt-1"
              >
                {{ t("boardWordPlacement.bonusActive", { bonus: bonus }) }}
              </div>
            </div>

            <button
              class="h-10 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm text-sm whitespace-nowrap"
              :disabled="!enabled || !word"
              @click="handlePlace"
            >
              {{ t("boardWordPlacement.placeWord") }}
            </button>

            <button
              class="h-10 px-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white font-semibold rounded-lg transition-all text-sm"
              title="Clear (ESC)"
              @click="handleClear"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Instructions Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showInstructions"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          @click.self="showInstructions = false"
        >
          <div
            class="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-md mx-4 space-y-4"
          >
            <h3 class="text-xl font-bold dark:text-white">
              {{ t("boardWordPlacement.instructionsTitle") }}
            </h3>
            <div class="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="t('boardWordPlacement.instruction1')"></p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="t('boardWordPlacement.instruction2')"></p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="t('boardWordPlacement.instruction3')"></p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="t('boardWordPlacement.instruction4')"></p>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="t('boardWordPlacement.instruction5')"></p>
              <p class="pt-2 border-t border-gray-300 dark:border-gray-600">
                <strong>{{ t("boardWordPlacement.firstWordRule") }}</strong>
              </p>
              <p>
                <strong>{{ t("boardWordPlacement.nextWordsRule") }}</strong>
              </p>
            </div>
            <button
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              @click="showInstructions = false"
            >
              {{ t("boardWordPlacement.gotIt") }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}

/* Slide down animation for floating input */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%) translateX(-50%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-20px) translateX(-50%);
  opacity: 0;
}
</style>
