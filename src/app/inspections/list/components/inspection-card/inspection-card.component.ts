import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inspection } from '../../../../models/inspection.model';

@Component({
  selector: 'app-inspection-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspection-card.component.html',
  styleUrl: './inspection-card.component.scss',
})
export class InspectionCardComponent {
  @Input() inspection!: Inspection;
  @Output() viewDetails = new EventEmitter<Inspection>();

  onViewDetails() {
    this.viewDetails.emit(this.inspection);
  }
}
