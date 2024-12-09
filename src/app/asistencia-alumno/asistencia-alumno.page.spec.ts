import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Asegúrate de tener este servicio

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {
  userName: string = ''; // Nombre del alumno autenticado
  asignaturas: any[] = []; // Lista de asignaturas del alumno

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener información del usuario autenticado
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.userName = user.nombre; // Asignar el nombre del usuario

        // Cargar las asignaturas asociadas al alumno desde el db.json
        this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(data => {
          this.asignaturas = data.filter(asignatura =>
            asignatura.estudiantes.includes(user.id) // Filtrar asignaturas del alumno
          );
        });
      } else {
        // Si no hay un usuario autenticado, redirige al login
        this.router.navigate(['/login']);
      }
    });
  }

  // Redirigir a la página de confirmación
  registrarAsistencia(asignatura: any) {
    // Obtener el id del alumno desde el token
    this.authService.getUser().subscribe(user => {
      const alumnoId = user.id;

      // Obtener el estado de asistencia (está en un arreglo simple)
      this.http.get<any[]>('http://localhost:3000/estadoAsistencia').subscribe(asistencia => {
        // Verificar si ya existe el estado de asistencia para este alumno en la asignatura
        const estadoExistente = asistencia.find(item => item.idAlumno === alumnoId && item.asignaturaId === asignatura.id);

        if (estadoExistente) {
          // Si ya existe, actualizar el estado (por ejemplo, poner "presente")
          estadoExistente.estado = 'presente';

          // Actualizar el estado en el db.json
          this.http.put(`http://localhost:3000/estadoAsistencia/${estadoExistente.id}`, estadoExistente).subscribe(() => {
            // Redirigir a la página de confirmación con los parámetros necesarios
            this.router.navigate(['/confirmacion-asistencia'], {
              queryParams: { 
                userName: this.userName, 
                asignatura: asignatura.nombre // Pasar el nombre de la asignatura
              },
            });
          });
        } else {
          // Si no existe, crear un nuevo registro de asistencia
          const nuevoEstado = { idAlumno: alumnoId, estado: 'presente', asignaturaId: asignatura.id };

          // Insertar el nuevo estado en el db.json
          this.http.post('http://localhost:3000/estadoAsistencia', nuevoEstado).subscribe(() => {
            // Redirigir a la página de confirmación con los parámetros necesarios
            this.router.navigate(['/confirmacion-asistencia'], {
              queryParams: { 
                userName: this.userName, 
                asignatura: asignatura.nombre // Pasar el nombre de la asignatura
              },
            });
          });
        }
      });
    });
  }
}
