import { Component, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from '../../../../services/zone.service';

@Component({
  selector: 'app-zone-delete',
  templateUrl: './zone-delete.component.html',
  styleUrl: './zone-delete.component.scss',
})
export class ZoneDeleteComponent {
  @Input() data!: {
    id: number;
    name: string;
  };
  isSubmitted: boolean = false;
  deletedSubscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _ZoneService: ZoneService,
    private _NgbActiveModal: NgbActiveModal
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  submit() {
    this.loading = true;
    this.deletedSubscription = this._ZoneService
      .deleteZone(this.data.id)
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
