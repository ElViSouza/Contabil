import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
export interface ProductData {
  category: string;
  price: number;
}

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  category: string = ''; 
  productName: string = '';
  price: number;
  category2: string = ''; 
  productName2: string = '';
  price2: number = 0;
  productAdded: boolean = true;
  products: any[] = [];
  products2: any[] = [];
  categories: any[] = [];
  value = 'Clear me';
 displayedColumns: string[] = ['category', 'price', 'actions'];

  productsArray: ProductData[] = [];
  productsArray2: ProductData[] = [];

  constructor(
    private authService: FirebaseAuthService,
    private router: Router) { }


  ngOnInit() {
    this.fetchProductsFromFirebase();
   }
// Por exemplo, dentro de um componente
addNewProduct() {
  if (this.category && this.price > 0) {
    this.authService.addProductToDatabase(this.category, this.price, (error) => {
      if (!error) {
        console.log('Produto adicionado com sucesso!');
        // Limpar os campos após adicionar o produto
        this.category = '';
        this.price = 0;
      } else {
        console.error('Erro ao adicionar produto ao banco de dados:', error);
      }
    });
  } else {
    console.error('Preencha todos os campos corretamente.');
  }
}
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}
deleteProduct(category: string) {
  // Chame o método do serviço para excluir um produto
  this.authService.deleteProductFromDatabase(category, (error) => {
    if (error) {
      console.error("Erro ao excluir produto:", error);
    } else {
      console.log("Produto excluído com sucesso!");
    }
  });
}





fetchProductsFromFirebase() {
  this.authService.fetchProductsFromFirebase().subscribe(products => {
    this.products = products;
    console.log('1',this.products);
    this.productsArray2 = [];

    // Iterar pelas chaves do objeto products2 e adicionar os dados corretos a productsArray
    for (const key in products) {
      if (products.hasOwnProperty(key)) {
        this.productsArray2.push({
          category: products[key].key, // Use a propriedade 'category' em vez de 'key'
          price: products[key].price,
        });
      }
    }
  });
}


isObject(obj: any): boolean {
  return typeof obj === 'object';
}
next() {
  this.router.navigate(['/despesas']);
}

}
