import { ref } from "vue";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-8PKY8T9FPE";

// Track if GA is initialized
const isInitialized = ref(false);

/**
 * Composable for managing Google Analytics 4
 */
export function useAnalytics() {
  /**
   * Check if user has given consent
   */
  const hasConsent = () => {
    return localStorage.getItem("cookie_consent") === "accepted";
  };

  /**
   * Initialize Google Analytics
   * Only loads if consent is given
   */
  const initGA = () => {
    if (isInitialized.value) return;
    if (!hasConsent()) return;

    // Create and inject gtag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR compliance
      cookie_flags: "SameSite=None;Secure",
    });

    isInitialized.value = true;
    console.log("[Analytics] Google Analytics initialized");
  };

  /**
   * Track a page view
   * @param {string} pagePath - The page path
   * @param {string} pageTitle - The page title
   */
  const trackPageView = (pagePath, pageTitle) => {
    if (!isInitialized.value || !window.gtag) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  };

  /**
   * Track a custom event
   * @param {string} eventName - The event name
   * @param {object} eventParams - Additional event parameters
   */
  const trackEvent = (eventName, eventParams = {}) => {
    if (!isInitialized.value || !window.gtag) return;

    window.gtag("event", eventName, eventParams);
  };

  /**
   * Track game-specific events
   */
  const trackGameEvent = {
    startGame: (mode) => {
      trackEvent("start_game", { game_mode: mode });
    },
    addPlayer: () => {
      trackEvent("add_player");
    },
    placeWord: (wordLength, points) => {
      trackEvent("place_word", {
        word_length: wordLength,
        points: points,
      });
    },
    endGame: (playerCount, winnerScore) => {
      trackEvent("end_game", {
        player_count: playerCount,
        winner_score: winnerScore,
      });
    },
  };

  return {
    isInitialized,
    hasConsent,
    initGA,
    trackPageView,
    trackEvent,
    trackGameEvent,
  };
}

