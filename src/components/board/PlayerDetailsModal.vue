<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

const { t } = useI18n();

const props = defineProps({
  player: Object,
  show: Boolean,
});

const emit = defineEmits(["close", "deleteWord", "deletePlayer"]);

const showDeleteConfirm = ref(false);

const totalPoints = computed(() => {
  if (!props.player) return 0;
  return props.player.words.reduce((sum, w) => sum + w.points, 0);
});

const handleDeleteWord = (wordId) => {
  emit("deleteWord", { id: wordId, player: props.player });
};

const handleDeletePlayer = () => {
  showDeleteConfirm.value = true;
};

const handleDeleteConfirm = (confirmed) => {
  if (confirmed) {
    emit("deletePlayer", props.player);
    emit("close");
  }
  showDeleteConfirm.value = false;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show && player"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="emit('close')"
      >
        <div
          class="bg-white dark:bg-gray-700 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between"
          >
            <div>
              <h2 class="text-xl font-bold text-white">{{ player.name }}</h2>
              <p class="text-blue-100 text-sm">
                {{ totalPoints }} {{ t("playerDetails.points") }}
              </p>
            </div>
            <button
              @click="emit('close')"
              class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Words list -->
          <div class="flex-1 overflow-y-auto p-4">
            <h3
              class="text-sm font-bold uppercase text-gray-700 dark:text-gray-300 mb-3"
            >
              {{ t("playerDetails.words") }} ({{ player.words.length }})
            </h3>

            <div v-if="player.words.length === 0" class="text-center py-8">
              <p class="text-gray-500 dark:text-gray-400">
                {{ t("playerDetails.noWords") }}
              </p>
            </div>

            <div v-else class="space-y-2">
              <div
                v-for="word in player.words"
                :key="word.id"
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg group"
              >
                <div class="flex-1">
                  <p
                    class="font-semibold text-gray-800 dark:text-white uppercase"
                  >
                    {{ word.text }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ word.points }} {{ t("playerDetails.points") }}
                  </p>
                </div>
                <button
                  @click="handleDeleteWord(word.id)"
                  class="opacity-0 group-hover:opacity-100 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-semibold transition-all"
                >
                  {{ t("playerDetails.delete") }}
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="border-t border-gray-200 dark:border-gray-600 p-4 flex gap-2"
          >
            <button
              @click="handleDeletePlayer"
              class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            >
              {{ t("playerDetails.deletePlayer") }}
            </button>
            <button
              @click="emit('close')"
              class="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors"
            >
              {{ t("playerDetails.close") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Player Confirmation Modal -->
    <ConfirmationModal
      v-model:show="showDeleteConfirm"
      :title="t('playerDetails.deletePlayer')"
      :message="t('playerDetails.confirmDelete')"
      :options="[t('playerDetails.delete'), t('playerDetails.close')]"
      @confirm="handleDeleteConfirm"
    />
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}
</style>
