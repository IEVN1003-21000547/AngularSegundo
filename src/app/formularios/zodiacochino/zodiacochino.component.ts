import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiacochino',
  standalone: true,
  imports: [],
  templateUrl: './zodiacochino.component.html',
  styles: ``
})
export class ZodiacochinoComponent {
  formulario!: FormGroup;
  dia!: number;
  mes!: number;
  sexo!: string;
  horoscopo!: string;
  edad!: number;
  nombreCompleto!: string;
  imagen!: string;
  resultado: boolean = false;
  constructor() { }
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apaterno: new FormControl('', Validators.required),
      amaterno: new FormControl('', Validators.required),
      anio: new FormControl('', [Validators.required, Validators.min(1900)])
    });
  }
  calcularHoroscopo(): void {
    const nombre = this.formulario.get('nombre')?.value;
    const apaterno = this.formulario.get('apaterno')?.value;
    const amaterno = this.formulario.get('amaterno')?.value;
    const anio = this.formulario.get('anio')?.value;
    const fechaActual = new Date();
    this.edad = fechaActual.getFullYear() - anio;
    if (fechaActual.getMonth() + 1 < this.mes || (fechaActual.getMonth() + 1 === this.mes && fechaActual.getDate() < this.dia)) {
      this.edad--;
    }
    this.nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;
    const resto = anio % 12;
    if (resto === 0) {
      this.horoscopo = 'Mono';
      this.imagen = 'https://www.clarin.com/img/westernastrology/mono.svg';
    } else if (resto === 1) {
      this.horoscopo = 'Gallo';
      this.imagen = 'https://www.clarin.com/img/westernastrology/gallo.svg';
    } else if (resto === 2) {
      this.horoscopo = 'Perro';
      this.imagen = 'https://www.clarin.com/img/westernastrology/perro.svg';
    } else if (resto === 3) {
      this.horoscopo = 'Cerdo';
      this.imagen = 'https://www.clarin.com/img/westernastrology/chancho.svg';
    } else if (resto === 4) {
      this.horoscopo = 'Rata';
      this.imagen = 'https://www.clarin.com/img/westernastrology/rata.svg';
    } else if (resto === 5) {
      this.horoscopo = 'Buey';
      this.imagen = 'https://www.clarin.com/img/westernastrology/bufalo.svg';
    } else if (resto === 6) {
      this.horoscopo = 'Tigre';
      this.imagen = 'https://www.clarin.com/img/westernastrology/tigre.svg';
    } else if (resto === 7) {
      this.horoscopo = 'Conejo';
      this.imagen = 'https://www.clarin.com/img/westernastrology/conejo.svg';
    } else if (resto === 8) {
      this.horoscopo = 'Dragón';
      this.imagen = 'https://www.clarin.com/img/westernastrology/dragon.svg';
    } else if (resto === 9) {
      this.horoscopo = 'Serpiente';
      this.imagen = 'https://www.clarin.com/img/westernastrology/serpiente.svg';
    } else if (resto === 10) {
      this.horoscopo = 'Caballo';
      this.imagen = 'https://www.clarin.com/img/westernastrology/caballo.svg';
    } else if (resto === 11) {
      this.horoscopo = 'Cabra';
      this.imagen = 'https://www.clarin.com/img/westernastrology/cabra.svg';
    }
    this.resultado = true;
  }
}
