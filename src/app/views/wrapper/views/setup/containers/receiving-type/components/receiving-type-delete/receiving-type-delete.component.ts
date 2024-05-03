import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReceivingTypeService } from '../../services/receiving-type.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receiving-type-delete',
  templateUrl: './receiving-type-delete.component.html',
  styleUrl: './receiving-type-delete.component.scss',
})
export class ReceivingTypeDeleteComponent implements OnDestroy {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deleteSubscrition: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _ReceivingTypeService: ReceivingTypeService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deleteSubscrition = this._ReceivingTypeService
      .deleteReceivingType(this.data.id)
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
