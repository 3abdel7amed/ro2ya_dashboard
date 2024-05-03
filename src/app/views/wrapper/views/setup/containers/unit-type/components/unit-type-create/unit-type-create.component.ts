import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IUnitType } from '../../models/unit-type.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitTypeService } from '../../services/unit-type.service';

@Component({
  selector: 'app-unit-type-create',
  templateUrl: './unit-type-create.component.html',
  styleUrl: './unit-type-create.component.scss',
})
export class UnitTypeCreateComponent implements OnInit, OnDestroy {
  @Input() data!: {
    data: IUnitType;
  };
  isSubmitted: boolean = false;
  addSubscription: Subscription = new Subscription();
  loading: boolean = false;
  response: [] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _UnitTypeService: UnitTypeService
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
        this.addSubscription = this._UnitTypeService
          .addUnitType(form.value)
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
    } else {
      if (form.valid) {
        this.loading = true;
        this.addSubscription = this._UnitTypeService
          .updateUnitType(this.data.data.id, form.value)
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
