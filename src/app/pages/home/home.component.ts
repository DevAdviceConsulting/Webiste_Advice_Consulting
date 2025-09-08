import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwiperService } from '../../services/swiper.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isBrowser: boolean;

  constructor(
    private swiperService: SwiperService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // AOS
      AOS.init({
        duration: 500,
        easing: 'ease-out-quart',
        once: true
      });

      // PureCounter (import dynamique)
      import('@srexi/purecounterjs').then(({ default: PureCounter }) => {
        new PureCounter();
      });

      // Swipers
      this.swiperService.initSwipers();

      // Jarallax
      this.initJarallax();
    }
  }




  private initJarallax(): void {
    if (typeof (window as any).jarallax !== 'undefined') {
      (window as any).jarallax(document.querySelectorAll('.bg-parallax'), {
        speed: 0.6
      });
    }
  }
}