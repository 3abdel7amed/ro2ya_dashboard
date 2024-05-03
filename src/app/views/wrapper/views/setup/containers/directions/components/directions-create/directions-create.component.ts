import { Component, HostListener, Input } from '@angular/core';
import { IDirections } from '../../models/directions.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DirectionsService } from '../../services/direction.service';

@Component({
  selector: 'app-directions-create',
  templateUrl: './directions-create.component.html',
  styleUrl: './directions-create.component.scss',
})
export class DirectionsCreateComponent {
  @Input() data!: {
    direction: IDirections;
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
    private _DirectionsService: DirectionsService
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  ngOnInit(): void {
    if (this.data && this.data.direction) {
      this.name?.setValue(this.data?.direction.name);
    }
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (!this.data.direction) {
      if (form.valid) {
        this.loading = true;
        this.addSubscription = this._DirectionsService
          .addDirections(form.value)
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
        this.addSubscription = this._DirectionsService
          .updateDirections(this.data.direction.id, form.value)
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
