import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RecuperationService } from 'src/app/demo/service/recuperation.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './verification.component.html',
    providers: [
		MessageService
	]
})
export class VerificationComponent implements OnInit {

    val1!: number;
    
    val2!: number;
    
    val3!: number;
    
    val4!: number;

	constructor(
        public layoutService: LayoutService,
        private recuperationService : RecuperationService,
        private route : ActivatedRoute,
        private router : Router,
        private messageService: MessageService        
    ) {}

    email : string | null = "";
    form: any;
    verifyCodeError: string = "";
    formSubmitted: boolean = false;



    ngOnInit(): void {
        this.email = this.route.snapshot.paramMap.get('email');
        console.log('Email récupéré: ', this.email);

    }
	get dark(): boolean {
		return this.layoutService.config().colorScheme !== 'light';
	}

    show() {
		this.messageService.add({
		  severity: 'error',  // Type de toast ('success', 'info', 'warn', 'error')
		  summary: 'Error',   
		  detail: this.verifyCodeError,  
		  life: 3000            
		});
	  }

    onDigitInput(event: any) {
        let element;
        if (event.code !== 'Backspace')
            if (event.code.includes('Numpad')|| event.code.includes('Digit')) {
                element = event.srcElement.nextElementSibling;
            }
        if (event.code === 'Backspace')
            element = event.srcElement.previousElementSibling;

        if (element == null)
            return;
        else
            element.focus();
    }

    verifyCode(form:NgForm){
      this.formSubmitted = true;

        var code = form.value.code
          console.log(code);
          console.log(this.email)
          this.recuperationService.verifyCode(this.email, code).subscribe(
            response => {
                console.log("code est envoyer");
                this.router.navigate(['/auth/newpassword',{email:this.email}])
            },
            error => {
              console.error(error.message);
              if(error.message == "le code est invalid"){
                this.verifyCodeError = "The code is invalid.";
              }else{
                this.verifyCodeError = "The code is invalid.";
              }
              this.show()
            }
          )
        }
     
    
}
