import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { ApiService } from '../api.service'; 
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-asistencia-alumno',
  templateUrl: './asistencia-alumno.page.html',
  styleUrls: ['./asistencia-alumno.page.scss'],
})
export class AsistenciaAlumnoPage implements OnInit {
  userName: string = ''; 
  asignaturas: any[] = []; 
  sesionesClase: any[] = []; 
  qrCodeUrl: string = ''; // URL que se generará en el QR

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router,
    private apiService: ApiService,
    private platform: Platform // Agregado para verificar si estamos en una plataforma móvil
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.userName = user.nombre; 
        
        this.http.get<any[]>('http://localhost:3000/asignaturas').subscribe(data => {
          this.asignaturas = data; 
        });

        // Generar la URL del código QR que redirige a la confirmación de asistencia
        this.qrCodeUrl = `${window.location.origin}/confirmacion-asistencia`; // Generar la URL del QR
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  registrarAsistencia(sesion: any) {
    console.log('Asistencia registrada para la sesión:', sesion);
    alert('Asistencia registrada para la sesión: ' + sesion.fecha);
  }

  cerrarSesion() {
    this.authService.removeToken(); 
    this.router.navigate(['/login']); 
  }
}
