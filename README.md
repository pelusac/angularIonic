# angularIonic
Develop app Android

## Integraciones 

1. Crear componente.

  Primero creamos un módulo siempre debemos estar en el directorio del proyecto:
    ```ionic generate module component```
  Esto genera una carpeta llamada components y dentro un fichero llamado ```component.module.ts``` con este contenido:
  
  ```typescript
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
  ```typescript
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

```typescript
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

```typescript
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
```typescript
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
  
2. Usar Bluetooth.

En  cli instalar todas  las librerías para poder usar los módulos que sean necesarios y agregarlos al proyecto:

```
npm install @awesome-cordova-plugins/bluetooth-le
npm install cordova-plugin-bluetoothle
npm install @awesome-cordova-plugins/bluetooth-serial
npm install cordova-plugin-bluetooth-serial
npm install cordova-plugin-ble-central
npm install --save @ionic-native/ble
npm install @awesome-cordova-plugins/ble
ionic cap sync
ionic cordova plugin add cordova-plugin-ble-central
```
Breve ejemplo de escaneo de dispositivos en el fichero ```home.page.ts```:
```typescript
import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
devices: any[] = [];
  constructor(private ble: BLE,
              private ngZone: NgZone) {}

Scan(){
  console.log("he llegado aquí");
  this.devices = [];
  this.ble.scan([],15).subscribe(
    device => this.onDeviceDiscovered(device)
  );
}

onDeviceDiscovered(device){
  console.log('Discovered' + JSON.stringify(device,null,2));
  this.ngZone.run(()=>{
    this.devices.push(device)
    console.log(device)
  })
}

}
```
Debemos también modificar el fichero ```app.module.ts``` para poder usar el módulo ```BLE```desde cualquier página:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BLE } from '@ionic-native/ble/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [BLE,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Vídeo ejemplo:

https://www.youtube.com/watch?v=ZZOauPBUhSs

3. Debug en dispositivo físico.

Instalar Android Studio y Android API32 , Android 12.0.
 - Quedará instalado en ```C:\Users\ATC\AppData\Local\Android\Sdk``` donde ATC será el nombre de usuario del equipo.
 - En el móvil hay que activar el modo desarrollador y dar permisos de instalar mediante USB.
 - Además instalar adb-setup-1.4.3 en el sistema operativo.
 - Instalar jdk-11.0.14_windows-x64_bin. Debe ser esta versión.
 - Tras esto hay que integrar la variables de entorno en el SO.
  1. En variable de usuario```JAVA_HOME```  como nombre de variable. Como valor de la variable: ```C:\Program Files\Java\jdk-11.0.14```
  2. En variables del sistema lo mismo y además: 
        ```JAVA_HOME```  como nombre de variable. Como valor de la variable: ```C:\Program Files\Java\jdk-11.0.14```
        ```ANDROID_HOME```  como nombre de variable. Como valor de la variable:```C:\Users\ATC\AppData\Local\Android\Sdk```
        ```ANDROID_SDK_ROOT``` como nombre de variable. Como valor de la variable:```C:\Users\ATC\AppData\Local\Android\Sdk```
        Agregar al ```path``` para que quede:
        
        ![image](https://user-images.githubusercontent.com/16193873/160811865-0656c945-d148-4b5f-948f-7aead8e1e287.png)

  - Ejecutar: ```adb devices``` que listará los dispositivos físicos conectados. Así verificaremos que no hay problemas de acceso por parte del SO.
  - Ejecutar: ```ionic capacitor add android```Para generar estructura Android
  - Ejecutar: ```ionic capacitor copy android``` Para generar los ficheros necesarios de compilación del proyecto para Android
  - Ejecutar: ```ionic capacitor run```. En la primera opción seleccionar Android, en la segunda el dispositivo para conectarnos.
  - Por otro lado si todo va bien en el teléfono debemos de dar permisos para instalar APP externa tendremos un tiempo de segundos para aceptar la instalación.
  - Para mandarlo desde Android Studio ejecutar ```ionic cap open android``` Ahora ya podemos debugear nuestra app on line
  - Para el debugger desde chrome escribir en la barra de direcciones ```chrome://inspect/#devices```
  - Debugger con chrome diréctamente sin abrir android studio ```ionic cap run android --livereload --external```
      Si da problemas quitar las banderas ```ionic cap run android```
  - Debugger en navegador ```ionic serve --lab``` esto dará vista de smartphone
  - Debugger en navegador con vista estandar ```ionic serve```

