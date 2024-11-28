import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RecuperationService } from 'src/app/demo/service/recuperation.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './forgotpassword.component.html',
	providers: [
		MessageService
	]
})
export class ForgotPasswordComponent { 

    constructor(
		public layoutService: LayoutService,
		private recuperationService : RecuperationService,
		private router : Router,
		private messageService : MessageService
	) {}

	email : string = '';
	forgotPasswordError: string = '';
	formSubmitted: boolean = false;

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

	show() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.forgotPasswordError,  
		  life: 3000            
		});
	  }

	forgotPassword(form:NgForm) {

		this.formSubmitted = true;

		  if (form.valid) {
			this.email = form.value.email
			console.log(this.email)
	
			this.recuperationService.forgotPassword(this.email).subscribe(
			  response => {
				console.log(response)
				this.router.navigate(['/auth/verification', { email: this.email}])
				  },
			  error => {
				console.log(this.email)
				console.error(error.message);
				if (error.message == "il n y a pas de user avec cet email"){
					this.forgotPasswordError = "There is no user with this email."
				}
				this.show()
			  }
			)
		  }
		}
		
	  }
	


