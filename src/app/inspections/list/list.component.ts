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
        // Apply random sorting to ensure consistent UI/UX across all data operations
        // This includes initial load, search, filtering, and pagination
        this.inspections = this.shuffleArray([...data]);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading inspections:', error);
        this.loading = false;

        // Handle search errors gracefully
        if (error.status === 500 && filters.q) {
          console.warn(
            'Search functionality temporarily unavailable. Please try again or use other filters.'
          );
          // You could show a user-friendly message here
        }
      },
    });
  }

  /**
   * Shuffles an array using the Fisher-Yates algorithm for true randomization
   * This ensures cards are displayed in a random order for consistent UI/UX
   * Works across all data operations: initial load, search, filtering, and pagination
   *
   * @param array - The array to shuffle
   * @returns A new shuffled array (original array is not modified)
   */
  private shuffleArray<T>(array: T[]): T[] {
    // Return empty array if input is empty or null
    if (!array || array.length === 0) {
      return [];
    }

    // Create a copy to avoid mutating the original array
    const shuffled = [...array];

    // Fisher-Yates shuffle algorithm - O(n) time complexity
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
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
