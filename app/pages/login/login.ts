import { Component } from '@angular/core';
import { NavController, Alert, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { firebaseAuthConfig, FirebaseAuth } from 'angularfire2';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup } from '@angular/common';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    public loading: any;
    constructor(private navCtrl: NavController, private loadingController: LoadingController, private auth: FirebaseAuth, private toastController: ToastController) {
    }

    public registerUser(credentials){
        console.log(credentials);
        this.showLoading();
        this.auth.createUser(credentials).then((authData) => {
            this.hideLoading();
            let toast = this.toastController.create({
                message: 'User was added successfully',
                duration: 3000
            });
            toast.present();
        }).catch((err) =>{
            this.hideLoading();
            let toast = this.toastController.create({
                message: 'Failed to register!' + err,
                duration: 3000
            });
            toast.present();
        });
    }

    public login(credentials){
        this.showLoading();
        this.auth.login(credentials).then((authData) => {
            this.hideLoading();
            this.navCtrl.setRoot(HomePage);
        }).catch((err) =>{
            this.hideLoading();
            let toast = this.toastController.create({
                message: ''+err,
                duration: 3000
            });
            toast.present();
        });
    }
    showLoading(){
        this.loading = this.loadingController.create({
            content: "Please wait..."
        });
        this.loading.present();
    }
    hideLoading(){
        setTimeout(() => {
            this.loading.dismiss();
        });
    }
}
