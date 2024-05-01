import { Component, HostListener, Input } from '@angular/core';
import { IZone } from '../../../../models/zone.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from '../../../../services/zone.service';

@Component({
  selector: 'app-zone-update',
  templateUrl: './zone-update.component.html',
  styleUrl: './zone-update.component.scss',
})
export class ZoneUpdateComponent {
  @Input() data!: {
    zone: IZone;
  };
  loading: boolean = false;
  isSubmitted: boolean = false;
  updatePlot: Subscription = new Subscription();
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _ZoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.name?.setValue(this.data?.zone.name);
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.updatePlot = this._ZoneService
        .updateZone(this.data.zone.id, form.value)
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
  }

  ngOnDestroy(): void {
    this.updatePlot.unsubscribe();
  }
}
