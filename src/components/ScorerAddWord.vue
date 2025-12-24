<script setup>
import { useGameStore } from "@/stores/GameStore";

import { TButton, TInput } from "@variantjs/vue";
import { storeToRefs } from "pinia";
import { ref, defineProps, defineEmits, watchEffect, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const game = useGameStore();
const { bonus, maxWordLength } = storeToRefs(game);
const { getCharacterPoints } = game;

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
  emit("add", word.value);
  init();
};

const init = () => {
  word.value = { text: "", points: 0 };
  bonusArray.value = Array(maxWordLength.value).fill(1);
  superBonus.value = false;
  wordBonus.value = 1;
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
  let points = 0;
  for (const [i, char] of [...word.value.text].entries()) {
    points +=
      parseInt(bonusArray.value[i]) *
      parseInt(getCharacterPoints(char.toUpperCase()));
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
  <div class="flex flex-col">
    <h2 class="text-sm font-bold uppercase">{{ t("scorerAddWord.word") }}</h2>
    <div class="flex gap-2">
      <div class="flex w-full">
        <TInput
          class="h-10 rounded-r-none px-3 py-1 disabled:cursor-not-allowed uppercase"
          :class="{
            'bg-gray-100 dark:bg-white': wordBonus === 1,
            'bg-yellow-400 border-yellow-400 !text-white': wordBonus === 2,
            'bg-red-700 border-red-700 !text-white': wordBonus === 3,
            '!border-green-400 border-4': superBonus,
          }"
          :maxlength="maxWordLength"
          :placeholder="t('scorerAddWord.wordPlaceholder')"
          :value="word.text"
          v-model="word.text"
          :disabled="!enabled"
          @keyup.enter="add"
        />
        <div
          class="flex w-3 cursor-pointer flex-col rounded-r-lg text-center text-white text-2xs select-none"
        >
          <div class="h-1/3 bg-yellow-400" @click="setWordBonus(2)">x2</div>
          <div class="h-1/3 bg-red-700" @click="setWordBonus(3)">x3</div>
          <div class="h-1/3 bg-green-400" @click="setSuperBonus()">B</div>
        </div>
      </div>
      <TInput
        class="h-10 w-16 bg-gray-100 px-3 py-1 text-right text-black disabled:cursor-not-allowed dark:bg-white"
        :placeholder="t('scorerAddWord.pointsPlaceholder')"
        v-model.number="word.points"
        :disabled="!enabled"
        @keydown.enter.prevent="add"
      />
      <TButton
        class="h-10 bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
        @click="add"
        :disabled="!enabled"
      >
        +
      </TButton>
    </div>
    <div v-if="word.text !== ''" class="mt-2 flex flex-wrap gap-1 rounded-lg">
      <div
        class="grid h-14 w-10 grid-cols-3 select-none"
        :key="index"
        v-for="(char, index) in [...word.text.toUpperCase()]"
      >
        <div
          class="col-span-3 flex border-2 gap-0.5 border-amber-400 items-center justify-center h-10 w-10 text-center align-middle cursor-pointer"
          :class="{
            'bg-amber-200 text-gray-700': isBonusEquals(index, 1),
            'bg-blue-400 text-gray-700': isBonusEquals(index, 2),
            'bg-blue-700 text-white': isBonusEquals(index, 3),
            'bg-amber-200 text-gray-500': isBonusEquals(index, 0),
          }"
          @click="setBonus(index, -1)"
        >
          <div class="text-3xl">{{ char }}</div>
          <div class="self-end text-2xs" v-if="!isBonusEquals(index, 0)">
            {{ getCharacterPoints(char) }}
          </div>
        </div>
        <div
          class="bg-blue-400 text-center text-white cursor-pointer text-2xs"
          @click="setBonus(index, 2)"
        >
          x2
        </div>
        <div
          class="bg-blue-700 text-center text-white cursor-pointer text-2xs"
          @click="setBonus(index, 3)"
        >
          x3
        </div>
        <div
          class="bg-gray-400 text-center text-white cursor-pointer text-2xs"
          @click="setBonus(index, 0)"
        >
          J
        </div>
      </div>
    </div>
    <div class="mt-2 space-y-1" v-if="errors">
      <div class="text-red-400" :key="index" v-for="(error, index) in errors">
        &bull; {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
