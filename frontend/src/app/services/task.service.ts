import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8083/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(this.apiUrl, task);
  }

  editTask(task: Task, id:any): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, task);
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }

  markAsCompleted(taskId: any): Observable<void> {
    const url = `${this.apiUrl}/completed/${taskId}`;
    return this.http.put<void>(url, null);
  }

  markAsIncomplete(taskId: any): Observable<void> {
    const url = `${this.apiUrl}/incomplete/${taskId}`;
    return this.http.put<void>(url, null);
  }
}
