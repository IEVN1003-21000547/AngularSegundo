import { Routes } from "@angular/router";


export default[
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'zodiacochino',
        loadComponent:()=>import('./zodiacochino/zodiacochino.component'),
    },
    {
        path: 'registro',
        loadComponent:()=>import('./registro/registro.component'),
    },
    {
        path: 'resistencias',
        loadComponent:()=>import('./resistencias/resistencias.component'),
    },


]as Routes
