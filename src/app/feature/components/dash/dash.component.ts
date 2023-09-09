import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
export interface ProductData {
  category: string;
  price: number;
  meta: number;
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  category: string = ''; 
  productName: string = '';
  price: number = 0;
  meta: number;
  category2: string = ''; 
  productName2: string = '';
  price2: number = 0;
  meta2: number;
  productAdded: boolean = true;
  products: any[] = [];
  products2: any[] = [];
  categories: any[] = [];
  value = 'Clear me';
  displayedColumns: string[] = ['category', 'price', 'meta'];
  productsArray: ProductData[] = [];

  constructor(private authService: FirebaseAuthService) { }


  ngOnInit() {
    this.fetchProductsFromFirebase();
    this.fetchProductsFromFirebase2();  }
// Por exemplo, dentro de um componente
addNewProduct() {
  if (this.category && this.price > 0) {
    this.authService.addProductToDatabase(this.category, this.price, this.meta)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
        // Limpar os campos após adicionar o produto
        this.category = '';
        this.price = 0;
        this.meta = 0;
      })
      .catch(error => {
        console.error('Erro ao adicionar produto ao banco de dados:', error);
      });
  } else {
    console.error('Preencha todos os campos corretamente.');
  }
  // this.fetchProductsFromFirebase();
}
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}

addNewProduct2() {
  if (this.category2  && this.price2 > 0) {
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

fetchProductsFromFirebase() {
  this.authService.fetchProductsFromFirebase().subscribe(products => {
    this.products = products;
    console.log('1',this.products);
    
  });
}
fetchProductsFromFirebase2() {
  this.authService.fetchProductsFromFirebase2().subscribe(products2 => {
    this.products2 = products2;
    console.log('2', this.products2);
    
    // Criar productsArray a partir dos dados recebidos
    this.productsArray = Object.keys(products2).map(key => ({
      category: key,
      price: products2[key].price,
      meta: products2[key].meta
    }));
  });
}

isObject(obj: any): boolean {
  return typeof obj === 'object';
}

}
