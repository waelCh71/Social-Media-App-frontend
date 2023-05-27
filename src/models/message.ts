
export class ChatMessage{

    //typeMsg:string

     //Date sendDate;

     idReceiver:String;

      idSender:string;

      messageValue:string;

      constructor(idSender:string,messageValue:string,idReceiver:string){
        this.idSender=idSender
        this.messageValue=messageValue
        this.idReceiver=idReceiver
      }

}

