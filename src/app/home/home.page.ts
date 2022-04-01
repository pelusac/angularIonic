import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';


import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import {AlertController, IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
devices: any[] = [];
unpairedDevices: any;
pairedDevices: any;
gettingDevices: boolean;
connected: boolean = false;

  constructor(private ble: BLE,
              private ngZone: NgZone,
              private bluetoothSerial: BluetoothSerial,
              private alertController: AlertController) {
                bluetoothSerial.enable();
              }

              
              startScanning() {
                this.pairedDevices = null;
                this.unpairedDevices = null;
                this.gettingDevices = true;
                const unPair = [];
                this.bluetoothSerial.discoverUnpaired().then((success) => {
                  success.forEach((value, key) => {
                    var exists = false;
                    //console.log("esto es success", value);
                    unPair.forEach((val2, i) => {
                      //console.log("esto es unPair", val2);
                      if (value.id === val2.id) {
                        exists = true;
                      }
                    });
                    if (exists === false && value.id !== '') {
                      unPair.push(value);
                    }
                  });
                  this.unpairedDevices = unPair;
                  this.gettingDevices = false;
                },
                  (err) => {
                    console.log(err);
                  });
              
                this.bluetoothSerial.list().then((success) => {
                  this.pairedDevices = success;
                },
                  (err) => {
              
                  });
                }
              
              success = (data) => {
                this.deviceConnected();
              }
              fail = (error) => {
                alert(error);
              }
              
              async selectDevice(id: any) {
              
                const alert = await this.alertController.create({
                  header: 'Connect',
                  message: 'Do you want to connect with?',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Connect',
                      handler: () => {
                        this.bluetoothSerial.connect(id).subscribe(this.success, this.fail);
                      }
                    }
                  ]
                });
                await alert.present();
              }
              
              deviceConnected() {
                
                this.bluetoothSerial.isConnected().then(success => {
                  alert('Connected Successfullly');
                  this.connected = true;
                  document.getElementById("devices").innerHTML = "";
                }, error => {
                  alert('error' + JSON.stringify(error));
                });
              }
              
              async disconnect() {
                const alert = await this.alertController.create({
                  header: 'Disconnect?',
                  message: 'Do you want to Disconnect?',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Disconnect',
                      handler: () => {
                        this.bluetoothSerial.disconnect();
                        this.connected = false;
                      }
                    }
                  ]
                });
                await alert.present();
              }
             }