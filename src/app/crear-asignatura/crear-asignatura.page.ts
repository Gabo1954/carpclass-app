import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
})
export class CrearAsignaturaPage {
  asignatura = {
    nombre: '',
    codigo: ''
  };

  constructor(private http: HttpClient) {}

  guardarAsignatura() {
    const url = 'http://localhost:3000/asignaturas'; // Cambia según tu servidor JSON
    this.http.post(url, this.asignatura).subscribe({
      next: () => {
        alert('Asignatura creada con éxito');
        this.asignatura = { nombre: '', codigo: '' }; // Limpia el formulario
      },
      error: (err) => {
        console.error('Error al guardar la asignatura:', err);
        alert('Ocurrió un error al guardar la asignatura');
      }
    });
  }
}
