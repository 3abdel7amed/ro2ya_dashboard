import { Component } from '@angular/core';
import { IPlot, IPlotResponse } from '../../models/plot.models';
import { Subscription } from 'rxjs';
import { PlotService } from '../../services/plot.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlotCreateComponent } from './components/plot-create/plot-create.component';
import { PlotUpdateComponent } from './components/plot-update/plot-update.component';
import { PlotDeleteComponent } from './components/plot-delete/plot-delete.component';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrl: './plot.component.scss',
})
export class PlotComponent {
  page: number = 1;
  pagination = {
    pageNum: 1,
    pageLen: 10,
  };
  response: IPlot[] = [];
  loading = false;
  getAllSubscription: Subscription = new Subscription();

  constructor(private _PlotService: PlotService, private _NgbModal: NgbModal) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.getAllSubscription = this._PlotService
      .getViewPlotByPagination(this.pagination)
      .subscribe(
        (response: IPlotResponse) => {
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
    const dialog = this._NgbModal.open(PlotCreateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.closed.subscribe(() => this.getAll());
  }

  openEditDialog(plot: IPlot) {
    const dialog = this._NgbModal.open(PlotUpdateComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    dialog.componentInstance.data = {
      plot: plot,
    };
    dialog.closed.subscribe(() => this.getAll());
  }

  openDeleteConfirmDialog(id: number, name: string) {
    const dialog = this._NgbModal.open(PlotDeleteComponent, {
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
