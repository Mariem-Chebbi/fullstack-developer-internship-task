import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TaskService } from '../services/task.service';
import { PrimeNG } from 'primeng/config';
import { CalendarModule } from 'primeng/calendar';
import { Task } from '../models/task';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { DetailsTaskDialogComponent } from '../details-task-dialog/details-task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: true,
  imports: [
    TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, SliderModule, DropdownModule,
    FormsModule, ProgressBarModule, ButtonModule, CalendarModule, ToastModule, ToggleSwitchModule, ConfirmPopupModule],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];

  task!: Task;

  ref!: DynamicDialogRef;

  representatives!: any[];

  formattedStatuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  globalFilter: string = '';

  statuses: any[] = [];

  priorities: any[] = [];


  constructor(
    private taskService: TaskService,
    private primeng: PrimeNG,
    private dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) { }

  ngOnInit() {
    this.primeng.ripple.set(true);

    this.getListTasks();

    this.statuses = [
      { label: 'To Do', value: 'TO_DO' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
      { label: 'Completed', value: 'COMPLETED' },
      { label: 'Overdue', value: 'OVERDUE' },
    ]

    this.priorities = [
      { label: 'High', value: 'HIGH' },
      { label: 'Medium', value: 'MEDIUM' },
      { label: 'Low', value: 'LOW' }
    ]
  }

  getListTasks() {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: new Date(task.dueDate)
        }));
      }
    )
  }

  clear(table: Table) {
    table.clear();
  }

  getStatus(status: string | null): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    if (!status) return 'secondary'; // Default to 'secondary' if no status is provided
    switch (this.formatEnum(status)) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warn';
      case 'To Do':
        return 'info';
      case 'Overdue':
        return 'danger';
      default:
        return 'secondary'; // Return 'secondary' as a fallback
    }
  }

  formatEnum(value: string): string {
    return value
      .toLowerCase()
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters
  }

  getPriorityClass(priority: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (this.formatEnum(priority.toLowerCase())) {
      case 'High':
        return 'danger'; // Classe CSS pour une priorité haute
      case 'Medium':
        return 'warn'; // Classe CSS pour une priorité moyenne
      case 'Low':
        return 'success'; // Classe CSS pour une priorité basse
      default:
        return 'secondary'; // Classe par défaut
    }
  }

  openNewTask() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add New Task',
      width: '400px',
      modal: true,
      data: {
        statuses: this.statuses,
        priorities: this.priorities
      }
    });

    this.ref.onClose.subscribe((newTask: any) => {
      if (newTask) {
        this.tasks = [...this.tasks, newTask];
        this.messageService.add({ severity: 'info', summary: 'Task Added succefully', detail: newTask.name });
        setTimeout(() => {
          this.getListTasks();
        }, 500);
      }
    });
  }


  confirmDeletion(event: Event, taskId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.deleteTask(taskId);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Task deleted', life: 3000 });
      },
      reject: () => {
        this.getListTasks();
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.getListTasks();
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }

  isTaskCompleted(task: Task): boolean {
    return task.status === 'COMPLETED';
  }

  onToggleChange(event: any, task: Task) {
    const isChecked = event.checked;
    if (isChecked) {
      this.taskService.markAsCompleted(task.id).subscribe({
        next: () => {
          task.status = 'COMPLETED';
          this.messageService.add({
            severity: 'success',
            summary: 'Task Completed',
            detail: `Task "${task.name}" marked as completed.`,
          });
        },
        error: (err) => {
          console.error('Error marking task as completed:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to mark task as completed.',
          });
        },
      });
    } else {
      this.taskService.markAsIncomplete(task.id).subscribe({
        next: () => {
          task.status = 'IN_PROGRESS'; // or 'IN_PROGRESS', depending on your logic
          this.messageService.add({
            severity: 'info',
            summary: 'Task Incomplete',
            detail: `Task "${task.name}" marked as incomplete.`,
          });
        },
        error: (err) => {
          console.error('Error marking task as incomplete:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to mark task as incomplete.',
          });
        },
      });
    }
  }

  openEditTaskDialog(task: Task) {
    this.ref = this.dialogService.open(EditTaskDialogComponent, {
      header: 'Edit Task',
      width: '400px',
      modal: true,
      data: {
        task,
        statuses: this.statuses,
        priorities: this.priorities
      }
    });

    this.ref.onClose.subscribe((updatedTask: Task) => {
      if (updatedTask) {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      }
    });
  }

  viewTaskDetails(task: Task) {
    this.ref = this.dialogService.open(DetailsTaskDialogComponent, {
      data: { task },
      header: 'Task Details',
      width: '30%',
      modal: true
    });
  }





}