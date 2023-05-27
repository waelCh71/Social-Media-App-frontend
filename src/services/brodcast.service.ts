import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { each } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BrodcastService {

  constructor(private sanitizer: DomSanitizer) { }

  //My BrodCast
  private WNYC_AM="https://gemini.tunein.com/embed/player/s21605/"//IT New York

  //Tunisian BrodCast
  private mosaiqueFM="http://gemini.tunein.com/embed/player/s81889/";

  private ifm="https://gemini.tunein.com/embed/player/s154963/";

  private sabraFM="https://gemini.tunein.com/embed/player/s187621/";

  private diwanFM="https://gemini.tunein.com/embed/player/s286906/"

  private koonozFM="https://gemini.tunein.com/embed/player/s245260/"
  
  private shamsFM="https://gemini.tunein.com/embed/player/s129025/"

 

  //SPORT
  private hotMixRadioSport="http://gemini.tunein.com/embed/player/s130251/"//France

  private ESPNRadio="https://gemini.tunein.com/embed/player/s25876/"//WWE++ NEWYORK

  private talkSport="https://gemini.tunein.com/embed/player/s17077/"//UK


  //WorldWide TOP40 BrodCast

  private skyNewsArabia="https://gemini.tunein.com/embed/player/s181310/"//UAE
  

  private mfmRadio="https://gemini.tunein.com/embed/player/s198316/"//Moroco
  
  private radioSetif="https://gemini.tunein.com/embed/player/s149565/"//ALGERIA

  private radioHawaha="https://gemini.tunein.com/embed/player/s210036/"//Egypt

  private okRadio="https://gemini.tunein.com/embed/player/s54164/"
  
  private rmfFM="https://gemini.tunein.com/embed/player/s1217/"

  private abcLounge="https://gemini.tunein.com/embed/player/s127653/"

  private BBCRadio2="https://gemini.tunein.com/embed/player/s24940/"
  
  private todayFM="https://gemini.tunein.com/embed/player/s15099/"

  private radioMeuh="https://gemini.tunein.com/embed/player/s96629/"

  //TOP40
  private hundredhitz="https://gemini.tunein.com/embed/player/s111382/"//USA

  private alfa="https://gemini.tunein.com/embed/player/s2976/"//Mexico
  
  private cNintyFive="https://gemini.tunein.com/embed/player/s24777/"//Canda

  private theFOX="https://gemini.tunein.com/embed/player/s31121/"//USA
 
  
  public getMyBrodcast(): string[]{

    var myBrodcast=[this.WNYC_AM]
    return myBrodcast;
  }
  
  //TODO MyFavorite

  public getTunisianBrodCast():any{
    
    var tunBrodcast=[this.mosaiqueFM,this.ifm,this.sabraFM,this.diwanFM,this.koonozFM,this.shamsFM];
      var tunBrodcast2:any=[]
      tunBrodcast.forEach(b=>{
        tunBrodcast2.push(this.sanitizer.bypassSecurityTrustResourceUrl(b))
        
      });
      
    return tunBrodcast2;
  }
  
  public getSportBrodCast():any{
    var sportBrodCast=[this.hotMixRadioSport,this.ESPNRadio,this.talkSport];
    var sportBrodCast2:any=[]
    sportBrodCast.forEach(b=>{
      sportBrodCast2.push(this.sanitizer.bypassSecurityTrustResourceUrl(b))
    });
    return sportBrodCast2;
  }

  public getWorldWideBrodCast():any{
    var WorldWideBrodCast=[this.skyNewsArabia,this.mfmRadio,this.radioSetif,this.radioHawaha,this.okRadio,
      this.rmfFM,this.abcLounge,this.abcLounge,this.BBCRadio2,this.todayFM,this.radioMeuh,this.hundredhitz,
      this.alfa,this.cNintyFive,this.theFOX];

      var WorldWideBrodCast2:any=[];
      WorldWideBrodCast.forEach(b=>{
        WorldWideBrodCast2.push(this.sanitizer.bypassSecurityTrustResourceUrl(b))
      });
      return WorldWideBrodCast2;
   }
  
  
}
