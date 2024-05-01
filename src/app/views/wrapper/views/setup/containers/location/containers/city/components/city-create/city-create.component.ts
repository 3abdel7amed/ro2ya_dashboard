import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICity } from '../../../../models/city.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '../../../../services/city.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../../services/government.service';
import { SingleGovernment } from '../../../../models/government.model';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrl: './city-create.component.scss',
})
export class CityCreateComponent implements OnInit, OnDestroy {
  @Input() data!: {
    city: ICity;
  };
  selectedName!: string;
  isSubmitted: boolean = false;
  appendSubscription: Subscription = new Subscription();
  addAndUpdateCity: Subscription = new Subscription();
  loading: boolean = false;
  isAppendLoading: boolean = false;
  appendResponse: SingleGovernment[] = [];
  response: [] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    governorate: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  get appendId() {
    return this.form.get('governorate');
  }

  set AppendData(entity: { id: number; name: string }) {
    this.appendId?.setValue(entity.id);
    this.selectedName = entity.name;
    this.name?.enable();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _CityService: CityService,
    private _LocationService: LocationService
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
    this.appendSubscription = this._LocationService.getViewAllGover().subscribe(
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
    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.addAndUpdateCity = this._CityService.addCity(form.value).subscribe(
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
    this.addAndUpdateCity.unsubscribe();
    this.appendSubscription.unsubscribe();
  }
}
