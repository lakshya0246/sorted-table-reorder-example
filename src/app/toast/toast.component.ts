import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.model';
import { UtilsActions } from '../utils-state';
import { Toast } from '../utils-state/utils.model';

@Component({
  selector: 'burnt-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
/**
 * Displays a list of toasts
 */
export class ToastComponent {
  toasts$: Observable<Toast[]> = this.store.select(
    (state) => state.utils.toasts
  );
  constructor(private store: Store<AppState>) {}

  triggerCallback(toast: Toast) {
    if (toast.callback) {
      toast.callback();
      this.store.dispatch(UtilsActions.clearToast({ id: toast.id }));
    }
  }
}
