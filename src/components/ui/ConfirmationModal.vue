<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => value.length === 2,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["confirm", "cancel", "update:show"]);

const handleOption = (index) => {
  // La prima opzione restituisce true, la seconda false
  const result = index === 0;
  emit("confirm", result);
  emit("update:show", false);
};

const handleCancel = () => {
  emit("cancel");
  emit("update:show", false);
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    handleCancel();
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70"
        @click="handleOverlayClick"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all"
        >
          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            {{ message }}
          </p>

          <!-- Options Buttons -->
          <div class="flex gap-3 justify-end">
            <button
              v-for="(option, index) in options"
              :key="index"
              :class="{
                'px-6 py-2 rounded-lg font-semibold transition-colors': true,
                'bg-blue-500 hover:bg-blue-600 text-white': index === 0,
                'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white':
                  index === 1,
              }"
              @click="handleOption(index)"
            >
              {{ option }}
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
