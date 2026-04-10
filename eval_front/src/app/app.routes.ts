import { Routes } from '@angular/router';
import { Home } from './module/home/home';
import { Registrar } from './module/registrar/registrar';
import { Reporte } from './module/reporte/reporte';
import { Actualizar } from './module/actualizar/actualizar';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'registrar',
        component: Registrar,
    },
    {
        path: 'reporte',
        component: Reporte,
    },
    {
        path: 'actualizar/:id',
        component: Actualizar,
    },
    {
        path: '**',
        component: Home,
    },
];
