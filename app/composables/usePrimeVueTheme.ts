import { definePreset } from "@primevue/themes";
import Aura from "@primeuix/themes/aura";

export const useMemomancyTheme = () => {
  return definePreset(Aura, {
    semantic: {
      primary: {
        50: "#FCFFE5",
        100: "#F5FFB3",
        200: "#ECFF73",
        300: "#E6FF3A",
        400: "#E5FF0F",
        500: "#E3FE01", // Main brand color
        600: "#BADA01",
        700: "#91B501",
        800: "#6B8F00",
        900: "#4E6A00",
        950: "#2E4100",
      },
    },
  });
};

export const useMemomancyPassthrough = () => {
  return {
    button: {
      root: {
        class: "!rounded-[3rem] !px-3 !py-[0.375rem] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem]",
      },
      label: {
        class: "!font-semibold",
      },
    },
    inputtext: {
      root: {
        class: "memomancy-input-text",
      },
      label: {
        class: "!font-semibold",
      },
    },
    paginator: {
      root: {
        class: "memomancy-paginator",
      },
    },
    menubar: {
      root: {
        class: "memomancy-menubar",
      },
    },
    selectbutton: {
      root: {
        class: "memomancy-select-button",
      },
    },
    datepicker: {
      root: {
        class: "memomancy-form-field",
      },
    },
    select: {
      root: {
        class: "memomancy-form-field",
      },
    },
    inputnumber: {
      root: {
        class: "memomancy-form-field",
      },
    },
    card: {
      root: {
        class: "memomancy-elevated-card",
      },
    },
    panel: {
      root: {
        class: "memomancy-elevated-card",
      },
    },
    dialog: {
      root: {
        class: "memomancy-elevated-section",
      },
    },
  };
};