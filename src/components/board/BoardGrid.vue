<script setup>
import { computed } from "vue";
import { useBoardGameStore } from "@/stores/BoardGameStore";
import { useSoundEffects } from "@/composables/useSoundEffects";
import { storeToRefs } from "pinia";

const props = defineProps({
  grid: {
    type: Array,
    required: true,
  },
  boardConfig: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const boardGame = useBoardGameStore();
const { selectedCell, direction, previewCells } = storeToRefs(boardGame);
const { selectCell, getMultiplierAtPosition, getCharacterPoints } = boardGame;

const { playCellSelect } = useSoundEffects();

const gridSize = computed(() => props.grid?.length || 15);
const centerPosition = computed(() => Math.floor(gridSize.value / 2));

function handleCellClick(row, col) {
  // Don't allow clicks if board is disabled
  if (props.disabled) return;

  // Allow selection even if cell is occupied (to start words from existing letters)
  selectCell(row, col);
  playCellSelect();
}

function isCellSelected(row, col) {
  return (
    selectedCell.value &&
    selectedCell.value.row === row &&
    selectedCell.value.col === col
  );
}

function isCellInPreview(row, col) {
  return previewCells.value.some(
    (cell) => cell.row === row && cell.col === col,
  );
}

function getPreviewLetter(row, col) {
  const previewCell = previewCells.value.find(
    (cell) => cell.row === row && cell.col === col,
  );
  return previewCell?.letter || "";
}

function getCellClass(row, col, cell) {
  const multiplier = getMultiplierAtPosition(row, col, props.boardConfig);

  const baseClass =
    "relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-gray-400 flex items-center justify-center text-xs md:text-sm font-bold transition-all";

  let classes = baseClass;

  // If cell has a placed letter
  if (cell.letter) {
    classes += " bg-amber-200 text-gray-800 dark:bg-amber-300 cursor-pointer";
    // Add ring if this cell is selected
    if (isCellSelected(row, col)) {
      classes += " ring-2 ring-yellow-500";
    }
  }
  // If cell is in preview
  else if (isCellInPreview(row, col)) {
    classes += " bg-green-200 text-gray-800 dark:bg-green-400 cursor-pointer";
  }
  // If cell is selected
  else if (isCellSelected(row, col)) {
    classes +=
      " bg-yellow-200 dark:bg-yellow-400 cursor-pointer ring-2 ring-yellow-500";
  }
  // If cell is center
  else if (row === centerPosition.value && col === centerPosition.value) {
    classes += " bg-pink-500 text-white cursor-pointer hover:bg-pink-600";
  }
  // If cell has multiplier
  else if (multiplier.type === "letter") {
    if (multiplier.value === 2) {
      classes += " bg-blue-300 text-white cursor-pointer hover:bg-blue-400";
    } else if (multiplier.value === 3) {
      classes += " bg-blue-600 text-white cursor-pointer hover:bg-blue-700";
    }
  } else if (multiplier.type === "word") {
    if (multiplier.value === 2) {
      classes += " bg-red-300 text-white cursor-pointer hover:bg-red-400";
    } else if (multiplier.value === 3) {
      classes += " bg-red-600 text-white cursor-pointer hover:bg-red-700";
    }
  }
  // Empty cell
  else {
    classes +=
      " bg-gray-100 dark:bg-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500";
  }

  return classes;
}

function getMultiplierLabel(row, col, cell) {
  // If cell is selected and empty, show direction arrow
  if (isCellSelected(row, col) && !cell?.letter) {
    return direction.value === "horizontal" ? "→" : "↓";
  }

  const multiplier = getMultiplierAtPosition(row, col, props.boardConfig);

  if (row === centerPosition.value && col === centerPosition.value) {
    return "★";
  }

  if (multiplier.type === "letter") {
    return multiplier.value === 2 ? "DL" : "TL";
  }

  if (multiplier.type === "word") {
    return multiplier.value === 2 ? "DW" : "TW";
  }

  return "";
}

function getMultiplierBadge(row, col) {
  const multiplier = getMultiplierAtPosition(row, col, props.boardConfig);

  if (multiplier.type === "letter") {
    return multiplier.value === 2 ? "DL" : "TL";
  }

  if (multiplier.type === "word") {
    return multiplier.value === 2 ? "DW" : "TW";
  }

  return null;
}

function getBadgeClass(badge) {
  if (badge === "TL") return "bg-blue-600 text-white";
  if (badge === "DL") return "bg-blue-400 text-white";
  if (badge === "TW") return "bg-red-600 text-white";
  if (badge === "DW") return "bg-red-400 text-white";
  return "";
}

function getRowLabel(index) {
  return String.fromCharCode(65 + index); // A, B, C, ...
}

function getColLabel(index) {
  return (index + 1).toString(); // 1, 2, 3, ...
}
</script>

<template>
  <div class="overflow-x-auto">
    <div class="inline-block min-w-min mx-auto">
      <!-- Column headers -->
      <div class="flex">
        <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"></div>
        <div
          v-for="(col, colIndex) in gridSize"
          :key="`col-${colIndex}`"
          class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold dark:text-white"
        >
          {{ getColLabel(colIndex) }}
        </div>
      </div>

      <!-- Board rows -->
      <div
        v-for="(row, rowIndex) in grid"
        :key="`row-${rowIndex}`"
        class="flex"
      >
        <!-- Row label -->
        <div
          class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold dark:text-white"
        >
          {{ getRowLabel(rowIndex) }}
        </div>

        <!-- Board cells -->
        <div
          v-for="(cell, colIndex) in row"
          :key="`cell-${rowIndex}-${colIndex}`"
          :class="getCellClass(rowIndex, colIndex, cell)"
          @click="handleCellClick(rowIndex, colIndex)"
        >
          <!-- Placed letter with multiplier badge and points -->
          <template v-if="cell.letter">
            <span class="text-base md:text-lg font-bold z-10">{{
              cell.letter
            }}</span>
            <span
              v-if="getMultiplierBadge(rowIndex, colIndex)"
              :class="[
                'absolute top-0 right-0 text-3xs px-1 rounded-bl',
                getBadgeClass(getMultiplierBadge(rowIndex, colIndex)),
              ]"
            >
              {{ getMultiplierBadge(rowIndex, colIndex) }}
            </span>
            <span
              class="absolute bottom-0 right-0 text-3xs px-1 bg-gray-800 text-white rounded-tl"
            >
              {{ getCharacterPoints(cell.letter) }}
            </span>
            <!-- Direction indicator when occupied cell is selected -->
            <span
              v-if="isCellSelected(rowIndex, colIndex)"
              class="absolute top-0 left-0 text-xs px-1 bg-yellow-500 text-white rounded-br font-bold"
            >
              {{ direction === "horizontal" ? "→" : "↓" }}
            </span>
          </template>

          <!-- Preview letter -->
          <template v-else-if="isCellInPreview(rowIndex, colIndex)">
            <span class="text-base md:text-lg font-bold opacity-75">{{
              getPreviewLetter(rowIndex, colIndex)
            }}</span>
          </template>

          <!-- Empty cell with multiplier label or direction arrow -->
          <span
            v-else
            :class="
              isCellSelected(rowIndex, colIndex)
                ? 'text-2xl sm:text-3xl opacity-60'
                : 'text-3xs sm:text-2xs opacity-70'
            "
            >{{ getMultiplierLabel(rowIndex, colIndex, cell) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
