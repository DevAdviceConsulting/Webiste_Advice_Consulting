import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

@Injectable({
  providedIn: 'root'
})
export class SwiperService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
  }

  initSwipers(): void {
    if (!this.isBrowser) return;

    // Initialize main banner swiper
    const mainBannerSwiper = new Swiper('.swiper.main-banner', {
      effect: 'fade',
      speed: 1000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });

    // Initialize services swiper
    const servicesSwiper = new Swiper('.swiper.services', {
      spaceBetween: 50,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next-team',
        prevEl: '.swiper-button-prev-team'
      },
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    });

    // Initialize testimonials swiper
    const testimonialsSwiper = new Swiper('.swiper.testimonials', {
      loop: false,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination'
      },
      breakpoints: {
        576: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
  }
}