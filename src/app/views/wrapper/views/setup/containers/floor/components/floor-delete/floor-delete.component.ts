import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FloorService } from '../../services/floor.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-floor-delete',
  templateUrl: './floor-delete.component.html',
  styleUrl: './floor-delete.component.scss',
})
export class FloorDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteSubscrition: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _FloorService: FloorService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteSubscrition = this._FloorService
      .deleteFloor(this.data.id)
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
