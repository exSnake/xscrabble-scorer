<script setup>
import { ref } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const { t } = useI18n();

const boardGame = useBoardGameStore();
const { exportGameState, importGameState, generateShareableLink } = boardGame;

const showImportModal = ref(false);
const importLink = ref("");
const fileInputRef = ref(null);

const handleExport = () => {
  try {
    const gameState = exportGameState();
    const blob = new Blob([gameState], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scrabble-game-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("gameExportImport.exportSuccess"));
  } catch (error) {
    console.error("Export error:", error);
    toast.error(t("gameExportImport.exportError"));
  }
};

const handleImportFile = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const gameState = e.target.result;
      importGameState(gameState);
      toast.success(t("gameExportImport.importSuccess"));
      showImportModal.value = false;
      // Reset file input
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error(t("gameExportImport.importError"));
    }
  };
  reader.readAsText(file);
};

const handleGenerateLink = () => {
  try {
    const link = generateShareableLink();
    importLink.value = link;
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      toast.success(t("gameExportImport.linkCopied"));
    });
  } catch (error) {
    console.error("Generate link error:", error);
    toast.error(t("gameExportImport.linkError"));
  }
};

const handleImportLink = () => {
  if (!importLink.value.trim()) {
    toast.error(t("gameExportImport.emptyLink"));
    return;
  }

  try {
    // Extract game parameter from URL if full URL provided
    let gameParam = importLink.value;
    if (gameParam.includes("?game=")) {
      gameParam = gameParam.split("?game=")[1].split("&")[0];
    }

    // Supporta sia Base64URL (formato nuovo) che Base64 standard (formato vecchio)
    let decoded;
    try {
      // Prova prima Base64URL (formato nuovo, più compatto)
      // Base64URL usa - e _ invece di + e /, e non ha padding =
      let base64 = gameParam.replace(/-/g, "+").replace(/_/g, "/");
      // Aggiungi padding se necessario
      while (base64.length % 4) {
        base64 += "=";
      }
      decoded = atob(base64);
    } catch {
      // Se fallisce, prova Base64 standard (formato vecchio)
      decoded = decodeURIComponent(atob(gameParam));
    }

    importGameState(decoded);
    toast.success(t("gameExportImport.importSuccess"));
    showImportModal.value = false;
    importLink.value = "";
  } catch (error) {
    console.error("Import link error:", error);
    toast.error(t("gameExportImport.importError"));
  }
};

const openImportModal = () => {
  showImportModal.value = true;
  importLink.value = "";
};
</script>

<template>
  <div class="flex gap-2">
    <button
      class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg font-semibold transition-colors flex items-center gap-2"
      @click="handleExport"
    >
      <span>💾</span>
      <span>{{ t("gameExportImport.export") }}</span>
    </button>

    <button
      class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-semibold transition-colors flex items-center gap-2"
      @click="openImportModal"
    >
      <span>📥</span>
      <span>{{ t("gameExportImport.import") }}</span>
    </button>

    <button
      class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg font-semibold transition-colors flex items-center gap-2"
      @click="handleGenerateLink"
    >
      <span>🔗</span>
      <span>{{ t("gameExportImport.share") }}</span>
    </button>
  </div>

  <!-- Import Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showImportModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click.self="showImportModal = false"
      >
        <div
          class="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-md mx-4 w-full space-y-4"
        >
          <h3 class="text-xl font-bold dark:text-white">
            {{ t("gameExportImport.importTitle") }}
          </h3>

          <div class="space-y-4">
            <!-- File Import -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {{ t("gameExportImport.importFile") }}
              </label>
              <input
                ref="fileInputRef"
                type="file"
                accept=".json,application/json"
                class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                @change="handleImportFile"
              />
            </div>

            <!-- Link Import -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {{ t("gameExportImport.importLink") }}
              </label>
              <div class="flex gap-2">
                <input
                  v-model="importLink"
                  type="text"
                  :placeholder="t('gameExportImport.linkPlaceholder')"
                  class="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-600 dark:text-white border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                  @keyup.enter="handleImportLink"
                />
                <button
                  class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-semibold transition-colors"
                  @click="handleImportLink"
                >
                  {{ t("gameExportImport.import") }}
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white text-sm rounded-lg font-semibold transition-colors"
              @click="showImportModal = false"
            >
              {{ t("general.cancelButton") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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
</style>
