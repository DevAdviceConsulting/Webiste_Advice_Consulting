import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initTheme(): void {
    if (!this.isBrowser) return;

    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = this.getPreferredTheme(storedTheme);
    this.setTheme(preferredTheme);
    
    this.setupThemeListeners();
  }

  private getPreferredTheme(storedTheme: string | null): string {
    if (storedTheme) {
      return storedTheme;
    }
    
    if (this.isBrowser && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    return 'light';
  }

  private setTheme(theme: string): void {
    if (!this.isBrowser) return;

    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  private setupThemeListeners(): void {
    if (!this.isBrowser) return;

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        this.setTheme(this.getPreferredTheme(storedTheme));
      }
    });

    const themeToggles = document.querySelectorAll('[data-bs-theme-value]');
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');
        if (theme) {
          localStorage.setItem('theme', theme);
          this.setTheme(theme);
          this.showActiveTheme(theme);
        }
      });
    });
  }

  private showActiveTheme(theme: string): void {
    if (!this.isBrowser) return;

    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    
    if (!activeThemeIcon || !btnToActive) return;

    const svgOfActiveBtn = btnToActive.querySelector('.mode-switch use')?.getAttribute('href');
    
    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active');
    });

    btnToActive.classList.add('active');
    if (svgOfActiveBtn) {
      activeThemeIcon.setAttribute('href', svgOfActiveBtn);
    }
  }
}