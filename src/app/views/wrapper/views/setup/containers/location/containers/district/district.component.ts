import { Component } from '@angular/core';
import { IDistrict, IDistrictResponse } from '../../models/district.model';
import { Subscription } from 'rxjs';
import { DistrictService } from '../../services/district.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistrictCreateComponent } from './components/district-create/district-create.component';
import { DistrictUpdateComponent } from './components/district-update/district-update.component';
import { DistrictDeleteComponent } from './components/district-delete/district-delete.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss',
})
export class DistrictComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  response: IDistrict[] = [];
  loading = false;
  getAllSubscription: Subscription = new Subscription();

  constructor(
    private _DistrictService: DistrictService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.getAllSubscription = this._DistrictService
      .getViewDistrictByPagination(this.pagination)
      .subscribe(
        (response: IDistrictResponse) => {
          this.response = response.data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  create() {
    const dialog = this._NgbModal.open(DistrictCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(district: IDistrict) {
    const dialog = this._NgbModal.open(DistrictUpdateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      district: district,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(DistrictDeleteComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      id: id,
      name: name,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  changePage(page: number) {
    this.pagination.pageNum = page;
    this.getAll();
  }

  ngOnDestroy(): void {
    this.getAllSubscription.unsubscribe();
  }
}
