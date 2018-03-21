import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AlertService } from './services/alert/alert.service';
import{ ToastModule} from 'ng2-toastr/ng2-toastr';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './services/user/user.service';
import { UtilsService } from './utils/utils.service';
import { FilterSortService } from './utils/filter-sort.service';
import { UserComponent } from './pages/user/user.component';
import { AddDialogComponent } from './pages/user/dialogs/add/add.dialog.component';
import { DeleteDialogComponent } from './pages/user/dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './pages/user/dialogs/edit/edit.dialog.component';
import { LeaveComponent } from './pages/leaves/leave.component';
import { LoadingComponent } from './core/loading.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { LeaveService } from './services/leave/leave.service';
import { CryptoComponent } from './pages/crypto/crypto.component';
import { CmcService } from './services/crypto/cmc.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    HeaderComponent,
    FooterComponent,
    LeaveComponent,
    LoadingComponent,
    CallbackComponent,
    CryptoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    AppRoutingModule
  ],
  entryComponents: [
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent
  ],
  providers: [UserService,UtilsService,FilterSortService,DatePipe, LeaveService,CmcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
