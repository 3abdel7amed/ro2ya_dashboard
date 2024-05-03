import { Component } from '@angular/core';
import { IFloor } from '../../models/floor.model';
import { FloorService } from '../../services/floor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FloorCreateComponent } from '../../components/floor-create/floor-create.component';
import { FloorDeleteComponent } from '../../components/floor-delete/floor-delete.component';

@Component({
  selector: 'app-floor-container',
  templateUrl: './floor-container.component.html',
  styleUrl: './floor-container.component.scss',
})
export class FloorContainerComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IFloor[] = [];
  loading = false;

  constructor(
    private _FloorService: FloorService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._FloorService.getViewFloorByPagination(this.pagination).subscribe(
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
    const dialog = this._NgbModal.open(FloorCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(data: IFloor) {
    const dialog = this._NgbModal.open(FloorCreateComponent, {
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
    const dialog = this._NgbModal.open(FloorDeleteComponent, {
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
