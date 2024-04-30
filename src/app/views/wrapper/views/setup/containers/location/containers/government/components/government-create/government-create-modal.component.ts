import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../../../../../services/location.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleGovernment } from '../../../../models/government.model';

@Component({
  selector: 'app-government-create-modal',
  templateUrl: './government-create-modal.component.html',
  styleUrl: './government-create-modal.component.scss',
})
export class GovernmentCreateModalComponent implements OnInit, OnDestroy {
  @Input() data!: {
    govern: SingleGovernment;
  };
  isSubmitted: boolean = false;
  addGovernment: Subscription = new Subscription();
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
    private _LocationService: LocationService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  ngOnInit(): void {
    if (this.data.govern) {
      this.name?.setValue(this.data.govern.name);
    }
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (!this.data.govern) {
      if (form.valid) {
        this.loading = true;
        this.addGovernment = this._LocationService
          .addGovernment(form.value)
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
    } else {
      if (form.valid) {
        this.loading = true;
        this.addGovernment = this._LocationService
          .updateGovernment(this.data.govern.id, form.value)
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
    }
  }

  ngOnDestroy(): void {
    this.addGovernment.unsubscribe();
  }
}
