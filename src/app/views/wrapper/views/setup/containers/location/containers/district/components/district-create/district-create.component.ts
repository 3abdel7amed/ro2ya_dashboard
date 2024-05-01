import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDistrict } from '../../../../models/district.model';
import { IZone } from '../../../../models/zone.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from '../../../../services/zone.service';
import { DistrictService } from '../../../../services/district.service';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styleUrl: './district-create.component.scss',
})
export class DistrictCreateComponent {
  selectedName!: string;
  isSubmitted: boolean = false;
  appendSubscription: Subscription = new Subscription();
  addSubscription: Subscription = new Subscription();
  loading: boolean = false;
  isAppendLoading: boolean = false;
  appendResponse: IZone[] = [];
  response: [] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    zone: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  get appendId() {
    return this.form.get('zone');
  }

  set AppendData(entity: { id: number; name: string }) {
    this.appendId?.setValue(entity.id);
    this.selectedName = entity.name;
    this.name?.enable();
    this.form.updateValueAndValidity();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _DistrictService: DistrictService,
    private _ZoneService: ZoneService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.getAppendData();
  }

  setupForm() {
    this.name?.setValue('');
    this.name?.disable();
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  getAppendData() {
    this.isAppendLoading = true;
    this.appendSubscription = this._ZoneService.getViewAllZone().subscribe(
      (response) => {
        this.appendResponse = response.data;
        this.isAppendLoading = false;
      },
      (error) => {
        console.log(error);
        this.isAppendLoading = false;
      }
    );
  }

  submit(form: FormGroup) {
    console.log(this.form.value);

    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.addSubscription = this._DistrictService
        .addDistrict(form.value)
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
    this.addSubscription.unsubscribe();
    this.appendSubscription.unsubscribe();
  }
}
