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

          // If NOT at beginning → make dark
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
      spaceBetween: 0,
      navigation: {
        nextEl: ".crypto-next-button",
        prevEl: ".crypto-prev-button",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
});
