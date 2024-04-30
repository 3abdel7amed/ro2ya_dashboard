import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../../../../../services/location.service';
import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-government-delete',
  templateUrl: './government-delete.component.html',
  styleUrl: './government-delete.component.scss',
})
export class GovernmentDeleteComponent implements OnDestroy {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteGovernment: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _LocationService: LocationService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteGovernment = this._LocationService
      .deleteGover(this.data.id)
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
    this.deleteGovernment.unsubscribe();
  }
}
