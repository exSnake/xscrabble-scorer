// Icon components using @iconify/vue
// Wrapper components to maintain compatibility with existing Lucide naming

import { Icon } from "@iconify/vue";
import { h } from "vue";

// Helper to create icon components
const createIcon = (iconName) => ({
  name: iconName
    .replace("lucide:", "Lucide")
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase()),
  props: {
    size: {
      type: [String, Number],
      default: 24,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(Icon, {
        icon: iconName,
        width: props.size,
        height: props.size,
        ...attrs,
      });
  },
});

// Export all icons with Lucide-compatible names
export const LucidePlay = createIcon("lucide:play");
export const LucidePause = createIcon("lucide:pause");
export const LucideRefreshCw = createIcon("lucide:refresh-cw");
export const LucideGithub = createIcon("lucide:github");
export const LucideUser = createIcon("lucide:user");
export const LucideMenu = createIcon("lucide:menu");
export const LucideMoon = createIcon("lucide:moon");
export const LucideSun = createIcon("lucide:sun");
export const LucideTrash2 = createIcon("lucide:trash-2");
export const LucideX = createIcon("lucide:x");
export const LucidePlus = createIcon("lucide:plus");
export const LucideCircleX = createIcon("lucide:circle-x");
export const LucideUserPlus = createIcon("lucide:user-plus");
export const LucideStar = createIcon("lucide:star");
export const LucideClock = createIcon("lucide:clock");
export const LucideUsers = createIcon("lucide:users");
export const LucideSettings = createIcon("lucide:settings");
export const LucideCode = createIcon("lucide:code");
export const LucideGlobe = createIcon("lucide:globe");
export const LucideChevronDown = createIcon("lucide:chevron-down");
export const LucideChevronUp = createIcon("lucide:chevron-up");
export const LucideMaximize2 = createIcon("lucide:maximize-2");
export const LucideGrid = createIcon("lucide:grid");
