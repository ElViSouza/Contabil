import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  selecionarMesAnterior(selectedMonth: string, selectedYear: string, meses: string[]): { newSelectedMonth: string, newSelectedYear: string } {
    const monthIndex = meses.indexOf(selectedMonth);
    let newSelectedMonth: string;
    let newSelectedYear: string;

    if (monthIndex > 0) {
      newSelectedMonth = meses[monthIndex - 1];
      newSelectedYear = selectedYear;
    } else {
      // Se for janeiro, retroceda para dezembro e atualize o ano
      newSelectedMonth = "Dezembro";
      newSelectedYear = (parseInt(selectedYear) - 1).toString();
    }

    return { newSelectedMonth, newSelectedYear };
  }

  selecionarProximoMes(selectedMonth: string, selectedYear: string, meses: string[]): { newSelectedMonth: string, newSelectedYear: string } {
    const monthIndex = meses.indexOf(selectedMonth);
    let newSelectedMonth: string;
    let newSelectedYear: string;

    if (monthIndex < meses.length - 1) {
      newSelectedMonth = meses[monthIndex + 1];
      newSelectedYear = selectedYear;
    } else {
      // Se for dezembro, avance para janeiro e atualize o ano
      newSelectedMonth = "Janeiro";
      newSelectedYear = (parseInt(selectedYear) + 1).toString();
    }

    return { newSelectedMonth, newSelectedYear };
  }

  exibirDataResumida(selectedMonth: string, selectedYear: string): string {
    const currentYear = new Date().getFullYear().toString();

    if (selectedYear === currentYear) {
      // Se o ano for o ano atual, exiba apenas o mês e o ano
      return `${selectedMonth}`;
    } else {
      // Caso contrário, exiba a data resumida
      return `${selectedMonth.substr(0, 3)}. ${selectedYear}`;
    }
  }
}
