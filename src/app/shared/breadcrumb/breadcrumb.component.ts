import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input() breadcrumbArray: string[] = [];
}
