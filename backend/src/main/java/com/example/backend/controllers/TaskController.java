package com.example.backend.controllers;

import com.example.backend.entities.Task;
import com.example.backend.services.ITaskService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    private final ITaskService taskService;

    @Operation(summary = "Get all tasks", description = "Returns a list of all tasks.")
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @Operation(summary = "Get task by ID", description = "Finds a task by its ID.")
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new task", description = "Adds a new task to the system.")
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @Operation(summary = "Update a task", description = "Modifies an existing task by ID.")
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return ResponseEntity.ok(taskService.updateTask(id, taskDetails));
    }

    @Operation(summary = "Delete a task", description = "Removes a task by ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update a task's Status as completed", description = "Update an existing task as completed.")
    @PutMapping("/completed/{id}")
    public ResponseEntity<Task> markAsCompleted(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.markAsCompleted(id));
    }

    @Operation(summary = "Update a task's Status as incomplete", description = "Update an existing task as incomplete.")
    @PutMapping("/incomplete/{id}")
    public ResponseEntity<Task> markAsIncomplete(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.markAsIncomplete(id));
    }
}

