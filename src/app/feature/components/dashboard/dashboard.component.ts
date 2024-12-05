import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth.service';
import Chart from 'chart.js/auto';

// import { ProductData } from '../summary/summary.component';
export interface ProductData {
  category2: string;
  price2: number;
  selectedCategory: string;
  year: string;
  month: string; // Adicione esta propriedade
}
export interface ProductDataa {
  category2: string;
  price2: number;
}

export interface ExpenseData {
  category2: string;
  price2: number;
  selectedCategory: string;
  year: string;
  month: string;
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
  productsArray: ProductData[] = [];
  productsArrayy: ProductDataa[] = [];
  products2: any[];
  categoriaSelecionada: string ='' ;
  selectedItem: any; // Declare a variável para armazenar o item selecionado
  total: number = 0;
  exibe = false
  private myPieChart: Chart;
  constructor(
    public authService: FirebaseAuthService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.fetchProductsFromFirebase()
    this.fetchProductsFromFirebase2();
    this.selectedYear = new Date().getFullYear().toString();
    const now = new Date();
    this.selectedMonth = this.meses[now.getMonth()];
    this.selectedYear = this.getYear();
  }
  calcularTotal() {
    this.total = this.filtrarPorCategoria(this.categoriaSelecionada, this.selectedMonth)
      .reduce((acc, product) => acc + product.price2, 0);
  }
  
  // grafic() {
  //   // Seus dados
  //   const data = {
  //     labels: ["Saúde", "Casa", ],
  //     datasets: [{
  //       data: [1000, 1000],
  //       backgroundColor: ["#FF5733", "#33FF57"],
  //     }],
  //   };

  //   // Configurações do gráfico
  //   const options = {
  //     responsive: false,
  //     maintainAspectRatio: true,
  //     width: '400', // Defina a largura desejada aqui
  //   };

  //   // Crie o gráfico de pizza
  //   const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
  //   const myPieChart = new Chart(ctx, {
  //     type: 'pie',
  //     data: data,
  //     options: options,
  //   });
  // }

  
  getCategoriasUnicas(): string[] {
    return [...new Set(this.productsArray.map(product => product.selectedCategory))];
  }
  filtrarPorCategoria(categoria: string, mesSelecionado: string): ProductData[] {
    return this.productsArray.filter(product =>
      product.selectedCategory === categoria && product.month === mesSelecionado
    );
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
  filtrarDespesasPorMes() {
    return this.productsArray.filter((product) => product.month === this.selectedMonth);
  }
  selecionarMesAnterior() {
    const monthIndex = this.meses.indexOf(this.selectedMonth);
    if (monthIndex > 0) {
      this.selectedMonth = this.meses[monthIndex - 1];
      // Atualize as despesas exibidas quando o mês for alterado
      this.filtrarDespesasPorMes();
    } else {
      this.selectedMonth = "Dezembro";
      this.selectedYear = (parseInt(this.selectedYear) - 1).toString();
    }
  }

  selecionarProximoMes() {
    const monthIndex = this.meses.indexOf(this.selectedMonth);
    if (monthIndex < this.meses.length - 1) {
      this.selectedMonth = this.meses[monthIndex + 1];
      // Atualize as despesas exibidas quando o mês for alterado
      this.filtrarDespesasPorMes();
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
      console.log('dd', products2);
      this.products2 = products2;
      this.productsArray = [];

      for (const year in products2) {
        if (products2.hasOwnProperty(year)) {
          for (const month in products2[year]) {
            if (products2[year].hasOwnProperty(month)) {
              for (const expenseKey in products2[year][month]) {
                if (products2[year][month].hasOwnProperty(expenseKey)) {
                  const expense: ProductData = {
                    category2: expenseKey,
                    price2: products2[year][month][expenseKey].price,
                    selectedCategory: products2[year][month][expenseKey].selectedCategory,
                    year: year,
                    month: month
                  };
                  this.productsArray.push(expense);
                }
              }
            }
          }
        }
      }
    });
  }
  fetchProductsFromFirebase(year: string = '2023', month: string = 'Janeiro') {
    this.authService.fetchProductsFromFirebase(year, month).subscribe(products => {
      console.log('1', products);
      // this.productsArrayy = Object.keys(products).map((key) => ({
      //   key: products[key].key,
      // }));

    });
  }
}

