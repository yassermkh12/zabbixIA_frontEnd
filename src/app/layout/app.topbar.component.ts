import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserService } from '../demo/service/user.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { RecuperationSecurityService } from '../demo/service/recuperation-security.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { User } from '../demo/models/user';
import { RecuperationService } from '../demo/service/recuperation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConversationService } from '../demo/service/conversation.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [
        MessageService,
        ConfirmationService
    ]
})
export class AppTopbarComponent implements OnInit{

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    searchActive: boolean = false;

    visibleEmail: boolean = false;
    visibleVerify: boolean = false;
    visiblePassword: boolean = false;
    visibleProfile: boolean = false;
    visibleUpdateProfile: boolean = false;

    user: User = {
        "id": 1,
        "name": "",
        "image": "",
        "status": "",
        "messages": [
            {
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "ownerId": 1,
                "createdAt": 1652646338240
            },
            {
                "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                "ownerId": 1,
                "createdAt": 1652646368718
            },
            {
                "text": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                "ownerId": 123,
                "createdAt": 1652646368718
            },
        ],
        "lastSeen": "2d",

        "verificationCode": 0,
        "verificationCodeExpiration": "",
        "email": "",
        "username": "",
        "password": "",
        "roles": [{
            "id":1,
            "name":""
        },
        ],
        "firstName": "",
        "lastName": "",
    };


    previousUserState:any;
    email: string = '';
    code: number = 0;
    password: string = '';

    validPassword: string = '';
    errorPassword: string = '';
    forgotPasswordError: string = '';
    verifyCodeError: string = '';
    profileError: string = ''; 

    formSubmittedEmail: boolean = false;
	formSubmittedVerifyCode: boolean = false;
	formSubmittedPassword: boolean = false;
    formSubmittedProfile: boolean = false;
 
    // token = '';
    // refrechToken = '';
    token : any = localStorage.getItem('token');
    refrechToken  : any = localStorage.getItem('refrechToken');
    decodedToken : any;
    username : any;

    initials: string = '';
    bgColor: string = '';

    constructor(
        public layoutService: LayoutService,
        public el: ElementRef,
        private router: Router,
        private userService: UserService,
        private recuperationService: RecuperationSecurityService,
        private recuperationService1: RecuperationService,
        private messageService: MessageService,
        private formBuilder : FormBuilder,
        private confirmationService : ConfirmationService,
        private conversationService: ConversationService
    ) { }
    

    ngOnInit(): void {
        this.getUserByEmail();
        this.verifyToken();
        // this.generateInitials();
        // this.generateBackgroundColor();
        // this.ngOnInit1();
    }

    
    generateInitials(): void {
        const firstInitial = this.user.firstName ? this.user.firstName.charAt(0).toUpperCase() : '';
        const lastInitial = this.user.lastName ? this.user.lastName.charAt(0).toUpperCase() : '';
        this.initials = firstInitial + lastInitial;
        // this.initials = "Y"+"M"
        console.log(firstInitial);
    }
        
    generateBackgroundColor(): void {
        const colorCode = (this.initials.charCodeAt(0) + this.initials.charCodeAt(1)) % 360;
        this.bgColor = `hsl(${colorCode}, 70%, 50%)`;
        console.log(this.bgColor);
    }

    verifyToken() {
        if(this.token == null || this.refrechToken == null){
            this.router.navigate(["/auth/login"]);
        }
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
    
    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }

     // Fonction pour afficher le dialogue
    showDialogEmail() {
        this.visibleEmail = true;
    }

    // Fonction pour gérer l'annulation
    cancelEmail() {
        this.visibleEmail = false;
    }

    // Fonction pour gérer la sauvegarde des données
    saveEmail() {
        console.log('save email');
        // Ajouter ici la logique pour sauvegarder les données, comme un appel à une API
        this.visibleEmail = false;
        this.showDialogVerify();
    }

    showDialogVerify() {
        this.visibleVerify = true;
    }

    cancelVerify() {
        this.visibleVerify = false;
        this.showDialogEmail();
    }

    saveVerify() {
        console.log('save verify');
        this.visibleVerify = false;
        this.showDialogPassword();
    }

    showDialogPassword() {
        this.visiblePassword = true;
    }

    cancelPassword() {
        this.visiblePassword = false;
        this.showDialogEmail();
    }

    savePassword() {
        console.log('save password');
        this.visiblePassword = false;
    }

    showDialogUpdateProfile() {
        this.visibleUpdateProfile = true;
        this.cancelProfile();
        this.previousUserState = { ...this.user };
    }

    cancelUpdateProfile() {
        this.visibleUpdateProfile = false;
        this.showDialogProfile();
    }

    saveUpdateProfile() {
        console.log('save update profile');
        this.visibleUpdateProfile = false;
    }

    getUserByEmail(){
        this.decodedToken = jwtDecode(this.token);
        this.username = this.decodedToken.sub;
        console.log(this.username)
        this.userService.findUserByUsername(this.username).subscribe(
            response => {
                this.user = response;
                console.log(response);
                this.email = this.user.email;
                this.generateInitials();
                this.generateBackgroundColor();
          }
        )
      }

    showDialogProfile() {
        this.visibleProfile = true;
    }
    cancelProfile() {
        this.visibleProfile = false;
    }

    saveProfile() {
        console.log('save profile');
        this.visibleProfile = false;
    }
    
    showForgotPassword() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.forgotPasswordError,  
		  life: 3000            
		});
	  }

      showVerifyCode() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.verifyCodeError, 
		  life: 3000            
		});
	  }

      showNewPassword() {
		this.messageService.add({
		  severity: 'success',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Success',   
		  detail: this.validPassword,  
		  life: 3000            
		});
	  }

      forgotPassword(email:string) {
        console.log(email);
        console.log(this.username)
        this.formSubmittedEmail = true;
          this.recuperationService.forgotPassword(email).subscribe(
            response => {
              console.log(response);
              this.visibleEmail = false;
              this.saveEmail()
                },
            error => {
              console.log(this.email)
              console.error(error.message);
              if (error.message == "il n y a pas de user avec cet email"){
                this.forgotPasswordError = "There is no user with this email."
            }
            this.showForgotPassword()
            }
          )
        
      }

    verifyCode(form:NgForm){
        this.formSubmittedVerifyCode = true;
        var code = form.value.code
        console.log(code);
        console.log(this.email);

        this.recuperationService.verifyCode(this.email, code).subscribe(
            response => {
                console.log("code est envoyer");
                this.saveVerify();  
            },
            error => {
                console.log(error.message);
                if (error.message == "le code est invalid"){
                    this.verifyCodeError = "The code is invalid.";
                }
                this.showVerifyCode();
            }
        )
    }


    resetPassword(password:string) {
        this.formSubmittedPassword = true;
            console.log(password);
            console.log(this.email)
            this.recuperationService.resetPassword(this.email, password).subscribe(
              response => {
                console.log("password est envoyer");
                this.validPassword = "Your password has been sent.";
                this.showNewPassword();
                this.savePassword();
            },
            error => {
                console.error(error.message);
                this.errorPassword = error.message;
            }
        )
    }

    updateProfile(){
            this.formSubmittedProfile = true;
        
            this.userService.updateUser(this.user.id,this.user).subscribe(
            (authResponse) => {
                console.log("update commence");
                
                this.token = authResponse.token
                localStorage.setItem('token', this.token);
                this.refrechToken = authResponse.refrechToken;
                localStorage.setItem('refrechToken', this.refrechToken);
                console.log("token : ", this.token);
                console.log("refrech token : ", this.refrechToken);
    
                const decodedToken = jwtDecode(this.token);
                console.log("decode token : ", decodedToken)
                const username = decodedToken.sub
                console.log("username : ", username)
                const time : number | undefined  = decodedToken.exp
                console.log("date d expiration : ", time)                
                
                console.log(authResponse);

                this.showUpdateProfileValid();
                this.cancelUpdateProfile();
                }, 
            error =>{
                this.user = this.previousUserState;
                console.log(error.message);
                if(error.message == "l email est deja utilise"){
                    this.profileError = "The email is already in use.";
                }else if(error.message == "le username est deja utilise"){
                    this.profileError = "The username is already taken. ";
                }else{
                    this.profileError = "Please verify your username or email."
                }
                this.showUpdateProfileNoValid(); 
            }
                
    );

    }

    showUpdateProfileValid() {
		this.messageService.add({
		  severity: 'success',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Success',   
		  detail: "Your profile has been updated.",  
		  life: 3000            
		});
	  }
      
      showUpdateProfileNoValid() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.profileError,  
		  life: 3000            
		});
	  }

	confirmUpdateProfile() {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => this.updateProfile(),
			// reject: () => rejectFunc()
		})
	}
        

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('refrechToken');
        console.log("oui")
        this.router.navigate(["/auth/login"]);
      }
    }
