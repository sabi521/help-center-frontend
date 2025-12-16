import "./style.css";

// Swiper core + styles
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Pagination } from "swiper/modules";

/**
 * Dropdown menu for agent
 */
const dropdownBtn = document.querySelector(".agent_dropdown_btn");
const dropdownMenu = document.getElementById("agentDropdown");

if (dropdownBtn && dropdownMenu) {
  dropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });
}

/**
 * Trending Help Section Swiper
 *
 */
document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".trendingHelpSwiper");

  if (swiperEl) {
    const swiper = new Swiper(swiperEl as HTMLElement, {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 12,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        slideChange(swiper) {
          const prevBtn = document.querySelector(
            ".custom-prev-button"
          ) as HTMLImageElement;

          if (!prevBtn) return;
          prevBtn.src = swiper.isBeginning
            ? prevBtn.dataset.light!
            : prevBtn.dataset.dark!;
        },
      },
    });
  }

  const swiperCrypto = document.querySelector(".aboutCryptoSwiper");

  if (swiperCrypto) {
    new Swiper(swiperCrypto as HTMLElement, {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 12,
      navigation: {
        nextEl: ".crypto-next-button",
        prevEl: ".crypto-prev-button",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        slideChange(swiper) {
          const prevBtn = document.querySelector(
            ".crypto-prev-button"
          ) as HTMLImageElement;

          if (!prevBtn) return;
          prevBtn.src = swiper.isBeginning
            ? prevBtn.dataset.light!
            : prevBtn.dataset.dark!;
        },
      },
    });
  }

  /**
   * Search input form
   */

  const openBtn = document.getElementById("openMobileSearch");
  const overlay = document.getElementById("mobileSearchOverlay");
  const closeBtn = document.getElementById("closeMobileSearch");
  const input = document.getElementById("mobileSearchInput");
  const clearBtn = document.getElementById("mobileClearBtn");
  const trashBtn = document.getElementById("trashButton");
  const chipsWrap = document.getElementById("recentChips");

  const open = () => {
    overlay?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setTimeout(() => input?.focus(), 0);
  };

  const close = () => {
    overlay?.classList.add("hidden");
    document.body.style.overflow = "";
    if (input) input.value = "";
    clearBtn?.classList.add("hidden");
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);

  // close if you click the dark background
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  input?.addEventListener("input", () => {
    if (!clearBtn || !input) return;
    clearBtn.classList.toggle("hidden", input.value.trim().length === 0);
  });

  clearBtn?.addEventListener("click", () => {
    if (!input) return;
    input.value = "";
    clearBtn.classList.add("hidden");
    input.focus();
  });

  trashBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove all chips
    chipsWrap?.replaceChildren();
  });
});
