import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../app.model';
import { UtilsActions } from '../utils-state';
import { Toast, UtilsState } from '../utils-state/utils.model';

@Component({
  selector: 'burnt-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toasts$: Observable<Toast[]> = this.store.select(
    (state) => state.utils.toasts
  );
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  triggerCallback(toast: Toast) {
    if (toast.callback) {
      toast.callback();
      this.store.dispatch(UtilsActions.clearToast({ id: toast.id }));
    }
  }
}
