import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  // Redirección inicial al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Página de login
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  // Página de restablecer contraseña
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },

  // Página principal protegida para docentes
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService],
    data: { expectedRole: 'docente' }
  },

  // Página principal protegida para alumnos
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoPageModule),
    canActivate: [AuthGuardService],
    data: { expectedRole: 'alumno' }
  },

  // Página de asistencia alumno
  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./asistencia-alumno/asistencia-alumno.module').then(m => m.AsistenciaAlumnoPageModule),
    canActivate: [AuthGuardService],
    data: { expectedRole: 'alumno' }
  },

  // Página de confirmación de asistencia
  {
    path: 'confirmacion-asistencia',
    loadChildren: () => import('./confirmacion-asistencia/confirmacion-asistencia.module').then(m => m.ConfirmacionAsistenciaPageModule),
    canActivate: [AuthGuardService],
    data: { expectedRole: 'alumno' }
  },

  // Página de creación de asignatura
  {
    path: 'crear-asignatura',
    loadChildren: () => import('./crear-asignatura/crear-asignatura.module').then(m => m.CrearAsignaturaPageModule),
    canActivate: [AuthGuardService],
    data: { expectedRole: 'docente' } // Solo accesible para docentes/directores
  },

  // Página de error 404
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
