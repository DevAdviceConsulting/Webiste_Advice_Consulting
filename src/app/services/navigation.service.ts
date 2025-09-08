import { Injectable } from '@angular/core';
import { NavigationItem } from '../models/navigation-item.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  getNavigationItems(): NavigationItem[] {
    return [
      { label: 'Accueil', link: '/' },
      { label: 'A Propos', link: '/' },
      {
        label: 'Demos',
        link: '#',
        children: [
          { label: 'Classic Default', link: '/demos/classic' },
          { label: 'Creative Agency', link: '/demos/creative-agency' },
          { label: 'Digital Agency', link: '/demos/digital-agency', badge: 'New', isActive: true },
          { label: 'Design Agency', link: '/demos/design-agency', badge: 'New' },
          { label: 'SEO Agency', link: '/demos/seo-agency', badge: 'New' },
          { label: 'Product Landing', link: '/demos/product-landing' },
          { label: 'Mobile App Showcase', link: '/demos/mobile-app' }
        ]
      },
      {
        label: 'Pages',
        link: '#',
        children: [
          
          {
            label: 'Nos Produits',
            link: '#',
            children: [
              { label: 'About v.1', link: '/about/v1' },
              { label: 'About v.2', link: '/about/v2' },
              { label: 'About v.3', link: '/about/v3' },
              { label: 'Team', link: '/team' },
              { label: 'Services v.1', link: '/services/v1' },
              { label: 'Services v.2', link: '/services/v2' },
              { label: 'Service Single', link: '/service/single' }
            ]
          },
          { label: 'Contact v.1', link: '/contact/v1' },
          { label: 'Contact v.2', link: '/contact/v2' }
        ]
      },
      {
        label: 'Portfolio',
        link: '#',
        children: [
          { label: 'Portfolio Masonry', link: '/portfolio/masonry' },
          { label: 'Portfolio Showcase', link: '/portfolio/showcase' },
          { label: 'Portfolio List', link: '/portfolio/list' },
          { label: 'Case Study v.1', link: '/portfolio/case-study/v1' },
          { label: 'Case Study v.2', link: '/portfolio/case-study/v2' }
        ]
      },
      { label: 'Contactez-Nous', link: '/contact' }
    ];
  }

  getServices(): any[] {
    return [
      {
        title: 'Custom Software Development',
        description: 'We prioritize user experience, scalability, and security to ensure your.',
        image: 'assets/images/services/4by3/01.jpg',
        link: '/services/custom-software'
      },
      {
        title: 'Web Design and Development',
        description: 'From responsive websites to e-commerce platforms.',
        image: 'assets/images/services/4by3/02.jpg',
        link: '/services/web-design'
      },
      {
        title: 'Digital Marketing Strategies',
        description: 'Reach your target drive results with our comprehensive digital marketing.',
        image: 'assets/images/services/4by3/03.jpg',
        link: '/services/digital-marketing'
      }
    ];
  }

  getTestimonials(): any[] {
    return [
      {
        name: 'Louis Ferguson',
        role: 'Web Developer',
        avatar: 'assets/images/avatar/04.jpg',
        content: '"Transformed My Agency\'s Results" - As an employer, the platform exceeded my expectations.',
        rating: 4.5,
        active: false
      },
      {
        name: 'Emma Watson',
        role: 'Co-Founder',
        avatar: 'assets/images/avatar/05.jpg',
        content: '"Transformed My Agency\'s Results" - As an employer, the platform exceeded my expectations.',
        rating: 4.5,
        active: true
      },
      {
        name: 'Samuel Bishop',
        role: 'Product designer',
        avatar: 'assets/images/avatar/06.jpg',
        content: '"Transformed My Agency\'s Results" - As an employer, the platform exceeded my expectations.',
        rating: 4.5,
        active: false
      }
    ];
  }
}