import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from 'src/app/demo/models/message';
import { User } from 'src/app/demo/models/user';
import { ChatService } from '../service/chat.service';
import { ConversationService } from 'src/app/demo/service/conversation.service';
import { er, P } from '@fullcalendar/core/internal-common';
import { Conversation } from 'src/app/demo/models/conversation';
import { jwtDecode } from 'jwt-decode';
import { Messsage } from 'src/app/demo/models/messsage';
import { MessageService } from 'src/app/demo/service/message.service';
import { switchMap, timer } from 'rxjs';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {

    activeIndex: number = 0; // Définit l'onglet actif par défaut
   
    token : any = localStorage.getItem('token');
    refrechToken  : any = localStorage.getItem('refrechToken');
    decodedToken : any = jwtDecode(this.token);
    username : any = this.decodedToken.sub;

    contenue : string = "";
    messages: { content: string, user: string }[] = [];
    messagesBot : { content: string, user: string }[] = [];
    messsages : Messsage[] = [];
    messsage : any  = {
        "content" : ""
    };
    messsageBot : Messsage = {
        "id" : 0,
        "content" : "",
        "timestamp" : "",
        "conversation":{
            "id":0,
            "usernameId":"",
            "sessionId":"",
            "users":[{
                "id": 1,
                "name": "",
                "image": "",
                "status": "",
                "messages": [
                    {
                        "text": "",
                        "ownerId": 1,
                        "createdAt": 1652646338240
                    }
                ],
                "lastSeen": "",
                
                "verificationCode": 0,
                "verificationCodeExpiration": "",
                "email": "",
                "username": "",
                "password": "",
                "roles": [{
                    "id":1,
                    "name":""
                }],
                "firstName": "",
                "lastName": "",
            }]
        },
        "users" : [{
            "id": 1,
                "name": "",
                "image": "",
                "status": "",
                "messages": [
                    {
                        "text": "",
                        "ownerId": 1,
                        "createdAt": 1652646338240
                    }
                ],
                "lastSeen": "",
                
                "verificationCode": 0,
                "verificationCodeExpiration": "",
                "email": "",
                "username": "",
                "password": "",
                "roles": [{
                    "id":1,
                    "name":""
                }],
                "firstName": "",
                "lastName": "",
        }]
    };

    selectedSessionId : string = "";

    defaultUserId: number = 123;

    message!: Message;

    textContent: string = '';

    uploadedFiles: any[] = [];

    emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
        '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
        '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
    ];

    @Input() user!: User;


    conversation : Conversation [] = [];
    usernameId : string = ""; 

    constructor(
        private chatService: ChatService,
        private conversationService: ConversationService,
        private messageService : MessageService
    ) { }

    // setMessage() {
    //     if (this.user) {
    //         let filteredMessages = this.user.messages.filter(m => m.ownerId !== this.defaultUserId);
    //         this.message = filteredMessages[filteredMessages.length - 1];
    //     }
    // }

    ngOnInit(): void {
        this.getMessagesByConversation();
        this.getConversationByUser();

        this.conversationService.findByUsername("Admin").subscribe(
            response =>{
                this.conversation = response;
                console.log("la reponse conversation est : ", this.conversation);
            },
            error => {
                console.log("l erreur conversation est : ", error);
            }
        )
    }

    sendMessage() {
        if (this.textContent == '' || this.textContent === ' ') {
            return;
        }
        else {
            let message = {
                text: this.textContent,
                ownerId: 123,
                createdAt: new Date().getTime(),
            }

            this.chatService.sendMessage(message)
            this.textContent = '';
        }
    }

    onEmojiSelect(emoji: string) {
        this.textContent += emoji;
    }

    parseDate(timestamp: number) {
        return new Date(timestamp).toTimeString().split(':').slice(0, 2).join(':');
    }

    getConversationByUser(){
        this.conversationService.findByUsername(this.username).subscribe(
            response =>{
                this.conversation = response;
                console.log("la reponse conversation est : ", this.conversation);
            },
            error => {
                console.log("l erreur conversation est : ", error);
            }
        )
    }

    getConversationBySession(){
        this.conversationService.findBySession("1").subscribe(
            response =>{
                console.log("la reponse est : ", response);
            },
            error => {
                console.log("l erreur est : ", error);
            }
        )
    }

    getOrCreateConversation(){
        this.conversationService.getOrCreateConversation(this.messsage,this.username,this.selectedSessionId,this.usernameId).subscribe(
            response =>{
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messages.push({
                    content : this.contenue,
                    user : "Bot"
                    });
                console.log("la reponse est : ", this.contenue);
                // this.messsage.content = "";
                // console.log(this.messsage.content)
            },
            error =>{
                console.log("l error est : ", error);
            }
        )
    }

    getMessagesByConversation(){
        timer(0, 1500000).pipe(
        switchMap(() => this.messageService.findByConversation("sessionId")) // Appelle périodiquement la fonction
      )
      .subscribe(
        response => {
          this.messsages = response;
          console.log("La réponse est :", response);
        },
        error => {
          console.log("L'erreur est :", error);
        }
      );
    }


    sendMesssage() {
        if (this.messsage.content.trim()) {
          this.messages.push({
            content: this.messsage.content,
            user : this.username
          });

            // this.messages.push({ 
            //     content: "Bonsoir",
            //     user : "Bot"
            // });
          

          console.log("les messages sont ", this.messages)
    
        //   this.getOrCreateConversation();

        // setTimeout(() => {
        //     this.getOrCreateConversation();
        //     console.log("Étape 3 - Conversation récupérée ou créée");
        //   }, 5000); 

        this.conversationService.getOrCreateConversation(this.messsage,this.username,this.selectedSessionId,this.usernameId).subscribe(
            response =>{
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messages.push({
                    content : this.contenue,
                    user : "Bot"
                    });
                console.log("la reponse est : ", this.contenue);
                // this.messsage.content = "";
                // console.log(this.messsage.content)
            },
            error =>{
                console.log("l error est : ", error);
            }
        )
            
        //   this.messsage.content = '';
        }
      }

    onTabChange(index: number) {
        if(this.conversation[index]?.sessionId == undefined){

        }else{
            this.selectedSessionId = this.conversation[index]?.sessionId;
            console.log("Selected session ID:", this.selectedSessionId);
            console.log("active indexe est ", this.activeIndex);
        }

    }
}
