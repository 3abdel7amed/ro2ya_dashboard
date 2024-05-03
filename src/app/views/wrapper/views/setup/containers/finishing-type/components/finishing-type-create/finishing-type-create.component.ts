import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IFinishing } from '../../models/finihsing-type.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FinishingTypeService } from '../../services/finishing-type.service';

@Component({
  selector: 'app-finishing-type-create',
  templateUrl: './finishing-type-create.component.html',
  styleUrl: './finishing-type-create.component.scss',
})
export class FinishingTypeCreateComponent implements OnInit, OnDestroy {
  @Input() data!: {
    floor: IFinishing;
  };
  isSubmitted: boolean = false;
  addSubscrption: Subscription = new Subscription();
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
    private _FinishingTypeService: FinishingTypeService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  ngOnInit(): void {
    if (this.data && this.data.floor) {
      this.name?.setValue(this.data?.floor.name);
    }
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (!this.data.floor) {
      if (form.valid) {
        this.loading = true;
        this.addSubscrption = this._FinishingTypeService
          .addFinishing(form.value)
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
        this.addSubscrption = this._FinishingTypeService
          .updateFinishing(this.data.floor.id, form.value)
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
    this.addSubscrption.unsubscribe();
  }
}
