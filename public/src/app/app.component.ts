import { Component, OnInit   } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  navOpen: boolean;
  minHeight: string;
  private _initWinHeight = 0;


 /* constructor(public alert: ToastsManager, vRef: ViewContainerRef) {
    this.alert.setRootViewContainerRef(vRef);
  }*/

  constructor() {}


  ngOnInit() {
    Observable.fromEvent(window, 'resize')
      .debounceTime(200)
      .subscribe((event) => this._resizeFn(event));

    this._initWinHeight = window.innerHeight;
    this._resizeFn(null);
  }

  navToggledHandler(e: boolean) {
    this.navOpen = e;
  }

  private _resizeFn(e) {
    const winHeight: number = e ? e.target.innerHeight : this._initWinHeight;
    this.minHeight = `${winHeight}px`;
  }
}
