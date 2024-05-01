import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlotService } from '../../../../services/plot.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plot-delete',
  templateUrl: './plot-delete.component.html',
  styleUrl: './plot-delete.component.scss',
})
export class PlotDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deletedSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _PlotService: PlotService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deletedSubscription = this._PlotService
      .deletePlot(this.data.id)
      .subscribe(
        (response) => {
          this.loading = false;
          console.log(response);
          this._NgbActiveModal.close();
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  ngOnDestroy(): void {
    this.deletedSubscription.unsubscribe();
  }
}
