import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperationService } from 'src/app/demo/service/recuperation.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
	templateUrl: './newpassword.component.html',
	providers:[
		ConfirmationService,
		MessageService
	]
})
export class NewPasswordComponent implements OnInit{

	rememberMe: boolean = false;

	email : string|null = '';
	validPassword : string = '';
	errorPassword : string = '';

	resetPasswordError: string = '';
	formSubmitted: boolean = false;


	constructor(
		public layoutService: LayoutService,
		private recuperationService : RecuperationService,
		private route : ActivatedRoute,
		private router : Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService        
	) {}

	ngOnInit(): void {
		this.email = this.route.snapshot.paramMap.get('email');
        console.log('Email récupéré: ', this.email);
	}

	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

	show() {
		this.messageService.add({
		  severity: 'success',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.validPassword,  
		  life: 3000            
		});
	  }
	
	confirm(form:NgForm) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => this.resetPassword(form),
			// reject: () => rejectFunc()
		})
	}

	resetPassword(form:NgForm) {
		this.formSubmitted = true;
		  if (form.valid) {
			{
			  var password = form.value.password
			  console.log(password);
			  console.log(this.email)
			  this.recuperationService.resetPassword(this.email, password).subscribe(
				response => {
				  console.log("password est envoyer");
				  this.validPassword = "Password has been updated.";
				  this.show();
				  this.router.navigate(['/auth/login']);
				},
				error => {
				  console.error(error.message);
				  this.errorPassword = error.message;
				}
			  )
			}
		  }
		}
	
	  
}
