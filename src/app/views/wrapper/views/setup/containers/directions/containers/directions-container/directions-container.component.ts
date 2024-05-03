import { Component } from '@angular/core';
import { IDirections } from '../../models/directions.model';
import { DirectionsService } from '../../services/direction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DirectionsCreateComponent } from '../../components/directions-create/directions-create.component';
import { DirectionsDeleteComponent } from '../../components/directions-delete/directions-delete.component';

@Component({
  selector: 'app-directions-container',
  templateUrl: './directions-container.component.html',
  styleUrl: './directions-container.component.scss',
})
export class DirectionsContainerComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  tableResponse: IDirections[] = [];
  loading = false;

  constructor(
    private _DirectionsService: DirectionsService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._DirectionsService
      .getViewDirectionsByPagination(this.pagination)
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
    const dialog = this._NgbModal.open(DirectionsCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(direction: IDirections) {
    const dialog = this._NgbModal.open(DirectionsCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      direction: direction,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(DirectionsDeleteComponent, {
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
