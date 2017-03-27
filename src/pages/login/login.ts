import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController,AlertController, LoadingController,Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Auth,User } from '../../providers/auth';
import { ConnectivityService } from '../../providers/connectivity-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class LoginPage {
  loading: Loading;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  currentUser: User;
  username: string;
  password: string;
  loading_show: any;
 
  constructor(
    public navCtrl: NavController, 
    public authService: Auth,  public conn: ConnectivityService,
    public storage: Storage,
    private alertCtrl: AlertController, private loadingCtrl: LoadingController
    
  ) {
    conn.setUrl('http://192.168.20.8/api');
    console.log(conn.rootUrl);
    
  }
  /*
  ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            //this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
  }
  login(){
    this.showLoader();
    let credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).then((result) => {
        this.loading_show.dismiss();
            console.log(result);
            //this.navCtrl.setRoot(HomePage);
    }, (err) => {
            this.loading_show.dismiss();
            console.log(err);
    });
  }
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
 
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  */

  ionViewDidLoad() {
 
        this.showLoader();
        this.authService.sget(this.conn.rootUrl+'/checklogin').subscribe(data => {
            console.log(data);
            if(data.status){
               console.log("Already authorized");
               this.loading.dismiss();
               this.navCtrl.setRoot(HomePage);
            }
            console.log("Not already authorized");
            this.loading.dismiss();
        });
        //Check if already authenticated
        /*this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized",);
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized",err);
            this.loading.dismiss();
        });*/
 
    }

    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

    showError(text) {
      setTimeout(() => {
        this.loading.dismiss();
      });
  
      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present(prompt);
    }

    login(){
 
        this.showLoader();
 
        let credentials = {
            username: this.username,
            password: this.password
        };

        /*this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            //console.log(result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
            this.navCtrl.setRoot(LoginPage);
        });*/

        
        /*this.authService.login(credentials).subscribe(allowed => {
          if (allowed) {
            setTimeout(() => {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage)
            });
          } else {
            this.showError("Access Denied");
          }
        },
        error => {
          this.showError(error);
        });*/

        this.authService.login_baru(credentials).subscribe(data => {
            console.log(data);
            if(data.status){
              this.currentUser = new User(data.data.name, data.data.email);
              this.storage.set('currentUser', this.currentUser);
              this.authService.settoken(data.token);
              this.navCtrl.setRoot(HomePage);
            }
            this.loading.dismiss();
        }, error => {
          console.log("Oooops!");
          this.showError(error);
        });
 
    }
 
}