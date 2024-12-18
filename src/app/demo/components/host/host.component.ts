import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProblemService } from '../../service/problem.service';
import { Table, TableModule } from 'primeng/table';
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
import { FormsModule } from '@angular/forms';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-host',
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
  providers:[
    MessageService
  ],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent implements OnInit {

  datas : any[] =[]
  data : any;

  statuses: any[] = [];
  loading: boolean = true;

  errorZabbixHost: string = "";

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private problemService: ProblemService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
    this.getAllHost();
  }

  getAllHost(){
    this.problemService.getCombinedHostData().subscribe(
      response => {
        this.datas = response.reverse();
        this.loading = false;
        console.log("la reponse est : ", response);
      },
      error => {
        this.loading = true;

        if(error.message == "Erreur lors de l'envoi de la requête"){
          this.errorZabbixHost = "Zabbix is down";
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorZabbixHost,
          life: 3000
         });
        console.log("l erreur de getProblem est : ", error.message);
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
