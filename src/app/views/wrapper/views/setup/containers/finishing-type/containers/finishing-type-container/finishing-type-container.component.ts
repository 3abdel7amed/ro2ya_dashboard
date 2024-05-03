import { Component } from '@angular/core';
import { IFinishing } from '../../models/finihsing-type.model';
import { FinishingTypeService } from '../../services/finishing-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinishingTypeCreateComponent } from '../../components/finishing-type-create/finishing-type-create.component';
import { FinishingTypeDeleteComponent } from '../../components/finishing-type-delete/finishing-type-delete.component';

@Component({
  selector: 'app-finishing-type-container',
  templateUrl: './finishing-type-container.component.html',
  styleUrl: './finishing-type-container.component.scss',
})
export class FinishingTypeContainerComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IFinishing[] = [];
  loading = false;

  constructor(
    private _FinishingTypeService: FinishingTypeService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._FinishingTypeService
      .getViewFinishingByPagination(this.pagination)
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
    const dialog = this._NgbModal.open(FinishingTypeCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(floor: IFinishing) {
    const dialog = this._NgbModal.open(FinishingTypeCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      floor: floor,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(FinishingTypeDeleteComponent, {
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
