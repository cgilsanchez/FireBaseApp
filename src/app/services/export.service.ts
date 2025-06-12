import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportRecetaComoCSV(receta: {
    titulo: string;
    ingredientes: string[];
    descripcion: string;
    chef: string;
  }): void {
    const csvData = [
      ['Título', receta.titulo],
      ['Chef', receta.chef],
      ['Ingredientes', receta.ingredientes.join(', ')],
      ['Descripción', receta.descripcion.replace(/\n/g, ' | ')],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `${receta.titulo}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
