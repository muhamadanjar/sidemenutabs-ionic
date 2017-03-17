import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, ActionSheetController, Platform, Loading, LoadingController } from 'ionic-angular';
import { Geolocation, Camera, File, Transfer, FilePath } from 'ionic-native';
import {DataFasilitas} from "../../providers/fasilitas";
declare var cordova: any;
@Component({
  selector: 'page-poi',
  templateUrl: 'poi.html'
})
export class PoiPage {
  x:any;
  y:any;
  public data;
  results: Array<any>;

  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController,  
    public dtfasilitas:DataFasilitas
  ) {
    this.data = {};
    this.geolocate()
    
  }

  ionViewDidLoad() {
    
  }

  geolocate(){
    if(Geolocation){
      this.data.gpsinfo = "Mencari Lokasi....";
      Geolocation.getCurrentPosition().then((position) => {
        this.x = position.coords.longitude;
        this.y = position.coords.latitude;
        this.data.gpsinfo = "latitude :"+this.y+" longitude :"+this.x;
        
      }, (err) => {
        console.log(err);
      });
    }
  }

  submit(){
     this.presentToast();
     //this.geolocate();
     this.data.x = this.x;this.data.y = this.y;
     this.data.foto = this.lastImage;
     let data = JSON.stringify({
          
          nama:this.data.nama,
          nama_jalan:this.data.nama_jalan,
          fasilitas:this.data.fasilitas,
          x:this.data.x,
          y:this.data.y,
          foto:this.data.foto
          
     });
     this.dtfasilitas.InsertPostFasilitas(data).subscribe(data => {
          this.results = data;
          console.log(data);
          if(this.results[0].result =="success"){
            this.navCtrl.popToRoot();
          }

        }, error => {
            console.log("Oooops!");
        });
  }

  presentToast(text:string = 'Tunggu Sebentar') {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  //Upload Foto
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
	  // Create options for the Camera Dialog
	  var options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: false,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  Camera.getPicture(options).then((imagePath) => {
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
	      FilePath.resolveNativePath(imagePath)
	      .then(filePath => {
	          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	      });
	    } else {
	      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	  }, (err) => {
	    this.presentToast('Error while selecting image.');
	  });
	}

  private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}

  // Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
	  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.');
	  });
	}

  // Always get the accurate path to your apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return '';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

  public uploadImage() {
	  // Destination URL
	  var url = "http://192.168.20.8/php/upload.php";
	 
	  // File for Upload
	  var targetPath = this.pathForImage(this.lastImage);
	 
	  // File name only
	  var filename = this.lastImage;
	 
	  var options = {
	    fileKey: "file",
	    fileName: filename,
	    chunkedMode: false,
	    mimeType: "multipart/form-data",
	    params : {'fileName': filename}
	  };
	 
	  const fileTransfer = new Transfer();
	 
	  this.loading = this.loadingCtrl.create({
	    content: 'Uploading...',
	  });
	  this.loading.present();
	 
	  // Use the FileTransfer to upload the image
	  fileTransfer.upload(targetPath, url, options).then(data => {
	    this.loading.dismissAll()
	    this.presentToast('Image succesful uploaded.');
	  }, err => {
	    this.loading.dismissAll()
	    this.presentToast('Error while uploading file.');
	  });
	}

  

}
