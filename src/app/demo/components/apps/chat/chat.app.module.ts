import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatAppRoutingModule } from './chat.app-routing.module';
import { ChatAppComponent } from './chat.app.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatService } from './service/chat.service';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { ScrollPanel, ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollTop, ScrollTopModule } from 'primeng/scrolltop';
import { Table, TableModule } from 'primeng/table';
import { TableDemoRoutingModule } from '../../uikit/table/tabledemo-routing.module';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatAppRoutingModule,
        AvatarModule,
        InputTextModule,
        ButtonModule,
        BadgeModule,
        OverlayPanelModule,
        RippleModule,
        TabViewModule,
        ConfirmDialogModule,
        ToastModule,
        ToolbarModule,
        ScrollPanelModule,
        SelectButtonModule,
        DropdownModule,
        MultiSelectModule,
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
                SelectButtonModule,
                ScrollTopModule,
                
    ],
    declarations: [
        ChatAppComponent,
        ChatBoxComponent
    ],
    providers: [
        ChatService
    ]
})
export class ChatAppModule { }
