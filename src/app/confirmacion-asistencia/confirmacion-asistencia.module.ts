import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionAsistenciaPageRoutingModule } from './confirmacion-asistencia-routing.module';

import { ConfirmacionAsistenciaPage } from './confirmacion-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionAsistenciaPageRoutingModule
  ],
  declarations: [ConfirmacionAsistenciaPage]
})
export class ConfirmacionAsistenciaPageModule {}
