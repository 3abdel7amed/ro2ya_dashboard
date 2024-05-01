import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DistrictService } from '../../../../services/district.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-district-delete',
  templateUrl: './district-delete.component.html',
  styleUrl: './district-delete.component.scss',
})
export class DistrictDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deletedSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _DistrictService: DistrictService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deletedSubscription = this._DistrictService
      .deleteDistrict(this.data.id)
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
