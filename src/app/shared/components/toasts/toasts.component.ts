import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsComponent {

  constructor(public toastService: ToastService) {}
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
