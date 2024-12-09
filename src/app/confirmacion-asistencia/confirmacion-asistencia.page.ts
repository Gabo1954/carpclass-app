import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacion-asistencia',
  templateUrl: './confirmacion-asistencia.page.html',
  styleUrls: ['./confirmacion-asistencia.page.scss'],
})
export class ConfirmacionAsistenciaPage implements OnInit {
  userName: string = '';
  asignatura: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtiene los parámetros pasados desde la página anterior
    this.route.queryParams.subscribe(params => {
      this.userName = params['userName'] || 'Alumno';
      this.asignatura = params['asignatura'] || 'Asignatura Desconocida';
    });
  }
}
