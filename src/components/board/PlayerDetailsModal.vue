<script setup>
import { computed, ref, onBeforeUnmount, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

const { t } = useI18n();

const props = defineProps({
  player: {
    type: Object,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "close",
  "deleteWord",
  "deletePlayer",
  "updateWordPoints",
]);

const showDeleteConfirm = ref(false);
const editingWordId = ref(null);
const editingPoints = ref(0);
const editInputRef = ref(null);

// Cleanup: close modal when component is unmounted to prevent DOM errors
onBeforeUnmount(() => {
  if (props.show) {
    emit("close");
  }
});

// Close modal when show becomes false to ensure cleanup
watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      showDeleteConfirm.value = false;
      editingWordId.value = null;
    }
  },
);

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

// Edit word points functions
const startEditPoints = (word) => {
  editingWordId.value = word.id;
  editingPoints.value = word.points;
  nextTick(() => {
    if (editInputRef.value) {
      editInputRef.value.focus();
      editInputRef.value.select();
    }
  });
};

const cancelEditPoints = () => {
  editingWordId.value = null;
  editingPoints.value = 0;
};

const saveEditPoints = () => {
  if (editingWordId.value !== null) {
    emit("updateWordPoints", {
      wordId: editingWordId.value,
      player: props.player,
      newPoints: editingPoints.value,
    });
    editingWordId.value = null;
    editingPoints.value = 0;
  }
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
              class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              @click="emit('close')"
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
                  <!-- Normal view: show points -->
                  <p
                    v-if="editingWordId !== word.id"
                    class="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ word.points }} {{ t("playerDetails.points") }}
                  </p>
                  <!-- Edit mode: show input -->
                  <div v-else class="flex items-center gap-2 mt-1">
                    <input
                      ref="editInputRef"
                      v-model.number="editingPoints"
                      type="number"
                      class="w-20 px-2 py-1 text-sm rounded border border-blue-400 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      @keyup.enter="saveEditPoints"
                      @keyup.esc="cancelEditPoints"
                    />
                    <button
                      class="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded font-semibold"
                      @click="saveEditPoints"
                    >
                      ✓
                    </button>
                    <button
                      class="px-2 py-1 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded font-semibold"
                      @click="cancelEditPoints"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <!-- Action buttons -->
                <div
                  v-if="editingWordId !== word.id"
                  class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <button
                    class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-semibold"
                    @click="startEditPoints(word)"
                  >
                    {{ t("playerDetails.edit") }}
                  </button>
                  <button
                    class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-semibold"
                    @click="handleDeleteWord(word.id)"
                  >
                    {{ t("playerDetails.delete") }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="border-t border-gray-200 dark:border-gray-600 p-4 flex gap-2"
          >
            <button
              class="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              @click="handleDeletePlayer"
            >
              {{ t("playerDetails.deletePlayer") }}
            </button>
            <button
              class="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg font-semibold transition-colors"
              @click="emit('close')"
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
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
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
