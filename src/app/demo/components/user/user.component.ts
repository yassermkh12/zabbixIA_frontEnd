import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { RoleServiceService } from '../../service/role-service.service';

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
    ToolbarModule,
     ConfirmDialogModule,
            FileUploadModule,
            SplitButtonModule,
            ChipsModule,
            InputNumberModule,
            DialogModule,
            SplitButtonModule,
            FileUploadModule,
            ConfirmDialogModule,
            CalendarModule,
            TabViewModule,
            InputSwitchModule,
            TagModule,
            PasswordModule,
            // SpinnerModule,
            InputTextareaModule,
            SelectButtonModule,
            MultiSelectModule
  ],
  providers:[
      MessageService,
      ConfirmationService
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  
  users : User[]=[]
  roles : Role[]=[]

  user : User = {
        "id": 0,
        "name": "",
        "image": "",
        "status": "",
        "messages": [{
          "text": "",
          "ownerId": 0,
          "createdAt": 0,
        }],
        "lastSeen": "",
    
        "email": "",
        "username": "",
        "password": "",
        "roles": [{
          "id": 0,
          "name": "",
        }],
        "firstName": "",
        "lastName": "",
        "verificationCode": 0,
        "verificationCodeExpiration": "string",
  }

  userById : User = {
    "id": 0,
    "name": "",
    "image": "",
    "status": "",
    "messages": [{
      "text": "",
      "ownerId": 0,
      "createdAt": 0,
    }],
    "lastSeen": "",

    "email": "",
    "username": "",
    "password": "",
    "roles": [{
      "id": 0,
      "name": "",
    }],
    "firstName": "",
    "lastName": "",
    "verificationCode": 0,
    "verificationCodeExpiration": "string",
  }

  userView : User = {
    "id": 0,
    "name": "",
    "image": "",
    "status": "",
    "messages": [{
      "text": "",
      "ownerId": 0,
      "createdAt": 0,
    }],
    "lastSeen": "",

    "email": "",
    "username": "",
    "password": "",
    "roles": [{
      "id": 0,
      "name": "",
    }],
    "firstName": "",
    "lastName": "",
    "verificationCode": 0,
    "verificationCodeExpiration": "string",
  }

  userUpdate : User = {
    "id": 0,
    "name": "",
    "image": "",
    "status": "",
    "messages": [{
      "text": "",
      "ownerId": 0,
      "createdAt": 0,
    }],
    "lastSeen": "",

    "email": "",
    "username": "",
    "password": "",
    "roles": [{
      "id": 0,
      "name": "",
    }],
    "firstName": "",
    "lastName": "",
    "verificationCode": 0,
    "verificationCodeExpiration": "string",
  };

  role: Role = {
    "id": 0,
    "name": "",
  };

  newUser: boolean = false;
  userV: boolean = false;
  userU: boolean = false;
  addRole: boolean = false;
  removeRole: boolean = false;

  addRoleUserId: number = 0;
  removeRoleUserId: number = 0;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private roleService: RoleServiceService
  ){}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
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

getAllRoles(){
  this.roleService.findAll().subscribe(
      response => {
          console.log("443 la reponse du role est : ", response);
          this.roles = response;
      },
      error =>{
        this.loading = true;
          console.log("446 l error du user est : ", error);
      }
  )
}


createUser(){
  this.userService.save(this.user).subscribe(
    response => {
      console.log("la reponse du save role est : ", response);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User added successfully.',
        life: 3000
       });
      this.getAllUsers();
      this.cancelUser();
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User not added.',
        life: 3000
       });
      console.log("l erreur du save role est : ", error);
    }
  )
}

viewUser(id:number){
  this.userService.findById(id).subscribe(
    response => {
      this.visibleViewUser();
      console.log("la reponse de get by id est : ", response);
      this.userView = response;
    },
    error =>{
      this.cancelViewUser();
      console.log("l erreur de get by id est : ", error);
    }
  )
}

deleteUser(id:number){
  this.userService.delete(id).subscribe(
    response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'User has been successfully deleted.',
        life: 3000
       });
      this.getAllUsers();
      console.log("la reponse de delete role est : ", response);
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User not deleted.',
        life: 3000
       });
      console.log("l erreur de delete role est : ", error);
    }
  )
}

addRoleToUser(){
  this.userService.addRoleToUser(this.addRoleUserId,this.role.id).subscribe(
    response =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Role has been successfully added to user.',
        life: 3000
       });
      this.getAllUsers();
      console.log(response);
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Role not added to user.',
        life: 3000
       });
      console.log(error);
    }
  )
}

removeRoleToUser(){
  this.userService.removeRoleFromUser(this.removeRoleUserId,this.role.id).subscribe(
    response =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Role has been successfully removed to user.',
        life: 3000
       });
      this.getAllUsers();
      console.log(response);
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Role not removed to user.',
        life: 3000
       });
      console.log(error);
    }
  )
}

visibleAddRole(id:number){
  this.addRoleUserId = id;
  this.addRole = true;
}
cancelAddRole(){
  this.addRole = false;
}
visibleRemoveRole(id:number){
  this.removeRoleUserId = id;
  this.removeRole = true;
}
cancelRemoveRole(){
  this.removeRole = false;
}


visibleUser(){
  this.newUser = true;
}

cancelUser(){
  this.newUser = false;
}

visibleViewUser(){
  this.userV = true;
}

cancelViewUser(){
  this.userV = false;
}

visibleUpdateUser(){
  this.userU = true;
}

cancelUpdateUser(){
  this.userU = false;
}

confirmDeleteUser(id:number){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => this.deleteUser(id),
    // reject: () => rejectFunc()
  })
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
