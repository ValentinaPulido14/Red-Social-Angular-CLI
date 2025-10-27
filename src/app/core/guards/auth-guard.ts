import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


/**
 * Guard de Autenticacion
 * Protege rutas que requieren que el usuario este autenticado
 */

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    //Verificar si el usuario está autenticado
    if (authService.isAuthenticated()){
        return true;
    }
        //Sino esta autenticado, redirigir al login
        console.warn('Acceso denegado. Redirigiendo al login...');
        return router.createUrlTree(['/login'])
};

/**
 * Guard para rutas publicas (login, register)
 * Redirige el feed si el usuario ya esta autenticado
 */

export const publicGuard = () =>{
    const authService = inject(AuthService);
    const router = inject(Router);

    //Si el usuario ya esta autenticado, redirige al feed
    if (authService.isAuthenticated()){
        console.log('Usuario ya autenticado. Regiriendo al feed...')
        return router.createUrlTree(['/feed']);
    }
    return true;
};
