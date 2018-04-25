import { BrowserModule } from "@angular/platform-browser";
import { NgModule, forwardRef } from "@angular/core";
import { AppComponent } from "./app.component";
import { DatePipe } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertService } from "./services/alert/alert.service";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { AppRoutingModule } from ".//app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { UserService } from "./services/user/user.service";
import { UtilsService } from "./utils/utils.service";
import { FilterSortService } from "./utils/filter-sort.service";
import { UserComponent } from "./pages/user/user.component";
import { AddDialogComponent } from "./pages/user/dialogs/add/add.dialog.component";
import { DeleteDialogComponent } from "./pages/user/dialogs/delete/delete.dialog.component";
import { EditDialogComponent } from "./pages/user/dialogs/edit/edit.dialog.component";
import { LeaveComponent } from "./pages/leaves/leave.component";
import { LoadingComponent } from "./core/loading.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { LeaveService } from "./services/leave/leave.service";
import { TransactionService } from "./services/crypto/transaction.service";
import { CryptoComponent } from "./pages/crypto/crypto.component";
import { CmcService } from "./services/crypto/cmc.service";
import { AddHoldingDialogComponent } from "./pages/crypto/dialog/add-holding-dialog/add-holding-dialog.component";
import { User1Component } from "./pages/user1/user1.component";

<<<<<<< HEAD
import { reducers } from "./pages/user1/store/reducers";
import { effects } from "./pages/user1/store/effects";
import { StoreModule, StoreFeatureModule } from "@ngrx/store";
import {
  CustomSerializer,
  appReducers,
  logger,
  metaReducers
} from "../app/store";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";

import { environment } from "../environments/environment";
import { ViewCoinTransactionComponent } from "./pages/crypto/dialog/view-coin-transaction/view-coin-transaction.component";
import { DeleteTransactionDialogComponent } from "./pages/crypto/dialog/delete-transaction-dialog/delete-transaction-dialog.component";
import { ViewHoldingDialogComponent } from "./pages/crypto/dialog/view-holding-dialog/view-holding-dialog.component";
=======
import { StoreModule, MetaReducer, StoreFeatureModule } from '@ngrx/store';
import { CustomSerializer, appReducers  } from '../app/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from '../app/pages/user1/store';
import { UserComponent1Component} from './pages/user1/user1.component';

import { environment } from '../environments/environment';
import { ViewCoinTransactionComponent } from './pages/crypto/dialog/view-coin-transaction/view-coin-transaction.component';
import { DeleteTransactionDialogComponent } from './pages/crypto/dialog/delete-transaction-dialog/delete-transaction-dialog.component';
import { ViewHoldingDialogComponent } from './pages/crypto/dialog/view-holding-dialog/view-holding-dialog.component';
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
/* 
export const metaReducers: MetaReducer <any>[] = !environment.production
? [] : []; */

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
    CryptoComponent,
    AddHoldingDialogComponent,
<<<<<<< HEAD
    User1Component,
=======
    UserComponent1Component,
>>>>>>> 29c7dbda72fd95857f1f143dab0a624d093a2254
    ViewCoinTransactionComponent,
    DeleteTransactionDialogComponent,
    ViewHoldingDialogComponent
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
    MatNativeDateModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatRadioModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    StoreModule.forFeature("employees", reducers),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forFeature(effects),
    EffectsModule.forRoot([])
  ],
  entryComponents: [
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    AddHoldingDialogComponent,
    ViewCoinTransactionComponent,
    ViewHoldingDialogComponent
  ],
  providers: [
    {
      provide: forwardRef(() => {
        RouterStateSerializer;
      }),
      useClass: forwardRef(() => {
        CustomSerializer;
      })
    },
    UserService,
    UtilsService,
    FilterSortService,
    DatePipe,
    LeaveService,
    CmcService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
