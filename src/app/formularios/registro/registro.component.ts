import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  horasAPagar: number;
  horasExtras: number;
  subTotal: number;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styles: []
})
export default class RegistroComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  totalPagar!: number;
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}
  ngOnInit() {
    this.formGroup = this.initForm();
    this.cargar();
    this.calTotal();
  }
  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horasTrabajadas: ['']
    });
  }
  calcularSalario(horasTrabajadas: number): { horasAPagar: number; horasExtras: number; subTotal: number } {
    let horasAPagar = 0;
    let horasExtras = 0;
    let subTotal = 0;
    if (horasTrabajadas > 40) {
      horasExtras = horasTrabajadas - 40;
      horasAPagar = 40;
      subTotal = (horasAPagar * 70) + (horasExtras * 140);
    } else {
      horasAPagar = horasTrabajadas;
      horasExtras = 0;
      subTotal = horasAPagar * 70;
    }
    return {horasAPagar, horasExtras, subTotal};
  }
  calTotal(): void {
    this.totalPagar = this.empleados.reduce((acc, empleado) => acc + empleado.subTotal, 0);
  }
  onSubmit(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
    const { horasAPagar, horasExtras, subTotal } = this.calcularSalario(parseInt(horasTrabajadas, 10));
    const nuevoEmpleado: Empleado = {
      matricula,
      nombre,
      correo,
      edad: parseInt(edad, 10),
      horasTrabajadas: parseInt(horasTrabajadas, 10),
      horasAPagar,
      horasExtras,
      subTotal
    };
    this.empleados.push(nuevoEmpleado);
    this.guardar();
    this.formGroup.reset();
  }
  guardar(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
  cargar(): void {
    const empGuardado = localStorage.getItem('empleados');
    if (empGuardado) {
      this.empleados = JSON.parse(empGuardado);
    }
  }
  modificar(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);
    if (empleado) {
      empleado.nombre = nombre;
      empleado.correo = correo;
      empleado.edad = parseInt(edad, 10);
      empleado.horasTrabajadas = parseInt(horasTrabajadas, 10);
      const { horasAPagar, horasExtras, subTotal } = this.calcularSalario(empleado.horasTrabajadas);

      empleado.horasAPagar = horasAPagar;
      empleado.horasExtras = horasExtras;
      empleado.subTotal = subTotal;
      this.guardar();
      this.calTotal();
    }
  }
  eliminar(): void {
    const { matricula } = this.formGroup.value;
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    this.guardar();
    this.calTotal();
  }
  imTabla(): void {
    this.mostrarTabla = true;
  }
}
