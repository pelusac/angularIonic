# angularIonic
Develop app Android

##Integraciones 

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


  

 
