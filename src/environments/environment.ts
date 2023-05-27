// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
   dayArray:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
   emailPattern:'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
   emptyCoverPic:"assets/images/users/cover/cover-1.gif",
   emptyProfilePic:"assets/images/emptyProfile.png",
   noImageAvailable:"assets/images/users/cover/cover-1.gif",
   //noImageAvailable:"assets/images/noImage.png",
   allowedImageTypes : ['image/png', 'image/jpeg', 'image/jpg', 'image/gif',
   'image/svg','image/svgz','image/webp','image/ico','image/pjp','image/apng','image/tif','image/pjpej','image/afiv','image/tiff','image/jfif','image/bmp'],
    
   allowedVideoTypes : ['video/mp4','video/mp3','video/ogm','video/mwv','video/mpg','video/mkv','video/webm','video/ogv','video/mov','video/asx',
   'video/mpeg','video/m4v','video/avi','video/x-matroska'],
    maxFilePostSize:35 * 1024 * 1024,

   urlAuthentificationService:"http://localhost:8083/api/v1/auth",
   urlUpdateAuthentificationService2:"http://localhost:8083/api/v1/update",

   urlLogoutService:"http://localhost:8083/api/v1",
   urlUserServices:"http://localhost:8084/api2/v2/user-services",
   urlMediaServices:"http://localhost:8087/api5/v1/media-services",
  urlPostServices:"http://localhost:8088/api6/v1/post-services",
   urlFriendshipServices:"http://localhost:8085/api3/v1/friend-services",
   urlChatServices:"http://localhost:8086",
   urlPrivateChatServices:"http://localhost:8090",
   urlChatWebSocket:"ws://localhost:8086/publicChat",
  urlNotificationServices:"http://localhost:8089",

    firebaseConfig: {
    apiKey: "AIzaSyAlO-Ir62VxILJhPd3QcWqtjWi_egG3hhU",
    authDomain: "pfa4-5b047.firebaseapp.com",
    projectId: "pfa4-5b047",
    storageBucket: "pfa4-5b047.appspot.com",
    messagingSenderId: "1059924351732",
    appId: "1:1059924351732:web:1e91ce907a0fd376195ca1",
    measurementId: "G-GJYR94ZNLC"
  },

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
