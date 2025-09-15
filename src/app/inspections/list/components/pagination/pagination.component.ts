import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { InspectionFiltersService } from '../../../../services/filters/inspection-filters.service';
import { InspectionFilters } from '../../../../models/inspection.model';

@Component({
  selector: 'app-inspection-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class InspectionPaginationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filters = {
    limit: 25,
    offset: 0,
  };

  Math = Math;

  constructor(private filtersService: InspectionFiltersService) {}

  ngOnInit() {
    this.filtersService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters: InspectionFilters) => {
        this.filters = {
          limit: filters.limit,
          offset: filters.offset,
        };
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNext() {
    this.filtersService.nextPage();
  }

  onPrev() {
    this.filtersService.previousPage();
  }
}
