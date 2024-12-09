import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.page.html',
  styleUrls: ['./firma.page.scss'],
})
export class FirmaPage implements OnInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef;  // Usar '!' para indicar que se inicializa después
  signaturePad!: SignaturePad;  // Usar '!' para indicar que se inicializa después
  fechaFirma!: string;  // Usar '!' para indicar que se inicializa después

  constructor() {}

  ngOnInit() {
    // Configurar la fecha y hora de la firma
    const currentDate = new Date();
    this.fechaFirma = currentDate.toLocaleString(); // Fecha y hora actual

    // Configurar el lienzo de la firma
    const canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas);
  }

  // Función para limpiar el lienzo
  clearSignature() {
    this.signaturePad.clear();
  }

  // Función para guardar la firma
  saveSignature() {
    if (this.signaturePad.isEmpty()) {
      alert('Por favor, firme antes de guardar.');
      return;
    }

    // Obtener la firma como una imagen (base64)
    const signatureImage = this.signaturePad.toDataURL();

    // Guardar la firma, por ejemplo en una base de datos o en el almacenamiento local
    console.log('Firma guardada: ', signatureImage);
    console.log('Fecha y hora de la firma: ', this.fechaFirma);

    // Aquí puedes enviar la firma y la fecha a un backend o almacenarlo localmente
  }
}
