import { Component } from '@angular/core';
import { IUnit } from '../../model/unit.model';
import { UnitService } from '../../services/unit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnitCreateDialogComponent } from '../../components/unit-create-dialog/unit-create-dialog.component';
import { UnitDeleteDialogComponent } from '../../components/unit-delete-dialog/unit-delete-dialog.component';
import { UnitShowDialogComponent } from '../../components/unit-show-dialog/unit-show-dialog.component';

@Component({
  selector: 'app-create-unit-container',
  templateUrl: './create-unit-container.component.html',
  styleUrl: './create-unit-container.component.scss',
})
export class CreateUnitContainerComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IUnit[] = [];
  loading = false;

  constructor(private _UnitService: UnitService, private _NgbModal: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._UnitService.getViewUnitByPagination(this.pagination).subscribe(
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
    const dialog = this._NgbModal.open(UnitCreateDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(data: IUnit) {
    const dialog = this._NgbModal.open(UnitCreateDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      data: data,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openShowDialog(data: IUnit) {
    const dialog = this._NgbModal.open(UnitShowDialogComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = data;
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(UnitDeleteDialogComponent, {
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
