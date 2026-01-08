import "./style.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

/**
 * 1. UTILITY: SWIPER INITIALIZER
 * * @param selector - The CSS selector for the Swiper container.
 * @param prevBtnClass - Selector for the custom previous navigation button.
 * @param nextBtnClass - Selector for the custom next navigation button.
 * @param delay - Delay in ms. Used to stagger initialization to prevent
 * Long Tasks and "Forced Reflow" in the browser.
 */
const initSwiper = (
  selector: string,
  prevBtnClass: string,
  nextBtnClass: string,
  delay: number
) => {
  const el = document.querySelector(selector);
  if (!el) return;

  // setTimeout staggers the CPU load. If three Swipers initialize at the
  // exact same millisecond, the browser may drop frames.
  setTimeout(() => {
    new Swiper(el as HTMLElement, {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 12,
      observer: true, // Recalculates layout if content changes dynamically
      observeParents: true, // Recalculates if a parent container changes visibility
      navigation: {
        nextEl: nextBtnClass,
        prevEl: prevBtnClass,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        /**
         * Dynamic Icon Toggle:
         * Switches the 'Previous' arrow image source when on the first slide.
         * Expects data-light and data-dark attributes on the img element.
         */
        slideChange(swiper) {
          const prevBtn = document.querySelector(
            prevBtnClass
          ) as HTMLImageElement | null;
          if (!prevBtn) return;

          prevBtn.src = swiper.isBeginning
            ? prevBtn.dataset.light || prevBtn.src
            : prevBtn.dataset.dark || prevBtn.src;
        },
      },
    });
  }, delay);
};

/**
 * 2. MAIN EXECUTION (DOM READY)
 * Ensures all DOM elements are available before attaching listeners.
 */
document.addEventListener("DOMContentLoaded", () => {
  /* --- A. SWIPER INITIALIZATION --- 
     Staggered delays (0, 50ms, 100ms) optimize the Critical Rendering Path.
  */
  initSwiper(
    ".trendingHelpSwiper",
    ".custom-prev-button",
    ".custom-next-button",
    0
  );
  initSwiper(
    ".aboutCryptoSwiper",
    ".crypto-prev-button",
    ".crypto-next-button",
    50
  );
  initSwiper(
    ".everythingPayoutSwiper",
    ".everything-payout-prev",
    ".everything-payout-next",
    100
  );

  /* --- B. SEARCH INPUT CLEAR BUTTONS --- 
     Handles the 'X' button visibility inside search fields.
  */
  const wrappers = document.querySelectorAll<HTMLElement>(".search-input");
  wrappers.forEach((wrap) => {
    const input = wrap.querySelector<HTMLInputElement>(".search-input__field");
    const clearBtn = wrap.querySelector<HTMLButtonElement>(
      ".search-input__clear"
    );

    if (!input || !clearBtn) return;

    const toggleClear = () => {
      clearBtn.classList.toggle("hidden", input.value.trim().length === 0);
    };

    input.addEventListener("input", toggleClear);
    clearBtn.addEventListener("click", () => {
      input.value = "";
      toggleClear();
      input.focus(); // Returns focus to input after clearing for better UX
    });
    toggleClear(); // Initial check in case of browser auto-fill
  });

  /* --- C. AGENT DROPDOWN --- 
   Simple toggle for the Agent selection menu with click-outside logic.
*/
  const dropdownBtn = document.querySelector(
    ".agent_dropdown_btn"
  ) as HTMLElement | null;
  const dropdownMenu = document.getElementById("agentDropdown");

  if (dropdownBtn && dropdownMenu) {
    // Toggle menu on button click
    dropdownBtn.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation(); // Prevents the document listener from immediately closing it
      dropdownMenu.classList.toggle("hidden");
    });

    // Hide menu when clicking anywhere else on the screen
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // If the click is not on the menu and not on the button, hide the menu
      if (!dropdownMenu.contains(target) && !dropdownBtn.contains(target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  /* --- D. MOBILE SEARCH OVERLAY --- 
    Manages the full-screen search interface on mobile devices.
*/
  const openBtn = document.getElementById("openMobileSearch");
  const overlay = document.getElementById("mobileSearchOverlay");
  const closeBtn = document.getElementById("closeMobileSearch");

  // FIX: Cast as HTMLInputElement so TypeScript knows '.value' exists
  const mInput = document.getElementById(
    "mobileSearchInput"
  ) as HTMLInputElement | null;

  const mClearBtn = document.getElementById("mobileClearBtn");
  const trashBtn = document.getElementById("trashButton");
  const chipsWrap = document.getElementById("recentChips");
  const firstSearch = document.getElementById("firstSearch");

  // Helper to toggle Recent Searches and Clear button
  const toggleRecentSearches = () => {
    // FIX: Added optional chaining and null check for mInput
    if (!mInput) return;

    const hasValue = mInput.value.trim().length > 0;

    mClearBtn?.classList.toggle("hidden", !hasValue);

    if (hasValue) {
      firstSearch?.classList.remove("hidden");
      firstSearch?.classList.add("block");
    } else {
      firstSearch?.classList.add("hidden");
      firstSearch?.classList.remove("block");
    }
  };

  const openSearch = () => {
    overlay?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    toggleRecentSearches();
    requestAnimationFrame(() => mInput?.focus());
  };

  const closeSearch = () => {
    overlay?.classList.add("hidden");
    document.body.style.overflow = "";
    // FIX: Safe check before assignment
    if (mInput) mInput.value = "";
    mClearBtn?.classList.add("hidden");
  };

  openBtn?.addEventListener("click", openSearch);
  closeBtn?.addEventListener("click", closeSearch);

  overlay?.addEventListener("click", (e: MouseEvent) => {
    if (e.target === overlay) closeSearch();
  });

  mInput?.addEventListener("input", toggleRecentSearches);

  mClearBtn?.addEventListener("click", () => {
    if (!mInput) return;
    mInput.value = "";
    toggleRecentSearches();
    mInput.focus();
  });

  trashBtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    chipsWrap?.replaceChildren();
  });

  // Individual Chip Close
  chipsWrap?.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const closeIcon = target.closest(".chip-close");
    if (closeIcon) {
      e.preventDefault();
      e.stopPropagation();
      closeIcon.closest(".chip")?.remove();
    }
  });

  /* --- E. TAB SYSTEM --- 
     Handles tab switching, URL hash updates, and ARIA attributes for accessibility.
  */
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-tab-link]")
  );
  const panels = Array.from(
    document.querySelectorAll<HTMLElement>("[data-tab-panel]")
  );

  /**
   * Switches active tab by ID.
   * Updates CSS classes and Accessibility (ARIA) states.
   */
  function setActiveTab(id: string) {
    panels.forEach((p) => p.classList.toggle("hidden", p.id !== id));
    links.forEach((a) => {
      const isActive = a.dataset.tabTarget === id;
      // Toggle visual active states
      a.classList.toggle("bg-accent", isActive);
      a.classList.toggle("text-accent-foreground", isActive);
      a.classList.toggle("text-foreground-medium", !isActive);

      // Accessibility update
      isActive
        ? a.setAttribute("aria-current", "page")
        : a.removeAttribute("aria-current");
    });
  }

  links.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.dataset.tabTarget;
      if (!id) return;
      e.preventDefault();
      // Update URL hash without jumping the page
      history.replaceState(null, "", `#${id}`);
      setActiveTab(id);
    });
  });

  // Initialize view: Load tab from URL hash (e.g., example.com/#payouts) or default to first tab
  const initialTab =
    (location.hash || "").replace("#", "") || links[0]?.dataset.tabTarget;
  if (initialTab) setActiveTab(initialTab);
});
