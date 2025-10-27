import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User, UserRegistration} from '../models/user.model';
import { StorageService } from './storage.service';


/**
 * Servicio de Autenticacion
 * Gestonar el registro, Login, Logout y estado de autenticacion
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService{
    private readonly CURRENT_USER_KEY = 'currentUser';
    private readonly USERS_KEY = 'users';

    //BehaviorSubject para mantener el estado del usuario actual
    private currentUserSubject : BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;

    constructor(private storageService : StorageService){
        //Inicializar con el usuario guardado el LocalStorage (si existe)
        const savedUser = this.storageService.getItem<User>(this.CURRENT_USER_KEY);
        this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    /**
     * Obtiene el valor actual del usuario autenticado
     */

    get currentUserValue(): User | null {
      return this.currentUserSubject.value
    }

    /**
     * Registrar un nuevo usuario
     * @param userData Datos del usuario a registrar
     * @returns El usuario creado o null si el username/email ya existen
     */

    register(userData: UserRegistration): User | null{
    //Obtener usuarios existentes
    const users = this.getAllUsers();

    //Verificar si el usuario o email ya existen
    const userExists = users.some(
        u => u.username === userData.username || u.email === userData.email
    );

    if(userExists){
      console.error('El usuario o email ya existen')
      return null;
    }

     const newUser: User = {
        id: this.generateId(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        followers: [],
        following: [],
        createdAt: new Date()
    };

    //Guardar usuario
    users.push(newUser);
    this.storageService.setItem(this.USERS_KEY,users)

    return newUser;
  }

/**
 * Iniciar sesion con username y password
 * @param username Nombre de Usuario
 * @param password Contraseña
 * @returns El usuario si las credenciales son correctas, null si no
 */

  login(username: string, password: string): User | null {
      const users = this.getAllUsers();

      //Buscar usuario con credenciales correctas
      const user = users.find(
          u => u.username === username && u.password === password
      );
      if(user){
          //Guardamos usuario actual (sin password)
          const userWithoutPassword = {...user};
          delete userWithoutPassword.password;

          this.storageService.setItem(this.CURRENT_USER_KEY, userWithoutPassword);
          this.currentUserSubject.next(userWithoutPassword);

          return userWithoutPassword
      }
      return null;
    }

    /**
     * Cerrar la sesion del usuario actual
     */

    logout(): void{
        this.storageService.removeItem(this.CURRENT_USER_KEY)
        this.currentUserSubject.next(null)
    }

    /**
     * Verificar si hay un usuario autenticado
     * @returns true si hay un usuario atenticado, false sino
     */

    isAuthenticated(): boolean{
        return this.currentUserValue !== null;
    }

  /**
   * Obtiene todos los usuarios registrados
   * @returns Array de usuarios
   */

  private getAllUsers(): User[]{
      return this.storageService.getItem<User[]>(this.USERS_KEY) || []
  }

  private generateId(): string {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}