<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  LucideSend,
  LucideUser,
  LucideMail,
  LucideMessageSquare,
  LucideCheck,
  LucideAlertCircle,
  LucideLoader2,
} from "./icons/index.js";

const { t } = useI18n();

const name = ref("");
const email = ref("");
const message = ref("");
const isSubmitting = ref(false);
const submitStatus = ref(null); // 'success' | 'error' | null
const errorMessage = ref("");

const isFormValid = computed(() => {
  return (
    name.value.trim().length >= 2 &&
    email.value.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) &&
    message.value.trim().length >= 10
  );
});

const resetForm = () => {
  name.value = "";
  email.value = "";
  message.value = "";
};

const submitForm = async () => {
  if (!isFormValid.value || isSubmitting.value) return;

  isSubmitting.value = true;
  submitStatus.value = null;
  errorMessage.value = "";

  try {
    const response = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      submitStatus.value = "success";
      resetForm();
      // Reset success message after 5 seconds
      setTimeout(() => {
        submitStatus.value = null;
      }, 5000);
    } else {
      submitStatus.value = "error";
      errorMessage.value = data.error || t("contact.errorGeneric");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    submitStatus.value = "error";
    errorMessage.value = t("contact.errorNetwork");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="py-16 px-6 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2
          class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          {{ t("contact.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
          {{ t("contact.subtitle") }}
        </p>
        <div class="w-20 h-1 bg-rose-600 mx-auto" />
      </div>

      <!-- Success Message -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="submitStatus === 'success'"
          class="mb-8 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
        >
          <div
            class="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <LucideCheck class="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="font-medium text-green-800 dark:text-green-200">
              {{ t("contact.successTitle") }}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400">
              {{ t("contact.successMessage") }}
            </p>
          </div>
        </div>
      </Transition>

      <!-- Error Message -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="submitStatus === 'error'"
          class="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
        >
          <div
            class="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <LucideAlertCircle class="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="font-medium text-red-800 dark:text-red-200">
              {{ t("contact.errorTitle") }}
            </p>
            <p class="text-sm text-red-600 dark:text-red-400">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </Transition>

      <!-- Contact Form -->
      <form
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        @submit.prevent="submitForm"
      >
        <div class="grid gap-6">
          <!-- Name Field -->
          <div>
            <label
              for="contact-name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("contact.nameLabel") }}
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LucideUser class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="contact-name"
                v-model="name"
                type="text"
                :placeholder="t('contact.namePlaceholder')"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                required
                minlength="2"
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="contact-email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("contact.emailLabel") }}
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <LucideMail class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="contact-email"
                v-model="email"
                type="email"
                :placeholder="t('contact.emailPlaceholder')"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors"
                required
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <!-- Message Field -->
          <div>
            <label
              for="contact-message"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("contact.messageLabel") }}
            </label>
            <div class="relative">
              <div class="absolute top-3 left-3 pointer-events-none">
                <LucideMessageSquare class="w-5 h-5 text-gray-400" />
              </div>
              <textarea
                id="contact-message"
                v-model="message"
                :placeholder="t('contact.messagePlaceholder')"
                rows="5"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors resize-none"
                required
                minlength="10"
                :disabled="isSubmitting"
              />
            </div>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ t("contact.messageHint") }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="w-full inline-flex items-center justify-center py-3 px-6 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-rose-500/20 disabled:shadow-none"
            >
              <LucideLoader2
                v-if="isSubmitting"
                class="w-5 h-5 mr-2 animate-spin"
              />
              <LucideSend v-else class="w-5 h-5 mr-2" />
              {{ isSubmitting ? t("contact.sending") : t("contact.submit") }}
            </button>
          </div>
        </div>
      </form>

      <!-- Privacy Note -->
      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ t("contact.privacyNote") }}
      </p>
    </div>
  </section>
</template>
