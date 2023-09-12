import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

export interface ProductData {
  category: string;
  price: number;
  meta: number;
}
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  category: string = '';
  productName: string = '';
  price: number;
  meta: number;
  category2: string = '';
  productName2: string = '';
  price2: number = 0;
  meta2: number;
  productAdded: boolean = true;
  products: any[] = [];
  products2: any[] = [];
  categories: any[] = [];
  displayedColumns: string[] = ['category', 'price', 'meta'];
  productsArray: ProductData[] = [];
  productsArray2: ProductData[] = [];

  constructor(private authService: FirebaseAuthService) { }

  ngOnInit() {
    this.fetchProductsFromFirebase2();
  }


  fetchProductsFromFirebase2() {
    this.authService.fetchProductsFromFirebase2().subscribe(products2 => {
      this.products2 = products2;

      this.productsArray = [];

      for (const key in products2) {
        if (products2.hasOwnProperty(key)) {
          this.productsArray.push({
            category: products2[key].category,
            price: products2[key].price,
            meta: products2[key].meta
          });
        }
      }
    });
  }
  addNewProduct2() {
    if (this.category2 && this.price2 > 0) {
      this.authService.addProductToDatabase2(this.category2, this.price2, this.meta2, (error) => {
        if (!error) {
          console.log('Produto adicionado com sucesso!');
          // Limpar os campos após adicionar o produto
          this.category2 = '';
          this.price2 = 0;
          this.meta2 = 0;
        } else {
          console.error('Erro ao adicionar produto ao banco de dados:', error);
        }
      });
    } else {
      console.error('Preencha todos os campos corretamente.');
    }
    // this.fetchProductsFromFirebase();
  }
  isObject(obj: any): boolean {
    return typeof obj === 'object';
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
