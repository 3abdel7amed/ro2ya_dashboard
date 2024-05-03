import { Component, HostListener, Input } from '@angular/core';
import { DirectionsService } from '../../services/direction.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-directions-delete',
  templateUrl: './directions-delete.component.html',
  styleUrl: './directions-delete.component.scss',
})
export class DirectionsDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteSubscrition: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _DirectionsService: DirectionsService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteSubscrition = this._DirectionsService
      .deleteDirections(this.data.id)
      .subscribe(
        (response) => {
          this.loading = false;
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
    this.deleteSubscrition.unsubscribe();
  }
}
