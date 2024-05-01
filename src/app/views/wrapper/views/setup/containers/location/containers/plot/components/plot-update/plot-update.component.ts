import { Component, HostListener, Input } from '@angular/core';
import { IPlot } from '../../../../models/plot.models';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlotService } from '../../../../services/plot.service';

@Component({
  selector: 'app-plot-update',
  templateUrl: './plot-update.component.html',
  styleUrl: './plot-update.component.scss',
})
export class PlotUpdateComponent {
  @Input() data!: {
    plot: IPlot;
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
    private _PlotService: PlotService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.name?.setValue(this.data?.plot.name);
  }

  dismiss() {
    this._NgbActiveModal.dismiss();
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid) {
      this.loading = true;
      this.updatePlot = this._PlotService
        .updatePlot(this.data.plot.id, form.value)
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
