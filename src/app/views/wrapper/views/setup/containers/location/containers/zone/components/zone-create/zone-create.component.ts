import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ICity } from '../../../../models/city.model';
import { Subscription, from } from 'rxjs';
import { ZoneService } from '../../../../services/zone.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlotService } from '../../../../services/plot.service';

@Component({
  selector: 'app-zone-create',
  templateUrl: './zone-create.component.html',
  styleUrl: './zone-create.component.scss',
})
export class ZoneCreateComponent implements OnInit, OnDestroy {
  selectedName!: string;
  isSubmitted: boolean = false;
  appendSubscription: Subscription = new Subscription();
  addSubscription: Subscription = new Subscription();
  loading: boolean = false;
  isAppendLoading: boolean = false;
  appendResponse: ICity[] = [];
  response: [] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    plot: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.form.get('name');
  }

  get nameIsRequired() {
    return this.form.get('name')?.getError('required');
  }

  get appendId() {
    return this.form.get('plot');
  }

  set AppendData(entity: { id: number; name: string }) {
    this.appendId?.setValue(entity.id);
    this.selectedName = entity.name;
    this.name?.enable();
    this.form.updateValueAndValidity();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    // Execute your method here
    this.dismiss();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private _ZoneService: ZoneService,
    private _PlotService: PlotService
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
    this.appendSubscription = this._PlotService.getViewAllPlot().subscribe(
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
      this.addSubscription = this._ZoneService.addZone(form.value).subscribe(
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
