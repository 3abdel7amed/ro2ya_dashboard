import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, HostListener, Input } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit-delete-dialog',
  templateUrl: './unit-delete-dialog.component.html',
  styleUrl: './unit-delete-dialog.component.scss',
})
export class UnitDeleteDialogComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteSubscrition: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _UnitService: UnitService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteSubscrition = this._UnitService
      .deleteUnit(this.data.id)
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
