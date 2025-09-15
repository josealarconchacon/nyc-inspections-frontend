import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InspectionFilters } from '../../models/inspection.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionFiltersService {
  private filtersSubject = new BehaviorSubject<InspectionFilters>({
    limit: 25,
    offset: 0,
    borough: '',
    q: '',
    cuisine_description: '',
  });

  public filters$: Observable<InspectionFilters> =
    this.filtersSubject.asObservable();

  get filters(): InspectionFilters {
    return this.filtersSubject.value;
  }

  updateFilters(partialFilters: Partial<InspectionFilters>): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({ ...currentFilters, ...partialFilters });
  }

  resetPagination(): void {
    this.updateFilters({ offset: 0 });
  }

  nextPage(): void {
    const currentFilters = this.filtersSubject.value;
    this.updateFilters({
      offset: currentFilters.offset + currentFilters.limit,
    });
  }

  previousPage(): void {
    const currentFilters = this.filtersSubject.value;
    const newOffset = Math.max(0, currentFilters.offset - currentFilters.limit);
    this.updateFilters({ offset: newOffset });
  }

  resetFilters(): void {
    this.filtersSubject.next({
      limit: 25,
      offset: 0,
      borough: '',
      q: '',
      cuisine_description: '',
    });
  }
}
