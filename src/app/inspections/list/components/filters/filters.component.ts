import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { InspectionFiltersService } from '../../../../services/filters/inspection-filters.service';
import { InspectionFilters } from '../../../../models/inspection.model';

@Component({
  selector: 'app-inspection-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
})
export class InspectionFiltersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();
  private cuisineSubject$ = new Subject<string>();

  filters = {
    q: '',
    borough: '',
    cuisine_description: '',
  };

  constructor(private filtersService: InspectionFiltersService) {}

  ngOnInit() {
    // Subscribe to filter changes and update local state
    this.filtersService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters: InspectionFilters) => {
        this.filters = {
          q: filters.q,
          borough: filters.borough,
          cuisine_description: filters.cuisine_description,
        };
      });

    // Set up debounced search
    this.searchSubject$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm: string) => {
        this.filtersService.updateFilters({
          q: searchTerm,
          offset: 0,
        });
      });

    // Set up debounced cuisine filter
    this.cuisineSubject$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((cuisine: string) => {
        this.filtersService.updateFilters({
          cuisine_description: cuisine,
          offset: 0,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject$.complete();
    this.cuisineSubject$.complete();
  }

  onSearchChange() {
    this.searchSubject$.next(this.filters.q.trim());
  }

  onBoroughChange() {
    this.filtersService.updateFilters({
      borough: this.filters.borough,
      offset: 0, // Reset to first page when filtering
    });
  }

  onCuisineChange() {
    this.cuisineSubject$.next(this.filters.cuisine_description.trim());
  }

  clearFilters() {
    this.filtersService.resetFilters();
  }

  clearSearch() {
    this.filters.q = '';
    this.onSearchChange();
  }

  clearCuisine() {
    this.filters.cuisine_description = '';
    this.onCuisineChange();
  }
}
