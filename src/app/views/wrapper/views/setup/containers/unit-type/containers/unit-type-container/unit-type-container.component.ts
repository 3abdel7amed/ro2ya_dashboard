import { Component, OnInit } from '@angular/core';
import { IUnitType } from '../../models/unit-type.model';
import { UnitTypeService } from '../../services/unit-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitTypeCreateComponent } from '../../components/unit-type-create/unit-type-create.component';
import { UnitTypeDeleteComponent } from '../../components/unit-type-delete/unit-type-delete.component';

@Component({
  selector: 'app-unit-type-container',
  templateUrl: './unit-type-container.component.html',
  styleUrl: './unit-type-container.component.scss',
})
export class UnitTypeContainerComponent implements OnInit {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IUnitType[] = [];
  loading = false;

  constructor(
    private _UnitTypeService: UnitTypeService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._UnitTypeService
      .getViewUnitTypeByPagination(this.pagination)
      .subscribe(
        (response) => {
          this.tableResponse = response.data;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  create() {
    const dialog = this._NgbModal.open(UnitTypeCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(data: IUnitType) {
    const dialog = this._NgbModal.open(UnitTypeCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      data: data,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(UnitTypeDeleteComponent, {
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
}
