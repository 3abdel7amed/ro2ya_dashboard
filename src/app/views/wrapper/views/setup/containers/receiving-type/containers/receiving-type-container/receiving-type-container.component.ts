import { Component, OnInit } from '@angular/core';
import { IReceivingType } from '../../models/receiving-type.model';
import { ReceivingTypeService } from '../../services/receiving-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReceivingTypeCreateComponent } from '../../components/receiving-type-create/receiving-type-create.component';
import { ReceivingTypeDeleteComponent } from '../../components/receiving-type-delete/receiving-type-delete.component';

@Component({
  selector: 'app-receiving-type-container',
  templateUrl: './receiving-type-container.component.html',
  styleUrl: './receiving-type-container.component.scss',
})
export class ReceivingTypeContainerComponent implements OnInit {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IReceivingType[] = [];
  loading = false;

  constructor(
    private _ReceivingTypeService: ReceivingTypeService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._ReceivingTypeService
      .getViewReceivingTypeByPagination(this.pagination)
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
    const dialog = this._NgbModal.open(ReceivingTypeCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(data: IReceivingType) {
    const dialog = this._NgbModal.open(ReceivingTypeCreateComponent, {
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
    const dialog = this._NgbModal.open(ReceivingTypeDeleteComponent, {
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
