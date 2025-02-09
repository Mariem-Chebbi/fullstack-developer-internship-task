import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details-task-dialog',
  imports: [CommonModule, DialogModule, ButtonModule, DynamicDialogModule],
  templateUrl: './details-task-dialog.component.html',
  styleUrl: './details-task-dialog.component.css'
})
export class DetailsTaskDialogComponent {
  task: any;
  visible: boolean = false;

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,) {
    this.task = { ...this.config.data.task };

  }

  hideDialog() {
    this.ref.close();
  }
}
