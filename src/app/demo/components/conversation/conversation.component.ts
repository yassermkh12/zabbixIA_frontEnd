import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConversationService } from '../../service/conversation.service';
import { ButtonModule } from 'primeng/button';
import { Conversation } from '../../models/conversation';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-conversation',
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
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnInit{

  
  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  userMessage : string = "";
  responseMessage : string = "";
  conversations : Conversation [] = [];
  
  constructor(
    private conversationService: ConversationService,
  ){}

  ngOnInit(): void {
    this.getAllConversation();
  }

  getAllConversation(){
    this.conversationService.getAllConversations().subscribe(
      response => {
        this.loading = false;
        console.log("27 response : ", response);
        this.conversations = response
      },
      error => {
        this.loading = true;
        console.log("30 error : ", error);
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

  message(){
    this.conversationService.sendMessage().subscribe(
      response => {
        console.log("38 response : ", response);
        this.responseMessage = response.message;
      },
      error => {
        console.log("41 error : ", error);
      }
    )
  }
}
