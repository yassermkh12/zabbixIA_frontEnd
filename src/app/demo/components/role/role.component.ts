import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoleServiceService } from '../../service/role-service.service';
import { Role } from '../../models/role';
import { Table, TableModule } from 'primeng/table';
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
import { FormsModule } from '@angular/forms';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
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
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Messages } from 'primeng/messages';

@Component({
  selector: 'app-role',
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
    CommonModule,
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
        SelectButtonModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit{

  newRole: boolean = false;
  roleU : boolean = false;
  roleV : boolean = false;

  role: Role = {
    "id":0,
    "name":""
  };

  roleById : Role = {
    "id":0,
    "name":""
  };


  roleView : Role = {
    "id":0,
    "name":""
  };

  roleUpdate: Role ={
    "id":0,
    "name":""
  }

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  roles : Role[]=[];

  constructor(
    private roleService: RoleServiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.roleService.findAll().subscribe(
        response => {
          this.loading = false;
            console.log("443 la reponse du role est : ", response);
            this.roles = response;
        },
        error =>{
          this.loading = true;
            console.log("446 l error du user est : ", error);
        }
    )
}

createRole(){
  this.roleService.save(this.role).subscribe(
    response => {
      console.log("la reponse du save role est : ", response);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Role added successfully.',
        life: 3000
       });
      this.getAllRoles();
      this.cancelRole();
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Role not added.',
        life: 3000
       });
      console.log("l erreur du save role est : ", error);
    }
  )
}

getRoleById(id:number){
  this.roleService.findById(id).subscribe(
    response => {
      this.roleUpdate = response;
    },
    error =>{
      console.log("le message d erreur est : ", error);
    }
  )
}

viewRole(id:number){
  this.roleService.findById(id).subscribe(
    response => {
      this.visibleViewRole();
      console.log("la reponse de get by id est : ", response);
      this.roleView = response;
    },
    error =>{
      this.cancelViewRole();
      console.log("l erreur de get by id est : ", error);
    }
  )
}

deleteRole(id:number){
  this.roleService.delete(id).subscribe(
    response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Role has been successfully deleted.',
        life: 3000
       });
      this.getAllRoles();
      console.log("la reponse de delete role est : ", response);
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Role not deleted.',
        life: 3000
       });
      console.log("l erreur de delete role est : ", error);
    }
  )
}

updateRole(id:number){
  this.roleService.update(id,this.roleUpdate).subscribe(
    response =>{
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Role has been successfully updated.',
        life: 3000
       });
      this.getAllRoles();
      this.cancelUpdateRole();
      console.log("la reponse de update role est : ", response);
      this.roleUpdate = response;
    },
    error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Role not updated.',
        life: 3000
       });
      console.log("l erreur de update role est : ", error);
    }
  )
}

preUpdateRole(id:number){
  this.getRoleById(id);
  this.visibleUpdateRole();
}

visibleRole(){
  this.newRole = true;
}

cancelRole(){
  this.newRole = false;
}

visibleViewRole(){
  this.roleV = true;
}

cancelViewRole(){
  this.roleV = false;
}

visibleUpdateRole(){
  this.roleU = true;
}

cancelUpdateRole(){
  this.roleU = false;
}

confirmDeleteRole(id:number){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => this.deleteRole(id),
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
