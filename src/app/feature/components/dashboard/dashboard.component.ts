import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import { ProductData } from '../summary/summary.component';
export interface ProductDataw {
  key: string;
  // price: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedYear: string;
  selectedMonth: string = "Janeiro";
  meses: string[] = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  productsArray2: ProductData[] = [];
  productsArray: ProductDataw[] = [];
  products2: any[];
  constructor(
    public authService: FirebaseAuthService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.fetchProductsFromFirebase2();
    this.fetchProductsFromFirebase();

    this.selectedYear = new Date().getFullYear().toString();

    const now = new Date();
    this.selectedMonth = this.meses[now.getMonth()];
    this.selectedYear = this.getYear();
  }
  getObjectKeys(obj: any): string[] {
    if (obj) {
      return Object.keys(obj);
    } else {
      return [];
    }
  }
  getYear(): string {
    const currentDate = new Date();
    return currentDate.getFullYear().toString();
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
  // next() {
  //   this.router.navigate(['/inicio']);
  // }
  // getFirstNameFromEmail(email: string): string {
  //   // Divida o email usando o "@" como separador e pegue a primeira parte
  //   const emailParts = email.split('@');
  //   return emailParts[0];
  // }

  fetchProductsFromFirebase2() {
    this.authService.fetchProductsFromFirebase2().subscribe((products2) => {
      console.log('d', products2);

      this.productsArray2 = products2.map((product) => ({
        key: product.key,
        price: product.price,
        selectedCategory: product.selectedCategory
      }));
      console.log(this.productsArray2);
    });
  }


  fetchProductsFromFirebase(year: string = '2023', month: string = 'Janeiro') {
    this.authService.fetchProductsFromFirebase(year, month).subscribe(products => {
      console.log('1', products);
      this.productsArray = Object.keys(products).map((key) => ({
        key: products[key].key,
      }));

    });
  }
}

