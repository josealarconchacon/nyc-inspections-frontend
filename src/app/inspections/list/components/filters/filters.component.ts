import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange() {
    this.filtersService.updateFilters({
      q: this.filters.q,
      offset: 0, // Reset to first page when searching
    });
  }

  onBoroughChange() {
    this.filtersService.updateFilters({
      borough: this.filters.borough,
      offset: 0, // Reset to first page when filtering
    });
  }

  onCuisineChange() {
    this.filtersService.updateFilters({
      cuisine_description: this.filters.cuisine_description,
      offset: 0, // Reset to first page when filtering
    });
  }
}
