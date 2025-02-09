import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Task } from '../models/task';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TaskService } from '../services/task.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-edit-task-dialog',
  imports: [
    ReactiveFormsModule,
    DynamicDialogModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    FloatLabelModule,
    SelectModule,
    DatePickerModule,
    TextareaModule,
  ],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.css'
})
export class EditTaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  statuses: any[] = [];
  priorities: any[] = [];
  task!: Task;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.statuses = this.config.data?.statuses || [];
    this.priorities = this.config.data?.priorities || [];

    if (this.config.data?.task) {
      this.task = { ...this.config.data.task };

      this.taskForm = this.fb.group({
        name: [this.task.name, Validators.required],
        status: [this.task.status, Validators.required],
        priority: [this.task.priority, Validators.required],
        dueDate: [this.task.dueDate, Validators.required],
        description: [this.task.description, Validators.required],
      });
    }

    console.log(this.task)
  }

  editTask() {
    if (this.taskForm.valid) {
      //console.log(this.taskForm.value);
      this.taskService.editTask(this.taskForm.value, this.task.id).subscribe(updatedTask => {
        this.ref.close(updatedTask);
      });
    }
  }

  cancel() {
    this.ref.close();
  }

}
