import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../../../../../constants/constants';
import {
  SingleGovernment,
  ViewGovernment,
} from '../../models/government.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GovernmentCreateModalComponent } from './components/government-create/government-create-modal.component';
import { LocationService } from '../../../../services/location.service';
import { GovernmentDeleteComponent } from './components/government-delete/government-delete.component';

@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrl: './government.component.scss',
})
export class GovernmentComponent implements OnInit {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  governmentTableResponse: SingleGovernment[] = [];
  loading = false;

  constructor(
    private _LocationService: LocationService,
    private _NgbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._LocationService.getViewGoverByPagination(this.pagination).subscribe(
      (response: ViewGovernment) => {
        this.governmentTableResponse = response.data;
        // TODO: Test no data
        // this.governmentTableResponse = [];
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  createGovernment() {
    const dialog = this._NgbModal.open(GovernmentCreateModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      simpleListMethod: () => this.getAll,
      previous: '',
      modalName: 'المحافظة',
      modalType: 1,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(govern: SingleGovernment) {
    const dialog = this._NgbModal.open(GovernmentCreateModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      govern: govern,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(GovernmentDeleteComponent, {
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

  changePage() {
    this.pagination.pageNum = this.page;
    this.getAll();
  }
}
