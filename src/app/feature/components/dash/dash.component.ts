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
  // selectedMonth: any;
  isModalVisible: boolean = false;
  productAdded: boolean = true;
  products: any[] = [];
  products2: any[] = [];
  categories: any[] = [];
  value = 'Clear me';
  displayedColumns: string[] = ['category', 'price', 'actions'];
  selectedYear: string;
  meses: string[] = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  selectedMonth: string = "Janeiro";
  // selectedYear: number = 2023;

  productsArray: ProductData[] = [];
  productsArray2: ProductData[] = [];

  constructor(
    private authService: FirebaseAuthService,
    private router: Router) { }


  ngOnInit() {
    console.log('Componente Dash carregado'); // Verifica se o componente está sendo carregado
    this.fetchProductsFromFirebase();
    // Inicializa a variável selectedYear como uma string vazia
    this.selectedYear = new Date().getFullYear().toString();
    // this.selectedMonth = '';
    // Obtém o ano atual e atribui à variável selectedYear
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const now = new Date();
    this.selectedMonth = months[now.getMonth()];
    this.selectedYear = this.getYear();
    console.log('selectedMonth:', this.selectedMonth); // Verifica o valor de selectedMonth
    console.log('selectedYear:', this.selectedYear); // Verifica o valor de selectedYear
  }
  abrirModal() {
    this.isModalVisible = true;
  }

  // Método para fechar o modal
  fecharModal() {
    this.isModalVisible = false;
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
      // Se for janeiro, retroceda para dezembro e atualize o ano
      this.selectedMonth = "Dezembro";
      this.selectedYear = (parseInt(this.selectedYear) - 1).toString();
    }
  }

  selecionarProximoMes() {
    const monthIndex = this.meses.indexOf(this.selectedMonth);
    if (monthIndex < this.meses.length - 1) {
      this.selectedMonth = this.meses[monthIndex + 1];
    } else {
      // Se for dezembro, avance para janeiro e atualize o ano
      this.selectedMonth = "Janeiro";
      this.selectedYear = (parseInt(this.selectedYear) + 1).toString();
    }
  }

  exibirDataResumida() {
    if (this.selectedYear === new Date().getFullYear().toString()) {
      // Se o ano for o ano atual, exiba apenas o mês e o ano
      return `${this.selectedMonth}`;
    } else {
      // Caso contrário, exiba a data resumida
      return `${this.selectedMonth.substr(0, 3)}. ${this.selectedYear}`;
    }
  }



  // Por exemplo, dentro de um componente
  addNewProduct() {
    if (this.category && this.price > 0 && this.selectedMonth && this.selectedYear) {
      this.authService.addProductToDatabase(this.selectedYear, this.selectedMonth, this.category, this.price, (error) => {
        if (!error) {
          console.log('Produto adicionado com sucesso!');
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


  fetchProductsFromFirebase(year: string = '2023', month: string = 'Janeiro') {
    this.authService.fetchProductsFromFirebase(year, month).subscribe(products => {
      this.products = products;
      console.log('1', this.products);
      this.productsArray2 = [];

      // Iterar pelos produtos e adicionar os dados corretos a productsArray2
      for (const product of this.products) {
        this.productsArray2.push({
          category: product.key, // Use a propriedade 'category' em vez de 'key'
          price: product.price,
        });
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
