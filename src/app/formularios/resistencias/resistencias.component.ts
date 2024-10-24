import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: []
})
export default class ResistenciasComponent{
  resistencia!: FormGroup;
  resistencias: any[] = [];
  valoresCalculados: any[] = [];
  valor!: number;
  valorMax!: number;
  valorMin!: number;
  nombre:string='resistencias3'
  constructor(private fb: FormBuilder) {
    this.resistencia = this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: ['']
    });
  }
  calGuardar(): void {
    const resistenciaGuardada = {
      color1: this.resistencia.get('color1')?.value,
      color2: this.resistencia.get('color2')?.value,
      color3: this.resistencia.get('color3')?.value,
      tolerancia: this.resistencia.get('tolerancia')?.value
    };
    this.resistencias.push(resistenciaGuardada);
    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));
  }

  imprimir(): void {
    this.valoresCalculados = this.resistencias.map(resistencia=>{
      const color1Value = this.convertir(resistencia.color1);
      const color2Value = this.convertir(resistencia.color2);
      const color3Value = this.convertir(resistencia.color3);
      const toleranciaValue = this.calcular(resistencia.tolerancia);
      const valor = (color1Value * 10 + color2Value) * Math.pow(10, color3Value);
      const valorMax = valor + (valor * toleranciaValue);
      const valorMin = valor - (valor * toleranciaValue);
      return {
        ...resistencia,
        valor,
        valorMax,
        valorMin
      };
    });
  }
  convertir(color: string): number {
    const colorNum = this.operaycolor(color);
    return colorNum.num;
  }
  operaycolor(color: string): { num: number; bgColor: string } {
    switch (color.toLowerCase()) {
      case 'negro': return { num: 0, bgColor: '#151515' };
      case 'cafe': return { num: 1, bgColor: '#C8A971' };
      case 'rojo': return { num: 2, bgColor: '#F92626' };
      case 'naranja': return { num: 3, bgColor: '#FF8000' };
      case 'amarillo': return { num: 4, bgColor: '#FAED39' };
      case 'verde': return { num: 5, bgColor: '#33D933' };
      case 'azul': return { num: 6, bgColor: '#6872FD' };
      case 'morado': return { num: 7, bgColor: '#683475' };
      case 'gris': return { num: 8, bgColor: '#9F9FA0' };
      case 'blanco': return { num: 9, bgColor: '#F7F7F8' };
      case 'oro': return { num: 0, bgColor: '#EFB810' };
      case 'plata': return { num: 0, bgColor: '#BAB9B4' };
      default: return { num: 0, bgColor: '#EFB810' };
    }
  }
  calcular(tolerancia: string): number {
    if (tolerancia === 'Oro') return 0.05;
    else if (tolerancia === 'Plata') return 0.1;
    return 0;
  }
}
