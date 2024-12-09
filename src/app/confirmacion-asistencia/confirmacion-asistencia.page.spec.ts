import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionAsistenciaPage } from './confirmacion-asistencia.page';

describe('ConfirmacionAsistenciaPage', () => {
  let component: ConfirmacionAsistenciaPage;
  let fixture: ComponentFixture<ConfirmacionAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
