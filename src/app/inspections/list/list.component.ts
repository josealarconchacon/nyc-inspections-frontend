import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { InspectionsService } from '../../services/inspections.service';
import { InspectionFiltersService } from '../../services/filters/inspection-filters.service';
import { Inspection, InspectionFilters } from '../../models/inspection.model';
import { InspectionFiltersComponent } from './components/filters/filters.component';
import { InspectionPaginationComponent } from './components/pagination/pagination.component';
import { InspectionCardComponent } from './components/inspection-card/inspection-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { DetailComponent } from './components/detail/detail.component';

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
    DetailComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class InspectionsListComponent implements OnInit, OnDestroy {
  inspections: Inspection[] = [];
  loading = false;
  selectedInspection: Inspection | null = null;
  isDetailVisible = false;
  private destroy$ = new Subject<void>();

  constructor(
    private inspectionsService: InspectionsService,
    private filtersService: InspectionFiltersService,
    private router: Router
  ) {}

  ngOnInit() {
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
        // Apply random sorting
        // Includes initial load, search, filtering, and pagination
        this.inspections = this.shuffleArray([...data]);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading inspections:', error);
        this.loading = false;

        if (error.status === 500 && filters.q) {
          console.warn(
            'Search functionality temporarily unavailable. Please try again or use other filters.'
          );
          // message here
        }
      },
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    // return empty array if input is empty or null
    if (!array || array.length === 0) {
      return [];
    }

    // copy original array to avoid mutation
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  onViewDetails(inspection: Inspection) {
    this.selectedInspection = inspection;
    this.isDetailVisible = true;
    console.log('Viewing details for:', inspection.dba);
  }

  onCloseDetail() {
    this.isDetailVisible = false;
    this.selectedInspection = null;
  }

  trackByInspection(index: number, inspection: Inspection): string {
    return inspection.camis;
  }
}
