import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';

import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import {AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
devices: any[] = [];


  constructor(private ble: BLE,
              private ngZone: NgZone,
              private bluetoothSerial: BluetoothSerial) {}

Scan(){
  console.log("he llegado aquí");
  this.devices = [];
  this.bluetoothSerial.list().then(
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
