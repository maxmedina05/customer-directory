import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-dot',
  templateUrl: './loading-dot.component.html',
  styleUrls: ['./loading-dot.component.css']
})
export class LoadingDotComponent {
  @Input() showLoading = false;
}
