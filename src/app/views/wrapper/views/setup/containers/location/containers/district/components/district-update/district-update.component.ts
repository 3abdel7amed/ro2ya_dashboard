import { Component, HostListener, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DistrictService } from '../../../../services/district.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDistrict } from '../../../../models/district.model';

@Component({
  selector: 'app-district-update',
  templateUrl: './district-update.component.html',
  styleUrl: './district-update.component.scss',
})
export class DistrictUpdateComponent {
  @Input() data!: {
    district: IDistrict;
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
    private _DistrictService: DistrictService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.name?.setValue(this.data?.district.name);
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.updatePlot = this._DistrictService
        .updateDistrict(this.data.district.id, form.value)
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
