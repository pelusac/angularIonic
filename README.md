# angularIonic
Develop app Android

## Integraciones 

1. Crear componente.

  Primero creamos un módulo siempre debemos estar en el directorio del proyecto:
    ```ionic generate module component```
  Esto genera una carpeta llamada components y dentro un fichero llamado ```component.module.ts``` con este contenido:
  
  ```
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';



  @NgModule({
    declarations: [],
    imports: [
      CommonModule
    ]
  })
  export class ComponentsModule { }
  ```
  Ya podemos crear el componente. Volvemos a ionic cli y escribimos ```ionic generate component/test```. Esto genera una carpeta llamada test dentro component con nuestro componente.
  
  Dentro de test se haabrán generado tre ficheros con extensiones .html, .scss, .ts si abrimos el fichero ```test.component.html``` veremos:
  ```
  <p>
  test works!
  </p

  ```
  Y en ```test.component.ts```:
  ```
  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
  })
  export class TestComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

  }
```
Ya podemos importar ```TestComponet``` en el módulo ```component.module.ts``` lo declaramos en la sección ```declarations```y en la sección ```exports```:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule
  ],
  exports: [TestComponent]
})
export class ComponentModule { }
```
A partir de ahora, se puede utilizar el componente en cualquier página. Solo tendremos que  importar ```ComponentModule```en el módulo de nuestra página y declararlo en los ```imports```. Ejemplo, editamos el ficher ```home.module.ts```:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentModule } from '../component/component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentModule
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
```
Mostrar el componente es tan sencillo como editar el archivo ```home.page.html``` y añadir el selector del componente del fichero ```test.component.ts``` que es ``` @Component({
    selector: 'app-test',```
 Quedando así el .html:
```
 <ion-header>
 <ion-toolbar>
   <ion-title>
     Ionic Blank
   </ion-title>
 </ion-toolbar>
</ion-header>
 
<ion-content>
 <div class="ion-padding">
   <app-saluda></app-saluda>
 </div>
</ion-content>
```
A nuestro componente le podemos añadir también atributos personalizados.
Por ejemplo podemos pasarle un atributo nombre de esta manera:

```
<ion-header>
 <ion-toolbar>
   <ion-title>
     Ionic Blank
   </ion-title>
 </ion-toolbar>
</ion-header>
 
<ion-content>
 <div class="ion-padding">
   <app-saluda nombre="Eduardo"></app-saluda>
 </div>
</ion-content>
```
Luego en el controlador de nuestro componente ```test.component.ts``` definimos el parámetro de entrada con el decorador ```Input``` de la siguiente manera:
Ahora podemos hacer que en lugar de mostrar en pantalla “saluda works!” salude a la persona que recibamos en el parámetro nombre, para ello vamos a crear una variable que llamaremos text y a la que en el constructor le daremos el valor ‘¡Hola’ concatenando el nombre que recibe como input:
```
import { Component, OnInit, Input } from '@angular/core';
 
@Component({
 selector: 'app-test',
 templateUrl: './test.component.html',
 styleUrls: ['./test.component.scss'],
})
export class SaludaComponent implements OnInit {
 
 @Input() nombre: string;
 text: string;
 
 constructor() {
 }
 
 ngOnInit() {
 this.text = '¡Hola ' + this.nombre + '!';
 }
 
}
```
En plantilla ```test.component.html``` vamos a hacer que se muestre el contenido de la variable text:
```
<p>
{{ text }}
</p>
```
  

 
