import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { User } from 'src/app/demo/models/user';
import { ChatService } from './service/chat.service';
import { jwtDecode } from 'jwt-decode';
import { Messsage } from 'src/app/demo/models/messsage';
import { Message} from 'primeng/api';
import { Conversation } from 'src/app/demo/models/conversation';
import { ConversationService } from 'src/app/demo/service/conversation.service';
import { MessageService } from 'src/app/demo/service/message.service';

@Component({
    templateUrl: './chat.app.component.html'
})
export class ChatAppComponent implements AfterViewChecked,OnInit
// implements OnDestroy 
{

    // subscription: Subscription;

    // activeUser!: User;
    
    // constructor(private chatService: ChatService) { 
    //     this.subscription = this.chatService.activeUser$.subscribe(data => this.activeUser = data);
    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }

    activeIndex: number = 0; 
   
    token : any = localStorage.getItem('token');
    refrechToken  : any = localStorage.getItem('refrechToken');
    decodedToken : any = jwtDecode(this.token);
    username : any = this.decodedToken.sub;

    contenue : string = "";
    messages: { content: string, user: string, session: string }[] = [];
    messagesBot : { content: string, user: string }[] = [];
    messsages : Messsage[] = [];
    messsage : any  = {
        "content" : ""
    };
    messsageCreated : any = {
        "content" : "Hello"
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

    @ViewChild('chatWindow') chatWindow!: ElementRef;

    conversation : Conversation [] = [];

    initials : any;
    bgColor : any;

    sessionString : string = "";

    addBoolean : Boolean = true;
    chatBoolean : Boolean = false;

    usernameId : string = this.username + "1"; 

    scrollToBottom: boolean = true; 

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
        this.getConversationByUser();
        this.getMessagesByConversation();
        this.generateBackgroundColor();
    }
    
    ngAfterViewChecked(): void {
        if (this.scrollToBottom) {
            setTimeout(() => {
                if (this.chatWindow) {
                    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
                }
            });
            this.scrollToBottom = false; 
        }
      }

        
    generateBackgroundColor(): void {
        this.initials = "B"+"O"+"T"
        const colorCode = (this.initials.charCodeAt(0) + this.initials.charCodeAt(1)) % 360;
        this.bgColor = `hsl(${colorCode}, 70%, 50%)`;
        console.log(this.bgColor);
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
                    user : "Bot",
                    session : this.selectedSessionId
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

    createConversation(){

        const length = this.conversation.length + 1;
        this.sessionString = "session" + length;
        const usernameString = this.username + length;

        // console.log(this.sessionString);
        

        this.conversationService.getOrCreateConversation(this.messsageCreated,this.username,this.sessionString,usernameString).subscribe(
            response =>{
                
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messages.push({
                    content : this.contenue,
                    user : "Bot",
                    session : this.selectedSessionId
                    });
                console.log("la reponse est : ", this.contenue);
                // this.messsage.content = "";
                // console.log(this.messsage.content)

                console.log("274.");

                setTimeout(() => {
                    this.getConversationByUser();
                    console.log("274..");
                })
                
                setTimeout(() => {
                    this.activeIndex = this.conversation.length  ; // Sélectionner la dernière session
                    this.onTabChange(this.activeIndex - 1);
                    console.log("274...");
                });

                // setTimeout(() => {
                //     this.getMessagesByConversation();
                // })
            },
            error =>{
                console.log("l error est : ", error);
            }
        )
    }

    getMessagesByConversation(){
        const length = this.conversation.length + 1;
        console.log(length);
        // this.usernameId = this.username + "1";

        this.messageService.findByConversation(this.usernameId).subscribe(
        response => {
          this.messsages = response;
          console.log("la session depuis getMessagesByConversation est : ", this.selectedSessionId);
          console.log("La réponse de selected session est :", response);
        },
        error => {
          console.log("L'erreur est :", error);
          if (error == "la session n existe pas"){
            console.log("ok")
          }
        }
      );
    }


    sendMesssage() {
        if (this.messsage.content.trim()) {
          this.messages.push({
            content: this.messsage.content,
            user : this.username,
            session : this.selectedSessionId
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
                    user : "Bot",
                    session : this.selectedSessionId
                    });
                console.log("la reponse est : ", this.contenue);
                this.messsage.content = "";
                this.scrollToBottom = true; // Activation du défilement

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
            console.log("undefined 323");
            console.log(this.conversation);
            console.log(this.conversation[index]);
            console.log(this.activeIndex);
            this.addBoolean = true;
            this.chatBoolean = false;
        }else{
            this.selectedSessionId = this.conversation[index]?.sessionId;
            this.usernameId = this.conversation[index]?.usernameId;
            console.log("Selected session ID:", this.selectedSessionId);
            console.log("active indexe est ", this.activeIndex);
            this.getMessagesByConversation();
            this.addBoolean = false;
            this.chatBoolean = true;
        }

    }
}
