import { Component, HostListener, Input } from '@angular/core';
import { IUnit } from '../../model/unit.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-unit-create-dialog',
  templateUrl: './unit-create-dialog.component.html',
  styleUrl: './unit-create-dialog.component.scss',
})
export class UnitCreateDialogComponent {
  @Input() data!: {
    data: IUnit;
  };
  isSubmitted: boolean = false;
  addSubscription: Subscription = new Subscription();
  loading: boolean = false;
  response: [] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    governorate: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zone: new FormControl('', [Validators.required]),
    plot: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    short_description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    uniteType: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]),
    direction: new FormControl('', [Validators.required]),
    bedroom_count: new FormControl('', [Validators.required]),
    bathroom_count: new FormControl('', [Validators.required]),
    finishingType: new FormControl('', [Validators.required]),
    is_installment: new FormControl('', [Validators.required]),
    have_garden: new FormControl('', [Validators.required]),
    garden_area: new FormControl('', [Validators.required]),
    full_description: new FormControl('', [Validators.required]),
    have_furniture: new FormControl('', [Validators.required]),
    receivingType: new FormControl('', [Validators.required]),
    commonFeatures: new FormControl('', [Validators.required]),
    commonContact: new FormControl('', [Validators.required]),
    main_image: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required]),
    publish: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _UnitService: UnitService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  ngOnInit(): void {
    if (this.data && this.data.data) {
      this.name?.setValue(this.data?.data.name);
    }
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (!this.data.data) {
      if (form.valid) {
        this.loading = true;
        this.addSubscription = this._UnitService.addUnit(form.value).subscribe(
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
    } else {
      if (form.valid) {
        this.loading = true;
        this.addSubscription = this._UnitService
          .updateUnit(this.data.data.id, form.value)
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
  }

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe();
  }
}
