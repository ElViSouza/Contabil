import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

export interface ProductData {
  key: string;
  price: number;
  selectedCategory: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  productsArray2: ProductData[] = [];
  categories: string[] = [];
  selectedCategory: string = ''; // Inicialmente, não há categoria selecionada
  filteredProducts: ProductData[] = [];
  categoryNames: { [key: string]: string } = {};

  constructor(private authService: FirebaseAuthService) { }

  ngOnInit() {
    this.fetchProductsFromFirebase2();
    this.fetchCategoriesFromFirebase();
  }

  fetchCategoriesFromFirebase() {
    this.authService.fetchProductsFromFirebase2().subscribe((products2) => {
      this.categories = [...new Set(Object.values(products2).map((product: any) => product.selectedCategory))];
      this.categories.forEach((category) => {
        this.categoryNames[category] = category;
      });
    });
  }

  fetchProductsFromFirebase2() {
    this.authService.fetchProductsFromFirebase2().subscribe((products2) => {
      this.productsArray2 = Object.keys(products2).map((key) => ({
        key: products2[key].key,
        price: products2[key].price,
        selectedCategory: products2[key].selectedCategory
        
      }));
      console.log(products2);
      this.updateFilteredProducts();
    });
  }

  updateFilteredProducts() {
    console.log('antes',this.productsArray2);
    if (this.selectedCategory === '') {
      this.filteredProducts = this.productsArray2;
      console.log(this.filteredProducts);
      console.log(this.productsArray2);

    } 
    else {
      this.filteredProducts = this.productsArray2.filter((product) => product.selectedCategory === this.selectedCategory);
    }
  }
}
