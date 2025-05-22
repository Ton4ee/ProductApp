import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', description: '', price: 0 };
  editing = false;
  editingId: number | null = null;

  // Pagination
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 5;

  // Search
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const params = {
      search: this.searchTerm,
      page: (this.currentPage - 1).toString(),
      size: this.itemsPerPage.toString(),
    };

    this.http.get<any>('http://localhost:8080/api/products', { params })
      .subscribe(response => {
        this.products = response.content;
        this.totalPages = response.totalPages;
      });
  }

  addProduct(): void {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      alert('Enter valid product data');
      return;
    }

    this.http.post<any>('http://localhost:8080/api/products', this.newProduct)
      .subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
  }

  editProduct(product: any): void {
    this.editing = true;
    this.editingId = product.id;
    this.newProduct = { ...product };
  }

  updateProduct(): void {
    if (!this.editingId) return;

    this.http.put<any>(`http://localhost:8080/api/products/${this.editingId}`, this.newProduct)
      .subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
  }

  deleteProduct(id: number): void {
    this.http.delete(`http://localhost:8080/api/products/${id}`)
      .subscribe(() => this.loadProducts());
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  search(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.newProduct = { name: '', description: '', price: 0 };
    this.editing = false;
    this.editingId = null;
  }
}
