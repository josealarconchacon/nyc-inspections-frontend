import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { InspectionsService } from '../../services/inspections.service';
import { InspectionFiltersService } from '../../services/filters/inspection-filters.service';
import { Inspection, InspectionFilters } from '../../models/inspection.model';

// Import child components
import { InspectionFiltersComponent } from './components/filters/filters.component';
import { InspectionPaginationComponent } from './components/pagination/pagination.component';
import { InspectionCardComponent } from './components/inspection-card/inspection-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataComponent } from './components/no-data/no-data.component';

@Component({
  selector: 'app-inspections-list',
  standalone: true,
  imports: [
    CommonModule,
    InspectionFiltersComponent,
    InspectionPaginationComponent,
    InspectionCardComponent,
    LoadingComponent,
    NoDataComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class InspectionsListComponent implements OnInit, OnDestroy {
  inspections: Inspection[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private inspectionsService: InspectionsService,
    private filtersService: InspectionFiltersService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to filter changes and load data when filters change
    combineLatest([this.filtersService.filters$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filters]) => {
        this.load(filters);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private load(filters: InspectionFilters) {
    this.loading = true;
    this.inspectionsService.list(filters).subscribe({
      next: (data) => {
        this.inspections = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading inspections:', error);
        this.loading = false;
      },
    });
  }

  onViewDetails(inspection: Inspection) {
    // Navigate to detail page - for now just log, but you can implement routing
    console.log('Viewing details for:', inspection.dba);
    // this.router.navigate(['/inspections', inspection.camis]);
  }

  trackByInspection(index: number, inspection: Inspection): string {
    return inspection.camis;
  }
}
