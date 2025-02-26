import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../app.module';
import { RecetaService } from '../../services/receta.service';
import { ChefSelectorComponent } from '../chef-selector/chef-selector.component'; // 🔥 Importamos el componente

@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, ChefSelectorComponent], // 🔥 Lo agregamos a imports
})
export class RecetaFormComponent implements OnInit {
  @Input() receta: any;
  isEditing = false;
  recetaForm!: FormGroup; // ✅ Se define correctamente el FormGroup
  imagenArchivo: File | null = null;
  imagenPreview: string | null = null;

  constructor(
    private modalController: ModalController,
    private recetaService: RecetaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();

    if (this.receta?.id) {
      this.isEditing = true;
      this.recetaForm.patchValue(this.receta);
      this.imagenPreview = this.receta.imagenUrl || null;
    }
  }

  initForm() {
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      chefId: ['', Validators.required], // ✅ Ahora está sincronizado con el `Custom Value Accessor`
      ingredientes: this.fb.array([]),
      imagenUrl: [''],
    });
  }

  get ingredientes(): FormArray {
    return this.recetaForm.get('ingredientes') as FormArray;
  }

  agregarIngrediente() {
    this.ingredientes.push(this.fb.control('', Validators.required));
  }

  getIngredienteControl(index: number): FormControl {
    return this.ingredientes.at(index) as FormControl;
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.removeAt(index);
  }

  async save(): Promise<void> {
    if (this.recetaForm.invalid) {
      this.recetaForm.markAllAsTouched();
      return;
    }

    try {
      if (this.imagenArchivo) {
        const imageUrl = await this.uploadImage();
        this.recetaForm.patchValue({ imagenUrl: imageUrl });
      }

      if (this.isEditing) {
        await this.recetaService.updateReceta(this.receta.id, this.recetaForm.value);
      } else {
        await this.recetaService.createReceta(this.recetaForm.value);
      }

      this.modalController.dismiss(this.recetaForm.value);
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }

  seleccionarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenArchivo = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagenPreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async uploadImage(): Promise<string> {
    if (!this.imagenArchivo) return '';
    const storageRef = ref(storage, `recetas/${Date.now()}_${this.imagenArchivo.name}`);
    await uploadBytes(storageRef, this.imagenArchivo);
    return await getDownloadURL(storageRef);
  }

  close(): void {
    this.modalController.dismiss();
  }
}
