import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiacochino',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiacochino.component.html',
  styles: []
})
export default class ZodiacochinoComponent {
  form!: FormGroup;
  signoZodiacal!: string;
  edad!: number;
  nombreCompleto!: string;
  imagen!: string;
  resultado: boolean = false;
  mensajeFinal!: string;
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: [''],
      apellidoP: [''],
      apellidoM: [''],
      dia: [''],
      mes: [''],
      anio: ['']
    });
  }
  calcularZodiaco(): void {
    const nombre = this.form.get('nombre')?.value;
    const apellidoP = this.form.get('apellidoP')?.value;
    const apellidoM = this.form.get('apellidoM')?.value;
    const dia = this.form.get('dia')?.value;
    const mes = this.form.get('mes')?.value;
    const anio = this.form.get('anio')?.value;
    const fechaActual = new Date();
    this.edad = fechaActual.getFullYear() - anio;
    if (fechaActual.getMonth() + 1 < mes || (fechaActual.getMonth() + 1 == mes && fechaActual.getDate() < dia)){
      this.edad--;
    }
    const resto = anio % 12;
    switch (resto){
      case 0:
        this.signoZodiacal = 'Mono';
        this.imagen = 'https://www.clarin.com/img/westernastrology/mono.svg';
        break;
      case 1:
        this.signoZodiacal = 'Gallo';
        this.imagen = 'https://www.clarin.com/img/westernastrology/gallo.svg';
        break;
      case 2:
        this.signoZodiacal = 'Perro';
        this.imagen = 'https://www.clarin.com/img/westernastrology/perro.svg';
        break;
      case 3:
        this.signoZodiacal = 'Cerdo';
        this.imagen = 'https://www.clarin.com/img/westernastrology/chancho.svg';
        break;
      case 4:
        this.signoZodiacal = 'Rata';
        this.imagen = 'https://www.clarin.com/img/westernastrology/rata.svg';
        break;
      case 5:
        this.signoZodiacal = 'Buey';
        this.imagen = 'https://www.clarin.com/img/westernastrology/bufalo.svg';
        break;
      case 6:
        this.signoZodiacal = 'Tigre';
        this.imagen = 'https://www.clarin.com/img/westernastrology/tigre.svg';
        break;
      case 7:
        this.signoZodiacal = 'Conejo';
        this.imagen = 'https://www.clarin.com/img/westernastrology/conejo.svg';
        break;
      case 8:
        this.signoZodiacal = 'Dragón';
        this.imagen = 'https://www.clarin.com/img/westernastrology/dragon.svg';
        break;
      case 9:
        this.signoZodiacal = 'Serpiente';
        this.imagen = 'https://www.clarin.com/img/westernastrology/serpiente.svg';
        break;
      case 10:
        this.signoZodiacal = 'Caballo';
        this.imagen = 'https://www.clarin.com/img/westernastrology/caballo.svg';
        break;
      case 11:
        this.signoZodiacal = 'Cabra';
        this.imagen = 'https://www.clarin.com/img/westernastrology/cabra.svg';
        break;
    }
    this.nombreCompleto = `${nombre} ${apellidoP} ${apellidoM}`;
    this.mensajeFinal = `Hola ${this.nombreCompleto}, tu edad es ${this.edad} y tu signo del zodiaco chino es ${this.signoZodiacal}.`;
    this.resultado = true;
  }
}
