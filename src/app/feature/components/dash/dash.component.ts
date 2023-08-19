import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  category: string = ''; 
  productName: string = '';
  price: number = 0;
  meta: number;
  productAdded: boolean = true;
  products: any[] = [];

  constructor(private authService: FirebaseAuthService) { }


  ngOnInit() {
    // Recuperar produtos do Firebase Realtime Database e armazená-los no array 'products'
    // this.authService.addProductToDatabase(price,productName,productName).subscribe(products => {
    //   this.products = products;
    // });
    this.fetchProductsFromFirebase();
  }
// Por exemplo, dentro de um componente
addNewProduct() {
  if (this.category && this.productName && this.price > 0) {
    this.authService.addProductToDatabase(this.category, this.productName, this.price, this.meta)
      .then(() => {
        console.log('Produto adicionado com sucesso!');
        // Limpar os campos após adicionar o produto
        this.category = '';
        this.productName = '';
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
fetchProductsFromFirebase() {
  this.authService.fetchProductsFromFirebase().subscribe(products => {
    this.products = products;
    console.log(products);
  });
}

}
