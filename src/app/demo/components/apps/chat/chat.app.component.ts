import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { User } from 'src/app/demo/models/user';
import { ChatService } from './service/chat.service';
import { jwtDecode } from 'jwt-decode';
import { Messsage } from 'src/app/demo/models/messsage';
import { ConfirmationService, Message, MessageService} from 'primeng/api';
import { Conversation } from 'src/app/demo/models/conversation';
import { ConversationService } from 'src/app/demo/service/conversation.service';
import { MesssageService } from 'src/app/demo/service/messsage.service';
import { UserService } from 'src/app/demo/service/user.service';
import { RoleServiceService } from 'src/app/demo/service/role-service.service';
import { ScrollPanel } from 'primeng/scrollpanel';
import { ProblemService } from 'src/app/demo/service/problem.service';
import { EventIdRequest } from 'src/app/demo/models/event-id-request';
import { ScrollTop } from 'primeng/scrolltop';


@Component({
    templateUrl: './chat.app.component.html',
    providers:[ConfirmationService,
		MessageService,
	]
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

    connectionError: string = ''; 
    isLoading: boolean = false;

    activeIndex: number = 0; 
   
    token : any = localStorage.getItem('token');
    refrechToken  : any = localStorage.getItem('refrechToken');
    decodedToken : any = jwtDecode(this.token);
    username : any = this.decodedToken.sub;

    contenue : string = "";
    messages: { content: string, user: string, session: string, timestamp: Date }[] = [];
    messagesBot : { content: string, user: string }[] = [];
    messsages : Messsage[] = [];
    messsage : any  = {
        "content" : ""
    };

    messsageSeverity : any []=[
        {"test" : ""}
    ] 

    messsageBot : Messsage = {
        "id" : 0,
        "content" : "",
        "timestamp" : new Date(),
        "contenuMessageTest": "",
        "contenuAffichage": true,
        "severityCounts":{
            "notClassified": 0,
            "information": 0,
            "warning": 0,
            "average": 0,
            "high": 0,
            "disaster": 0
        },
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

    selectedSessionId : string = "session1";

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

    messageType: string = "event" ;
    contenuTest : string = "";

    selectedValue :  { label: string; value: string }  = {
        label : "",
        value : ""
    };
    options = [
        { label: 'Get problem by event id', value: "event" },
        { label: 'Get problem by host id', value: "host" },
        { label: 'Get problem by host name', value: "host-name"},
        { label: 'Get porblem by group id name', value: "group-name"},
        { label: 'Find a solution to the problem', value: "GPT"},
        { label: 'Get the number of monitored machines', value: "number-host"}
    ];

    contenuMessageTest : string = "";
    contenuAffichage : boolean = true;

    statuses: any[] = [];


    constructor(

        private problemService: ProblemService,

        private chatService: ChatService,
        private conversationService: ConversationService,
        private messageService : MesssageService,
        private messsageService : MessageService
    ) { }

    // setMessage() {
    //     if (this.user) {
    //         let filteredMessages = this.user.messages.filter(m => m.ownerId !== this.defaultUserId);
    //         this.message = filteredMessages[filteredMessages.length - 1];
    //     }
    // }

    ngOnInit(): void {
        this.scrollToBottom = true;
        this.getConversationByUser();
        this.getMessagesByConversation();
        this.generateBackgroundColor();
        this.statuses = [
            { label: 'unqualified', value: '5'},
            { label: 'qualified', value: '4' },
            { label: 'new', value: '3'},
            { label: 'negotiation', value: '2'},
            { label: 'renewal', value: '1' },
            { label: 'proposal', value: '0' }
        ];
        // this.getProblem();
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

      public formatDate(dateArray: any) {
        // Crée un nouvel objet Date avec les valeurs extraites
        const date = new Date();
        date.setFullYear(dateArray[0]);  // Année
        date.setMonth(dateArray[1] - 1); // Mois (notez la conversion -1)
        date.setDate(dateArray[2]);      // Jour

        date.setHours(dateArray[3] || 0);    // Heure (par défaut 0 si non fourni)
        date.setMinutes(dateArray[4] || 0); // Minute (par défaut 0 si non fourni)
        date.setSeconds(dateArray[5] || 0); // Seconde (par défaut 0 si non fourni)
    
        return date;
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
        this.isLoading = true;
        this.conversationService.getOrCreateConversation(this.messsage,this.username,this.selectedSessionId,this.usernameId,this.messageType).subscribe(
            response =>{
                this.isLoading = false;
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messages.push({
                    content : this.contenue,
                    user : "Bot",
                    session : this.selectedSessionId,
                    timestamp : new Date()
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

        this.conversationService.createConversation(this.username,this.sessionString,usernameString).subscribe(
            response =>{
                this.selectedSessionId = this.sessionString;
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messages.push({
                    content : this.contenue,
                    user : "Bot",
                    session : this.selectedSessionId,
                    timestamp : new Date()
                    });
                console.log("la reponse est : ", this.contenue);

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

            },
            error =>{
                console.log("l error est : ", error);
            }
        )
    }

    parseMessageProblem(content: string): { transformedContent: string; severityCounts: any} {
        const {problems, severityCounts } = this.parseProblem(content);
        if (content.startsWith('[')) {
          const {problems, severityCounts } = this.parseProblem(content);
          return {transformedContent: problems
            .map(
              (problem) =>
                `<p><strong>Severity:</strong> ${problem.severity} <br><strong>Name:</strong> ${problem.name}</p>`
            )
            .join(''), severityCounts: severityCounts}
        }
        return {transformedContent: content, severityCounts: severityCounts};
      }
      

    getMessagesByConversation(){
        const length = this.conversation.length + 1;
        console.log(length);
        // this.usernameId = this.username + "1";

        this.messageService.findByConversation(this.usernameId).subscribe(
        response => {

            this.messsages = response;
            this.messsages.forEach(message => {

            message.users.forEach(
                user => {
                    if(user.username == "Bot"){
                        if(message.content.startsWith("[")){
                                this.contenuAffichage = false;
                                const parsedMessage = this.parseMessageProblem(message.content);
                                // const problems = JSON.parse(parsedMessage);

                                console.log("les message qui debute par un [", message.content);
                                message.contenuMessageTest = parsedMessage.transformedContent;
                                message.severityCounts = parsedMessage.severityCounts;
                                console.log(parsedMessage.severityCounts);
                                message.contenuAffichage = false;
                                console.log("les message qui debute par un [ sont parser", message.contenuMessageTest);

                                 // Compter les problèmes par sévérité

                                // console.log("average", this.average);
                                // problems.forEach((element:any) => {
                                //     console.log (element.severity) 
                                // });

                                
                                
                            }else{
                                message.contenuAffichage = true;
                            }                     
                            console.log("contenuAffichage : ", this.contenuAffichage)
                        }
                }
            )

            if (Array.isArray(message.timestamp)) {
                message.timestamp = this.formatDate(message.timestamp);
            }
          })
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

    show() {
		this.messsageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Connection Error',   // Titre du message
		  detail: this.connectionError,  // Détail du message
		  life: 3000            // Durée de vie du toast en millisecondes (3 secondes ici)
		});
	  }


    sendMesssage() {

        if(this.selectedValue.value == "number-host"){
            this.messsage.content = "give me the number of monitored machines";
        }

        if (this.messsage.content.trim()) {
          this.isLoading = true;
          this.scrollToBottom = true;

          this.messages.push({
            content: this.messsage.content,
            user : this.username,
            session : this.selectedSessionId,
            timestamp : new Date()
          });

          console.log("les messages sont ", this.messages)

          console.log("359 selectedSessionId", this.selectedSessionId )
          console.log("value : ", this.selectedValue?.value);


          this.conversationService.getOrCreateConversation(this.messsage,this.username,this.selectedSessionId,this.usernameId,this.selectedValue.value).subscribe(
            response =>{
                this.isLoading = false;
                this.messsageBot = response;
                this.contenue = this.messsageBot.content;
                this.messsageBot.timestamp = this.formatDate(this.messsageBot.timestamp);

                if(this.contenue == "[]"){
                    if(this.selectedValue.value == "event"){
                        this.messages.pop();
                        this.messsageService.add({
                            severity: 'info',
                            summary: 'Information',
                            detail: 'il n y a pas de problem avec cet event id', 
                            life: 3000
                        })
                    }else if(this.selectedValue.value == "group-name"){
                        this.messages.pop();
                        this.messsageService.add({
                            severity: 'info',
                            summary: 'Information',
                            detail: 'il n y a pas de problem avec ce group id', 
                            life: 3000
                        })
                    }else if(this.selectedValue.value == "host-name"){
                        this.messages.pop();
                        this.messsageService.add({
                            severity: 'info',
                            summary: 'Information',
                            detail: 'il n y a pas de problem avec ce host name', 
                            life: 3000
                        })
                    }
                }else{
                const parsedMessage = this.parseMessageProblem(this.contenue);
                this.contenuTest = parsedMessage.transformedContent;

                console.log("contenuTest : ", this.contenuTest);

                this.messages.push({
                    content : this.contenuTest,
                    user : "Bot",
                    session : this.selectedSessionId,
                    timestamp : this.messsageBot.timestamp

                    });
                console.log("la reponse est : ", this.contenue);
                this.messsage.content = "";
                this.scrollToBottom = true; // Activation du défilement
                }

                // console.log(this.messsage.content)
            },
            error =>{
                this.messages.pop();
                if(error.message == "Erreur de connexion : Veuillez vérifier votre connexion Internet."){
                    this.isLoading = false;
                    this.connectionError = "Please check your Internet connection."
                    this.show();
                }
                if(error.message == "Erreur lors de l'envoi de la requête"){
                    this.isLoading = false;
                    this.connectionError = "Zabbix is down."
                    this.show();
                }
                console.log("l error est : ", error.message);
            }
        )
            
        }
      }

      notClassified: number = 0;
      information: number = 0;
      warning: number = 0;
      average: number = 0;
      high: number = 0;
      disaster: number = 0;

      parseProblem(problemString: string): {
        problems: { severity: string; name: string }[];
        severityCounts: {
          notClassified: number;
          information: number;
          warning: number;
          average: number;
          high: number;
          disaster: number;
        };
      } {
       // Définir une expression régulière pour extraire severity et name
        const regex = /severity=(\d+),\s*name=([^,]+)/g;
        const matches = [];
        let match;

        const severityCounts = {
            notClassified: 0,
            information: 0,
            warning: 0,
            average: 0,
            high: 0,
            disaster: 0,
          };

        // Itérer sur toutes les correspondances
        while ((match = regex.exec(problemString)) !== null) {

            if(match[1] == "0"){
                match[1] = "not classified";
                severityCounts.notClassified++;

            }else if(match[1] == "1"){
                match[1] = "information";
                severityCounts.information++;

            }else if(match[1] == "2"){
                match[1] = "warning";
                severityCounts.warning++;

            }else if(match[1] == "3"){
                match[1] = "average";
                severityCounts.average++;


            }else if(match[1] == "4"){
                match[1] = "high";
                severityCounts.high++;


            }else if(match[1] == "5"){
                match[1] = "disaster";
                this.disaster++;
                severityCounts.disaster++;
            }

             matches.push({
            severity: match[1],
            name: match[2],
            });
        }

        return {
            problems: matches,
            severityCounts: severityCounts,
          };
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

    parseMessage(content: string): string {
        if (!content) return '';
    
        return content
          .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Titres en h3
          .replace(/- (.*?)\n/g, '<li>$1</li>')   // Listes
          .replace(/```bash([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // Blocs de code
          .replace(/\n/g, '<br>');               // Sauts de ligne
    }
}
