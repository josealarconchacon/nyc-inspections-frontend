import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Inspection } from '../../../../models/inspection.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inspection: Inspection | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Prevent body scroll when modal is open (browser only)
    if (this.isBrowser && this.isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy() {
    // Restore body scroll (browser only)
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  ngOnChanges() {
    // Handle body scroll when visibility changes (browser only)
    if (this.isBrowser) {
      if (this.isVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.isBrowser && this.isVisible && event.key === 'Escape') {
      this.onClose();
    }
  }

  onClose() {
    // Restore body scroll (browser only)
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  getScoreStatus(score: string): string {
    const numScore = parseInt(score);
    if (numScore <= 13) return 'Excellent';
    if (numScore <= 27) return 'Good';
    if (numScore <= 40) return 'Fair';
    return 'Needs Improvement';
  }
}
