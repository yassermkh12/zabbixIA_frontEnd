import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegisterRequest } from 'src/app/demo/models/register-request';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './register.component.html',
	providers:[ConfirmationService,
		MessageService
	]
})
export class RegisterComponent {

	confirmed: boolean = false;
	token: string = '';
	refrechToken: string = '';
	errorRegister: string = '';

	formSubmitted: boolean = false;

	constructor(
		public layoutService: LayoutService,
		private autheticationService: AuthenticationService,
		private router: Router,
		private messageService: MessageService
	) {}

	registerRequestForm: FormGroup = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		firstName: new FormControl('', [Validators.required]),
    	lastName: new FormControl('', [Validators.required])
	  });

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

	show() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   // Titre du message
		  detail: this.errorRegister,  // Détail du message
		  life: 3000            // Durée de vie du toast en millisecondes (3 secondes ici)
		});
	  }

	register() {

		this.formSubmitted = true;

		  if (this.registerRequestForm.valid) {
			const registerRequest: RegisterRequest = {
			  username: this.registerRequestForm.value.username,
			  password: this.registerRequestForm.value.password,
			  email: this.registerRequestForm.value.email,
			  firstName: this.registerRequestForm.value.firstName,
			  lastName: this.registerRequestForm.value.lastName
			}
	
			this.autheticationService.register(registerRequest).subscribe(
			  authResponse => {
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
	
				this.router.navigate(['/apps/chat'])
			  },
			  error => {
				console.error('Erreur capturée dans le composant :', error);
				if (error.message == "username deja utiliser"){
					this.errorRegister = "Username is already in use.";
				}else if (error.message == "l email est deja utiliser"){
					this.errorRegister = "The email is already in use.";
				}else{
					this.errorRegister = "Register faild";
				}
				this.show()
			  }
			)
	
		  }
	  }
}
