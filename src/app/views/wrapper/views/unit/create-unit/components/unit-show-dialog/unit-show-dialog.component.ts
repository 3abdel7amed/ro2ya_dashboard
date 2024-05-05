import { environment } from './../../../../../../../environment/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { IUnit } from '../../model/unit.model';

@Component({
  selector: 'app-unit-show-dialog',
  templateUrl: './unit-show-dialog.component.html',
  styleUrl: './unit-show-dialog.component.scss',
})
export class UnitShowDialogComponent implements OnInit {
  @Input() data!: IUnit;
  env = environment;
  constructor(private _NgbActiveModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  dismiss() {
    this._NgbActiveModal.dismiss();
  }
}
