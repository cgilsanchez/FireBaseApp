import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ItemComponent } from '../../components/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule // ✅ Importamos `TranslateModule` para los textos traducidos
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
