import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateUtilsService } from 'src/app/shared/services/date-utils.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
export interface ProductData {
  category2: string;
  price2: number;
}
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  category2: string;
  price2: number;
  products2: any[] = [];
  categoriess: string[] = ['casa', 'saúde', 'educação'];
  selectedCategory: string = '';
  productsArray: ProductData[] = [];
  selectedYear: string;
  selectedMonth: string = "Janeiro";
  meses: string[] = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  constructor(
    private authService: FirebaseAuthService,
    private dateUtilsService: DateUtilsService) { }

  ngOnInit() {
    this.fetchProductsFromFirebase2();
    this.selectedYear = new Date().getFullYear().toString();
    const now = new Date();
    this.selectedMonth = this.meses[now.getMonth()];
    this.selectedYear = this.getYear();
  }
  getYear(): string {
    const currentDate = new Date();
    return currentDate.getFullYear().toString();
  }

  fetchProductsFromFirebase2() {
    this.authService.fetchProductsFromFirebase2().subscribe((products2) => {
      this.products2 = products2;
      this.productsArray = [];
      for (const key in products2) {
        if (products2.hasOwnProperty(key)) {
          this.productsArray.push({
            category2: products2[key].key,
            price2: products2[key].price,
          });
        }
      }
    });
  }
  addNewProduct2() {
    if (this.category2 && this.price2 > 0 && this.selectedMonth && this.selectedYear && this.selectedCategory) {
      this.authService.addProductToDatabase2(this.selectedYear, this.selectedMonth, this.category2, this.price2, this.selectedCategory,
        (error) => {
          if (!error) {
            console.log('Produto adicionado com sucesso!');
            this.category2 = '';
            this.price2 = 0;
          } else {
            console.error('Erro ao adicionar produto ao banco de dados:', error);
          }
        }
      );
    } else {
      console.error('Preencha todos os campos corretamente.');
    }
  }


  deleteProduct2(category2: string) {
    this.authService.deleteProductFromDatabase2(category2, (error) => {
      if (error) {
        console.error('Erro ao excluir produto:', error);
      } else {
        console.log('Produto excluído com sucesso!');
      }
    });
  }
  selecionarMesAnterior() {
    const monthIndex = this.meses.indexOf(this.selectedMonth);
    if (monthIndex > 0) {
      this.selectedMonth = this.meses[monthIndex - 1];
    } else {
      this.selectedMonth = "Dezembro";
      this.selectedYear = (parseInt(this.selectedYear) - 1).toString();
    }
  }

  selecionarProximoMes() {
    const monthIndex = this.meses.indexOf(this.selectedMonth);
    if (monthIndex < this.meses.length - 1) {
      this.selectedMonth = this.meses[monthIndex + 1];
    } else {
      this.selectedMonth = "Janeiro";
      this.selectedYear = (parseInt(this.selectedYear) + 1).toString();
    }
  }

  exibirDataResumida() {
    if (this.selectedYear === new Date().getFullYear().toString()) {
      return `${this.selectedMonth}`;
    } else {
      return `${this.selectedMonth.substr(0, 3)}. ${this.selectedYear}`;
    }
  }
}
