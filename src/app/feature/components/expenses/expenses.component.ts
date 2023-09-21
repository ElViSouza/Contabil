import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface ProductData {
  category: string;
  price: number;
}
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  formGroup: FormGroup;
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
  displayedColumns: string[] = [ 'category', 'price', 'actions'];
  categoriess: string[] = ['casa', 'saúde', 'educação'];
  selectedCategory: string = '';
  resultado: any[] = [];



  productsArray: ProductData[] = [];
  productsArray2: ProductData[] = [];
  card = false;

  constructor(
    private authService: FirebaseAuthService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fetchProductsFromFirebase2();
    this.formGroup = this.formBuilder.group({
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      selectedCategory: ['', Validators.required]
    });
  }
  isFormValid(): boolean {
    return !!this.category2 && this.price2 > 0 && !!this.selectedCategory;
  }
    

  fetchProductsFromFirebase2() {
    this.authService.fetchProductsFromFirebase2().subscribe((products2) => {
      this.products2 = products2;
      console.log('aqui',products2);
      

      this.productsArray = [];

      for (const key in products2) {
        if (products2.hasOwnProperty(key)) {
          this.productsArray.push({
            category: products2[key].key,
            price: products2[key].price,
          });
        }
      }
    });
  }
  addNewProduct2() {
    if (this.formGroup.valid) {
      const { category, price, selectedCategory } = this.formGroup.value;
      this.authService.addProductToDatabase2(
        category,
        price,
        selectedCategory,
        (error) => {
          if (!error) {
            console.log('Produto adicionado com sucesso!');
            // Limpar os campos após adicionar o produto
            this.formGroup.reset();
            this.card = false;
          } else {
            console.error(
              'Erro ao adicionar produto ao banco de dados:',
              error
            );
          }
        }
      );
    } else {
      console.error('Preencha todos os campos corretamente.');
    }
    // this.fetchProductsFromFirebase();
  }

  deleteProduct2(category2: string) {
    // Chame o método do serviço para excluir um produto
    this.authService.deleteProductFromDatabase2(category2, (error) => {
      if (error) {
        console.error('Erro ao excluir produto:', error);
      } else {
        console.log('Produto excluído com sucesso!');
      }
    });
  }
  isObject(obj: any): boolean {
    return typeof obj === 'object';
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
