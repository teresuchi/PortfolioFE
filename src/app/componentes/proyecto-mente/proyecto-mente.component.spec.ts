import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoMenteComponent } from './proyecto-mente.component';

describe('ProyectoMenteComponent', () => {
  let component: ProyectoMenteComponent;
  let fixture: ComponentFixture<ProyectoMenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoMenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoMenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
