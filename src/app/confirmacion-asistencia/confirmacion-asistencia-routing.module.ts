import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionAsistenciaPage } from './confirmacion-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacionAsistenciaPageRoutingModule {}
