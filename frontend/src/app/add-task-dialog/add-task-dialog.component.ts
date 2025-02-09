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
  selector: 'app-add-task-dialog',
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
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  statuses: any[] = [];
  priorities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.statuses = this.config.data?.statuses || [];
    this.priorities = this.config.data?.priorities || [];

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      status: [null, Validators.required],
      priority: [null, Validators.required],
      dueDate: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        name: this.taskForm.value.name,
        status: this.taskForm.value.status,
        priority: this.taskForm.value.priority,
        createdAt: new Date(),
        dueDate: this.taskForm.value.dueDate,
        description: this.taskForm.value.description
      };
      this.taskService.addTask(newTask).subscribe(
        res => {
          console.log("success !")
        }
      )

      this.ref.close(newTask);
    }
  }

  cancel() {
    this.ref.close();
  }

}
