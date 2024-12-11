import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { CommonModule } from '@angular/common';
import { ProblemService } from '../../service/problem.service';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-problem',
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
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.scss'
})
export class ProblemComponent implements OnInit{

  errorZabbixProblem : string = '';

  datas : any[]=[]
  data : any;

  statuses: any[] = [];
  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private problemService: ProblemService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getProblem();

    this.statuses = [
      { label: 'unqualified', value: '5', name:"Catastrophe"},
      { label: 'qualified', value: '4', name:"Haute" },
      { label: 'new', value: '3', name:"Moyen"},
      { label: 'negotiation', value: '2', name:" Avertissement"},
      { label: 'renewal', value: '1', name:" Information" },
      { label: 'proposal', value: '0', name:" Non classé" }
  ];
  }

  getProblem(){
    this.problemService.getActiveEvents().subscribe(
      response =>{
        this.loading = false;
        this.datas = response.reverse();;
        console.log("la response de getProblem est : ", response); 
      },
      error =>{
        this.loading = true;
        if(error.message == "Erreur lors de l'envoi de la requête"){
          this.errorZabbixProblem = "Zabbix is down";
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.errorZabbixProblem,
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
