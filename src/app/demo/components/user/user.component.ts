import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
		TableDemoRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
    ToolbarModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  
  users : User[]=[]
  roles : Role[]=[]

  constructor(
    private userService: UserService,
  ){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.findAll().subscribe(
        response =>{
            this.loading = false;
            console.log("430 la reponse du user est : ", response);
            this.users = response;
            console.log("users : ", this.users);

            this.users.forEach(user => {
              user.roles.forEach(role => {
                  console.log(role.name);
              });
          });
        },
        error =>{
            this.loading = true;
            console.log("434 l error du user est : ", error);
        }
        
    )
}
formatCurrency(value: number) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
  table.clear();
  this.filter.nativeElement.value = '';
}
}
