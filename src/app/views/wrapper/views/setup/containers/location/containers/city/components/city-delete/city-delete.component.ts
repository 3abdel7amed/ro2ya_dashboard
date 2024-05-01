import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityService } from '../../../../services/city.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-city-delete',
  templateUrl: './city-delete.component.html',
  styleUrl: './city-delete.component.scss',
})
export class CityDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deletedSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _CityService: CityService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deletedSubscription = this._CityService
      .deleteCity(this.data.id)
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
