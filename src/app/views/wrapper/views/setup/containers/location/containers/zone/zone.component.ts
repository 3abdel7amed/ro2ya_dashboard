import { Component } from '@angular/core';
import { IZone, IZoneResponse } from '../../models/zone.model';
import { Subscription } from 'rxjs';
import { ZoneService } from '../../services/zone.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ZoneCreateComponent } from './components/zone-create/zone-create.component';
import { ZoneUpdateComponent } from './components/zone-update/zone-update.component';
import { ZoneDeleteComponent } from './components/zone-delete/zone-delete.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss',
})
export class ZoneComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  response: IZone[] = [];
  loading = false;
  getAllSubscription: Subscription = new Subscription();

  constructor(private _ZoneService: ZoneService, private _NgbModal: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.getAllSubscription = this._ZoneService
      .getViewZoneByPagination(this.pagination)
      .subscribe(
        (response: IZoneResponse) => {
          this.response = response.data;
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

  create() {
    const dialog = this._NgbModal.open(ZoneCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(zone: IZone) {
    const dialog = this._NgbModal.open(ZoneUpdateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      zone: zone,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(ZoneDeleteComponent, {
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
