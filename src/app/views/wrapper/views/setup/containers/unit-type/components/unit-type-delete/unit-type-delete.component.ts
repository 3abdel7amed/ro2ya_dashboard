import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnitTypeService } from '../../services/unit-type.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unit-type-delete',
  templateUrl: './unit-type-delete.component.html',
  styleUrl: './unit-type-delete.component.scss',
})
export class UnitTypeDeleteComponent implements OnDestroy {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteSubscrition: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _UnitTypeService: UnitTypeService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteSubscrition = this._UnitTypeService
      .deleteUnitType(this.data.id)
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
