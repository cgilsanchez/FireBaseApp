import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../app.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-chef-selector',
  template: `
    <ion-item>
      <ion-label position="stacked">Chef</ion-label>
      <ion-select (ionChange)="onChefChange($event.detail.value)" [value]="selectedChef">
        <ion-select-option *ngFor="let chef of chefs" [value]="chef.id">
          {{ chef.nombre }}
        </ion-select-option>
      </ion-select>
    </ion-item>
  `,
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChefSelectorComponent),
      multi: true,
    },
  ],
})
export class ChefSelectorComponent implements ControlValueAccessor, OnInit {
  chefs: any[] = [];
  selectedChef: string | null = null;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  async ngOnInit() {
    await this.loadChefs();
  }

  async loadChefs() {
    try {
      const querySnapshot = await getDocs(collection(db, 'documentos'));
      this.chefs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data()['name'],
      }));
    } catch (error) {
      console.error('Error al cargar los chefs:', error);
    }
  }

  onChefChange(value: string) {
    if (this.selectedChef !== value) {
      this.selectedChef = value;
      console.log('Nuevo chef seleccionado:', value);
      this.onChange(value);
    }
  }
  
  

  writeValue(value: string): void {
    this.selectedChef = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
