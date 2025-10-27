import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar el almacenamiento local (localStorage)
 * Proporciona metodos para guardar y recuperar datos de manera tipada
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(){

  }

  /**
   * Guardar un valor en localStorage
   * @param key Clave del item
   * @param value Valor a guardar (se realiza a JSON)
   */

  setItem<T>(key: string, value: T): void {
    try{
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    }
    catch (error){
      console.error('Error al guardar el localStorage', error)
    }
  }
/**
 * Obtiene un valor de localStorage
 * @paramm key
 * @returns El valor desearializado a null si no existe
 */

  getItem<T>(key: string): T | null {
    try{
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null
    } catch (error){
        console.error('Error al leer de LocalStorage: ', error)
        return null;
    }
  }
  /**
   * Elimina un item de LocalStorage
   * @param key Clave del item a eliminar
   */

  removeItem(key: string): void{
    localStorage.removeItem(key)
  }

  /**
   * Limpiar todo el localStorage
   */

  clear():void{
    localStorage.clear();
  }

  /**
   * Verificar si existe una clave en LocalStorage
   * @param key Clave a verificar
   * @returns true si existe, false si no
   */

  hasItem(key: string): boolean{
    return localStorage.getItem(key) !== null;
  }
}

 