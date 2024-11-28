import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationRequest } from 'src/app/demo/models/authentication-request';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ToastModule } from 'primeng/toast';

@Component({
	templateUrl: './login.component.html',
	providers:[ConfirmationService,
		MessageService
	]
})
export class LoginComponent {

	authenticationRequestForm: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required])
	  });

	token = '';
  	refrechToken = '';
	errorLogin : string = '';

	rememberMe: boolean = false;
	formSubmitted: boolean = false;

	constructor(
		public layoutService: LayoutService,
		private authenticationService : AuthenticationService,
		private router : Router,
		private confirmationService: ConfirmationService,
		private messageService : MessageService
	) {}

	show() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   // Titre du message
		  detail: this.errorLogin,  // Détail du message
		  life: 3000            // Durée de vie du toast en millisecondes (3 secondes ici)
		});
	  }

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

	login(){

		this.formSubmitted = true;

		if (this.authenticationRequestForm.valid) {
			const authenticationRequest: AuthenticationRequest = {
			  username: this.authenticationRequestForm.value.username,
			  password: this.authenticationRequestForm.value.password
			}

		this.authenticationService.authenticate(authenticationRequest).subscribe(
			(authResponse) => {
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

			this.router.navigate(['/apps/chat'])
			},
			(error) => {
				console.error('Erreur capturée dans le composant :', error);
				if(error.message == "le username n existe pas dans notre base de donnees"){
					this.errorLogin = "The username does not exist."
				}else if (error.message == "Mot de passe incorrect"){
					this.errorLogin = "Incorrect password for the user."
				}else{
					this.errorLogin = "Login faild."
				}
				this.show()
			}
			
		)
	}

	}
}

