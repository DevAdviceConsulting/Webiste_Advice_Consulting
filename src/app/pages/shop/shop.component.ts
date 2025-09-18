import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  category: string;
  inStock: boolean;
  isFavorite: boolean;
  badge: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOption: string = 'default';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;

  filters = {
    availability: 'all',
    categories: [] as string[],
    priceRange: '',
    colors: [] as string[],
    ratings: [] as number[]
  };

  categories: string[] = [];
  priceRanges = ['0-50', '50-100', '100-500', '500+'];
  ratings = [1,2,3,4,5];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products')
      .subscribe(data => {
        this.products = data.map(p => ({
          id: p.id,
          name: p.title,
          price: p.price,
          originalPrice: null,
          image: p.image,
          rating: p.rating?.rate ?? 0,
          category: p.category,
          inStock: true,
          isFavorite: false,
          badge: ''
        }));
        // Extraire les catégories uniques
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        this.filteredProducts = [...this.products];
        this.updatePagination();
      });
  }

  onSortChange(event: any): void {
    this.sortOption = event.target.value;
    this.applySorting();
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
  }

  applyFilters(): void {
    let filtered = [...this.products];

    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm) ||
        p.category.toLowerCase().includes(this.searchTerm)
      );
    }

    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(p =>
        this.filters.categories.includes(p.category)
      );
    }

    this.filteredProducts = filtered;
    this.applySorting();
    this.updatePagination();
  }

  applySorting(): void {
    switch (this.sortOption) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPages(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  toggleCategory(category: string): void {
    const index = this.filters.categories.indexOf(category);
    if (index > -1) this.filters.categories.splice(index, 1);
    else this.filters.categories.push(category);
    this.applyFilters();
  }

  toggleRating(rating: number): void {
    const index = this.filters.ratings.indexOf(rating);
    if (index > -1) this.filters.ratings.splice(index, 1);
    else this.filters.ratings.push(rating);
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters = { availability: 'all', categories: [], priceRange: '', colors: [], ratings: [] };
    this.applyFilters();
  }

  setPriceRange(range: string): void {
    this.filters.priceRange = range;
    this.applyFilters();
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
    }

}
