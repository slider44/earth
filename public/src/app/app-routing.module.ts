import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./pages/user/user.component";
import { User1Component } from "./pages/user1/user1.component";
import { LeaveComponent } from "./pages/leaves/leave.component";
import { CallbackComponent } from "./pages/callback/callback.component";
import { CryptoComponent } from "./pages/crypto/crypto.component";

const routes: Routes = [
  {
    path: "user",
    component: User1Component
  },
  {
    path: "",
    component: LeaveComponent
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "crypto",
    component: CryptoComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
