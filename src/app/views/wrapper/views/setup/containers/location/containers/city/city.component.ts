import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICity, ICityResponse } from '../../models/city.model';
import { CityService } from '../../services/city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CityCreateComponent } from './components/city-create/city-create.component';
import { CityDeleteComponent } from './components/city-delete/city-delete.component';
import { Subscription } from 'rxjs';
import { UpdateCityComponent } from './components/update-city/update-city.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss',
})
export class CityComponent implements OnInit, OnDestroy {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  response: ICity[] = [];
  loading = false;
  getAllSubscription: Subscription = new Subscription();

  constructor(private _CityService: CityService, private _NgbModal: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.getAllSubscription = this._CityService
      .getViewCityByPagination(this.pagination)
      .subscribe(
        (response: ICityResponse) => {
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
    const dialog = this._NgbModal.open(CityCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {};

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(city: ICity) {
    const dialog = this._NgbModal.open(UpdateCityComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      city: city,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(CityDeleteComponent, {
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
