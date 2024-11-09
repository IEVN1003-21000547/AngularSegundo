import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  pagoH: number;
  pagoHextra: number;
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
  empleadosParaImprimir: Empleado[] = [];
  totalPagar!: number;
  mostrarTabla: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.initForm();
    this.cargar();
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

  calcularSalario(horasTrabajadas: number): { pagoH: number; pagoHextra: number; subTotal: number } {
    let pagoH = 0;
    let pagoHextra = 0;
    let subTotal = 0;

    if (horasTrabajadas > 40) {
      const horasExtras = horasTrabajadas - 40;
      pagoH = 40 * 70;
      pagoHextra = horasExtras * 140;
      subTotal = pagoH + pagoHextra;
    } else {
      pagoH = horasTrabajadas * 70;
      pagoHextra = 0;
      subTotal = pagoH;
    }
    return { pagoH, pagoHextra, subTotal };
  }
  calTotal(): void {
    this.totalPagar = this.empleadosParaImprimir.reduce((acc, empleado) => acc + empleado.subTotal, 0);
  }
  onSubmit(): void {
    const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
    const { pagoH, pagoHextra, subTotal } = this.calcularSalario(parseInt(horasTrabajadas, 10));
    const nuevoEmpleado: Empleado = {
      matricula,
      nombre,
      correo,
      edad: parseInt(edad, 10),
      horasTrabajadas: parseInt(horasTrabajadas, 10),
      pagoH,
      pagoHextra,
      subTotal
    };

    const empleadoExistente = this.empleados.find(emp => emp.matricula === matricula);
    if (empleadoExistente) {
      Object.assign(empleadoExistente, nuevoEmpleado);
    } else {
      this.empleados.push(nuevoEmpleado);
    }
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
    const { matricula } = this.formGroup.value;
    const empleado = this.empleados.find(emp => emp.matricula === matricula);

    if (empleado) {
      this.formGroup.patchValue({
        matricula: empleado.matricula,
        nombre: empleado.nombre,
        correo: empleado.correo,
        edad: empleado.edad.toString(),
        horasTrabajadas: empleado.horasTrabajadas.toString()
      });
    }
  }

  eliminar(): void {
    const { matricula } = this.formGroup.value;
    this.empleados = this.empleados.filter(emp => emp.matricula !== matricula);
    this.empleadosParaImprimir = this.empleadosParaImprimir.filter(emp => emp.matricula !== matricula);
    this.guardar();
    this.calTotal();
  }

  imTabla(): void {
    this.empleadosParaImprimir = this.empleados.map(emp => ({ ...emp }));
    this.calTotal();
    this.mostrarTabla = true;
  }
}
