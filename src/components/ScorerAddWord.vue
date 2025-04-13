<script setup>
import { useGameStore } from "@/stores/GameStore";
import { useLocaleStore } from "@/stores/LocaleStore";
import { TButton } from "@variantjs/vue";
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, watchEffect, onMounted } from "vue";

const game = useGameStore();
const localeStore = useLocaleStore();
const { bonus, maxWordLength } = storeToRefs(game);
const { getCharacterPoints } = game;
const { t } = localeStore;

const wordInput = ref(null);

const word = ref({ text: "", points: 0 });
const errors = ref(new Set());
const bonusArray = ref(Array(maxWordLength.value).fill(1));
const superBonus = ref(false);
const wordBonus = ref(1);
const emit = defineEmits(["add"]);

defineProps({
  enabled: Boolean,
});

const add = () => {
  const wordWithBonus = {
    ...word.value,
    bonusArray: [...bonusArray.value],
    wordBonus: wordBonus.value,
    superBonus: superBonus.value,
  };
  emit("add", wordWithBonus);
  init();
  // Focus sull'input dopo l'aggiunta
  setTimeout(() => {
    if (wordInput.value) {
      wordInput.value.focus();
    }
  }, 100);
};

const init = () => {
  word.value = { text: "", points: 0 };
  bonusArray.value = Array(maxWordLength.value).fill(1);
  superBonus.value = false;
  wordBonus.value = 1;
};

// Funzione per prevenire l'inserimento oltre il limite massimo
const updateText = (newText) => {
  if (newText.length <= maxWordLength.value) {
    word.value.text = newText;
  } else {
    word.value.text = newText.substring(0, maxWordLength.value);
  }
};

const setBonus = (index, value) => {
  if (value === -1) {
    if (bonusArray.value[index] === 1) {
      bonusArray.value[index] = 2;
    } else if (bonusArray.value[index] === 2) {
      bonusArray.value[index] = 3;
    } else if (bonusArray.value[index] === 3) {
      bonusArray.value[index] = 0;
    } else {
      bonusArray.value[index] = 1;
    }
  } else {
    bonusArray.value[index] = bonusArray.value[index] === value ? 1 : value;
  }
  // Focus sull'input dopo il cambiamento del bonus
  setTimeout(() => {
    if (wordInput.value) {
      wordInput.value.focus();
    }
  }, 100);
};

const setSuperBonus = () => {
  superBonus.value = !superBonus.value;
};

const setWordBonus = (value) => {
  wordBonus.value = wordBonus.value === value ? 1 : value;
};

const isBonusEquals = (index, value) => {
  return bonusArray.value[index] === value;
};

// Funzione per gestire il backspace e l'eliminazione delle lettere
const handleKeydown = (event) => {
  if (event.key === "Enter") {
    add();
  }
};

watchEffect(() => {
  let points = 0;
  for (const [i, char] of [...word.value.text].entries()) {
    if (i >= maxWordLength.value) break;

    const charPoints = getCharacterPoints(char.toUpperCase());
    if (!isNaN(charPoints)) {
      points += parseInt(bonusArray.value[i]) * parseInt(charPoints);
    }
  }
  points = points * wordBonus.value;
  points += superBonus.value ? bonus.value : 0;
  word.value.points = isNaN(points) ? 0 : points;
});

onMounted(() => {
  init();
  // Focus sull'input all'avvio
  setTimeout(() => {
    if (wordInput.value) {
      wordInput.value.focus();
    }
  }, 100);
});
</script>

<template>
  <div class="flex flex-col">
    <h2 class="text-sm font-bold uppercase">
      {{ t("scorer.wordLabel") }}
    </h2>

    <!-- Input e visualizzazione integrati -->
    <div class="w-full">
      <!-- Box di input interattivo con tessere -->
      <div
        class="relative border-2 rounded-lg overflow-hidden w-full p-2 bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-400 min-w-[300px] text-gray-500"
        :class="{
          'border-blue-600 dark:border-gray-600':
            wordBonus === 1 && !superBonus,
          'border-yellow-400 ': wordBonus === 2 && !superBonus,
          'border-red-700 ': wordBonus === 3 && !superBonus,
          'border-green-400': wordBonus === 1 && superBonus,
          'gradient-border-yellow-green': wordBonus === 2 && superBonus,
          'gradient-border-red-green': wordBonus === 3 && superBonus,
        }"
      >
        <!-- Area di input visibile solo quando vuoto -->
        <div
          v-if="!word.text"
          class="absolute inset-0 flex items-center justify-center opacity-50 text-white pointer-events-none"
        >
          <span>{{ t("general.typeHere") }}</span>
        </div>

        <!-- Input reale -->
        <input
          ref="wordInput"
          type="text"
          class="w-full bg-transparent border-0 outline-none px-2 py-1 dark:text-white mb-2 ring-0 border-none focus:ring-0 focus:border-none"
          :maxlength="maxWordLength"
          :value="word.text"
          :disabled="!enabled"
          @input="updateText($event.target.value)"
          @keydown="handleKeydown"
        />

        <!-- Visualizzazione delle tessere -->
        <div class="flex flex-wrap gap-1">
          <template v-if="word.text">
            <div
              v-for="(char, index) in [...word.text.toUpperCase()]"
              v-show="index < maxWordLength"
              :key="index"
              class="flex flex-col mb-1"
            >
              <!-- Tessera principale -->
              <div
                class="w-10 h-10 flex flex-col items-center justify-center bg-amber-200 border-2 border-amber-400 rounded cursor-pointer select-none relative"
                :class="{
                  'bg-amber-200 text-gray-700': isBonusEquals(index, 1),
                  'bg-blue-400 text-gray-700 border-blue-500': isBonusEquals(
                    index,
                    2,
                  ),
                  'bg-blue-700 text-white border-blue-800': isBonusEquals(
                    index,
                    3,
                  ),
                  'bg-amber-200 text-gray-500 border-gray-400': isBonusEquals(
                    index,
                    0,
                  ),
                }"
                @click="setBonus(index, -1)"
              >
                <span class="text-2xl font-bold">{{ char }}</span>
                <span
                  v-if="!isBonusEquals(index, 0)"
                  class="absolute bottom-0 right-1 text-xs"
                >
                  {{ getCharacterPoints(char) }}
                </span>
              </div>

              <!-- Pulsanti di moltiplicatore per lettera -->
              <div class="flex h-4 text-[8px] font-bold text-white">
                <div
                  class="flex-1 bg-blue-400 flex items-center justify-center cursor-pointer"
                  @click="setBonus(index, 2)"
                >
                  ×2
                </div>
                <div
                  class="flex-1 bg-blue-700 flex items-center justify-center cursor-pointer"
                  @click="setBonus(index, 3)"
                >
                  ×3
                </div>
                <div
                  class="flex-1 bg-gray-400 flex items-center justify-center cursor-pointer"
                  @click="setBonus(index, 0)"
                >
                  J
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Contatore punti (spostato fuori dal campo di input) -->
      <div
        class="mt-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-white rounded-md flex items-center justify-between"
      >
        <span class="text-sm">{{ t("general.currentScore") }}</span>
        <div class="flex items-center">
          <span class="font-bold text-xl">{{ word.points }}</span>
          <span class="ml-1 text-sm opacity-70">{{ t("general.points") }}</span>
        </div>
      </div>
    </div>

    <!-- Barra dei modificatori di parola e pulsante aggiungi (spostati sotto al punteggio) -->
    <div class="flex flex-col gap-2 mt-2">
      <!-- Riga dei bonus di parola -->
      <div class="flex gap-2">
        <button
          class="flex-1 h-10 px-2 rounded-md text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center"
          :class="{
            'bg-yellow-500 ring-2 ring-yellow-300': wordBonus === 2,
            'bg-yellow-400 hover:bg-yellow-500': wordBonus !== 2,
          }"
          type="button"
          @click="setWordBonus(2)"
        >
          {{ t("scorer.wordBonus2") }}
        </button>
        <button
          class="flex-1 h-10 px-2 rounded-md text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center"
          :class="{
            'bg-red-700 ring-2 ring-red-300': wordBonus === 3,
            'bg-red-600 hover:bg-red-700': wordBonus !== 3,
          }"
          type="button"
          @click="setWordBonus(3)"
        >
          {{ t("scorer.wordBonus3") }}
        </button>
        <button
          class="flex-1 h-10 px-2 rounded-md text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center"
          :class="{
            'bg-green-600 ring-2 ring-green-300': superBonus,
            'bg-green-500 hover:bg-green-600': !superBonus,
          }"
          type="button"
          @click="setSuperBonus()"
        >
          {{ t("scorer.bonus") }}
          <span class="ml-1">(+{{ bonus.value }})</span>
        </button>
      </div>

      <!-- Pulsante aggiungi in una riga separata -->
      <TButton
        class="h-10 bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 flex items-center justify-center"
        :disabled="!enabled"
        @click="add"
      >
        <LucidePlus class="w-5 h-5 mr-2" />
        {{ t("general.addButton") }}
      </TButton>
    </div>

    <div v-if="errors.size" class="mt-2 space-y-1">
      <div v-for="(error, index) in errors" :key="index" class="text-red-400">
        &bull; {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Assicura che i campi di input abbiano il testo corretto in dark mode */
:deep(.dark input) {
  color: white;
}

/* Stile per l'input visibile */
input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Stili per i bordi sfumati */

.gradient-border-yellow-green::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #facc15, #4ade80, #facc15) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
  border-radius: 0.5rem;
  z-index: 10;
}

.gradient-border-red-green::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #b91c1c, #4ade80, #b91c1c) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
  border-radius: 0.5rem;
  z-index: 10;
}
</style>
