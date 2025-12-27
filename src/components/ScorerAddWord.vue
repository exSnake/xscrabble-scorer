<script setup>
import { useGameStore } from "@/stores/GameStore";
import { TButton, TInput } from "@variantjs/vue";
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, watchEffect, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { LucidePlus, LucideStar } from "@/components/icons";

const { t } = useI18n();

const game = useGameStore();
const { bonus, maxWordLength } = storeToRefs(game);
const { getCharacterPoints } = game;

const TRIPLE_BONUS = 3;

const word = ref({ text: "", points: 0 });
const errors = ref(new Set());
const bonusArray = ref(new Array(maxWordLength.value).fill(1));
const superBonus = ref(false);
const wordBonus = ref(1);
const emit = defineEmits(["add"]);

defineProps({
  enabled: Boolean,
});

const add = () => {
  emit("add", word.value);
  init();
};

const init = () => {
  word.value = { text: "", points: 0 };
  bonusArray.value = new Array(maxWordLength.value).fill(1);
  superBonus.value = false;
  wordBonus.value = 1;
};

const setBonus = (index, value) => {
  if (value === -1) {
    if (bonusArray.value[index] === 1) {
      bonusArray.value[index] = 2;
    } else if (bonusArray.value[index] === 2) {
      bonusArray.value[index] = TRIPLE_BONUS;
    } else if (bonusArray.value[index] === TRIPLE_BONUS) {
      bonusArray.value[index] = 0;
    } else {
      bonusArray.value[index] = 1;
    }
  } else {
    bonusArray.value[index] = bonusArray.value[index] === value ? 1 : value;
  }
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

watchEffect(() => {
  // Explicitly track language to ensure reactivity when language changes
  const getPoints = getCharacterPoints.value;

  let points = 0;
  for (const [i, char] of [...word.value.text].entries()) {
    points +=
      Number.parseInt(bonusArray.value[i]) *
      Number.parseInt(getPoints(char.toUpperCase()));
  }
  points = points * wordBonus.value;
  points += superBonus.value ? bonus.value : 0;
  word.value.points = points;
});

onMounted(() => {
  init();
});
</script>

<template>
  <div class="flex flex-col space-y-4">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
        <LucideStar class="w-5 h-5 text-rose-600 dark:text-rose-400" />
      </div>
      <h2
        class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white"
      >
        {{ t("scorerAddWord.word") }}
      </h2>
    </div>

    <!-- Word Input Section -->
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- Word Input with Bonus Buttons -->
      <div class="flex flex-1 items-stretch">
        <div class="flex-1 relative flex">
          <TInput
            v-model="word.text"
            class="h-full w-full rounded-l-lg rounded-r-none px-4 uppercase border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            :class="{
              'border-gray-300 dark:border-gray-600':
                wordBonus === 1 && !superBonus,
              'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100':
                wordBonus === 2,
              'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100':
                wordBonus === 3,
              'border-green-500 ring-2 ring-green-500': superBonus,
            }"
            :maxlength="maxWordLength"
            :placeholder="t('scorerAddWord.wordPlaceholder')"
            :value="word.text"
            :disabled="!enabled"
            @keyup.enter="add"
          />
        </div>

        <!-- Word Bonus Buttons -->
        <div
          class="flex flex-col h-12 rounded-r-lg overflow-hidden border border-l-0 border-gray-300 dark:border-gray-600"
        >
          <button
            type="button"
            class="h-1/3 min-h-0 px-2 py-0 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-semibold transition-colors duration-200 flex items-center justify-center"
            :class="{
              'bg-yellow-500 ring-2 ring-yellow-600': wordBonus === 2,
            }"
            :disabled="!enabled"
            @click="setWordBonus(2)"
          >
            x2
          </button>
          <button
            type="button"
            class="h-1/3 min-h-0 px-2 py-0 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors duration-200 flex items-center justify-center"
            :class="{
              'bg-red-700 ring-2 ring-red-800': wordBonus === 3,
            }"
            :disabled="!enabled"
            @click="setWordBonus(3)"
          >
            x3
          </button>
          <button
            type="button"
            class="h-1/3 min-h-0 px-2 py-0 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors duration-200 flex items-center justify-center rounded-br-lg"
            :class="{
              'bg-green-600 ring-2 ring-green-700': superBonus,
            }"
            :disabled="!enabled"
            @click="setSuperBonus()"
          >
            B
          </button>
        </div>
      </div>

      <!-- Points Input -->
      <div class="relative">
        <TInput
          v-model.number="word.points"
          class="h-12 w-24 sm:w-32 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-right font-semibold focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          :placeholder="t('scorerAddWord.pointsPlaceholder')"
          :disabled="!enabled"
          @keydown.enter.prevent="add"
        />
      </div>

      <!-- Add Button -->
      <TButton
        class="h-12 w-12 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 flex items-center justify-center"
        :disabled="!enabled || !word.text.trim()"
        @click="add"
      >
        <LucidePlus class="w-6 h-6" />
      </TButton>
    </div>

    <!-- Letter Cards -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="word.text !== ''" class="mt-4">
        <div class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Clicca sulle lettere per applicare bonus
        </div>
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <div
            v-for="(char, index) in [...word.text.toUpperCase()]"
            :key="index"
            class="group relative"
          >
            <!-- Main Letter Card -->
            <div
              class="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center select-none"
              :class="{
                'bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-gray-700 dark:text-gray-300':
                  isBonusEquals(index, 1),
                'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-gray-800 dark:text-gray-200':
                  isBonusEquals(index, 2),
                'bg-blue-600 dark:bg-blue-700 border-blue-700 dark:border-blue-800 text-white':
                  isBonusEquals(index, 3),
                'bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-500 dark:text-gray-400':
                  isBonusEquals(index, 0),
              }"
              @click="setBonus(index, -1)"
            >
              <!-- Letter -->
              <div class="text-2xl sm:text-3xl font-bold mb-1">{{ char }}</div>
              <!-- Points -->
              <div
                v-if="!isBonusEquals(index, 0)"
                class="text-xs font-semibold"
                :class="{
                  'text-gray-600 dark:text-gray-400':
                    isBonusEquals(index, 1) || isBonusEquals(index, 2),
                  'text-white': isBonusEquals(index, 3),
                  'text-gray-400 dark:text-gray-500': isBonusEquals(index, 0),
                }"
              >
                {{ getCharacterPoints.value(char) }}
              </div>
              <!-- Jolly Indicator -->
              <div
                v-if="isBonusEquals(index, 0)"
                class="text-xs font-semibold text-gray-500 dark:text-gray-400"
              >
                J
              </div>
            </div>

            <!-- Bonus Controls -->
            <div
              class="absolute -bottom-8 left-0 right-0 flex gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <button
                type="button"
                class="w-6 h-6 rounded bg-blue-400 hover:bg-blue-500 text-white text-xs font-bold transition-colors duration-200 flex items-center justify-center"
                :disabled="!enabled"
                title="Doppia lettera"
                @click.stop="setBonus(index, 2)"
              >
                x2
              </button>
              <button
                type="button"
                class="w-6 h-6 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors duration-200 flex items-center justify-center"
                :disabled="!enabled"
                title="Tripla lettera"
                @click.stop="setBonus(index, 3)"
              >
                x3
              </button>
              <button
                type="button"
                class="w-6 h-6 rounded bg-gray-500 hover:bg-gray-600 text-white text-xs font-bold transition-colors duration-200 flex items-center justify-center"
                :disabled="!enabled"
                title="Jolly"
                @click.stop="setBonus(index, 0)"
              >
                J
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Errors -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="errors && errors.size > 0" class="space-y-1">
        <div
          v-for="(error, index) in Array.from(errors)"
          :key="index"
          class="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2"
        >
          • {{ error }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Letter cards styling */
</style>
