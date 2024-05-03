import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CityService } from '../../../../services/city.service';
import { ICity } from '../../../../models/city.model';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrl: './update-city.component.scss',
})
export class UpdateCityComponent implements OnInit, OnDestroy {
  @Input() data!: {
    city: ICity;
  };
  loading: boolean = false;
  isSubmitted: boolean = false;
  updateCity: Subscription = new Subscription();
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
    private _CityService: CityService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.name?.setValue(this.data?.city.name);
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.updateCity = this._CityService
        .updateCity(this.data.city.id, form.value)
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
    this.updateCity.unsubscribe();
  }
}
