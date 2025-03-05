import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../app.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule,TranslateModule], // ✅ Se usa ReactiveFormsModule
})
export class ItemComponent implements OnInit {
  @Input() item: any = null;
  itemForm!: FormGroup; 
  collectionName = 'documentos';
  isEditing = false;

  constructor(private modalController: ModalController, private fb: FormBuilder,private translate: TranslateService) {}

  ngOnInit(): void {
    this.initForm();

    // Si hay un ítem, lo precargamos en el formulario
    if (this.item) {
      this.isEditing = true;
      this.itemForm.patchValue(this.item);
    }
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async save(): Promise<void> {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    try {
      if (this.isEditing && this.item.id) {
        const docRef = doc(db, this.collectionName, this.item.id);
        await updateDoc(docRef, this.itemForm.value);
        console.log('Ítem actualizado con éxito:', this.itemForm.value);
      } else {
        await addDoc(collection(db, this.collectionName), this.itemForm.value);
        console.log('Ítem creado con éxito:', this.itemForm.value);
      }
      this.modalController.dismiss(this.itemForm.value);
    } catch (error) {
      console.error('Error al guardar el ítem:', error);
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }


  close(): void {
    this.modalController.dismiss();
  }
}
