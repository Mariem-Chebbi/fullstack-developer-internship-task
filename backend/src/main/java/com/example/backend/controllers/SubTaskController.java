package com.example.backend.controllers;

import com.example.backend.entities.SubTask;
import com.example.backend.services.ISubTaskService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subtasks")
@RequiredArgsConstructor
public class SubTaskController {
    private final ISubTaskService subTaskService;

    @Operation(summary = "Get all subtasks", description = "Retrieve a list of all subtasks.")
    @GetMapping
    public ResponseEntity<List<SubTask>> getAllSubTasks() {
        return ResponseEntity.ok(subTaskService.getAllSubTasks());
    }

    @Operation(summary = "Get subtask by ID", description = "Find a subtask by its unique ID.")
    @GetMapping("/{id}")
    public ResponseEntity<SubTask> getSubTaskById(@PathVariable Long id) {
        Optional<SubTask> subTask = subTaskService.getSubTaskById(id);
        return subTask.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create a new subtask", description = "Add a new subtask to an existing task.")
    @PostMapping
    public ResponseEntity<SubTask> createSubTask(@RequestBody SubTask subTask) {
        return ResponseEntity.ok(subTaskService.createSubTask(subTask));
    }

    @Operation(summary = "Update a subtask", description = "Modify an existing subtask by ID.")
    @PutMapping("/{id}")
    public ResponseEntity<SubTask> updateSubTask(@PathVariable Long id, @RequestBody SubTask subTaskDetails) {
        return ResponseEntity.ok(subTaskService.updateSubTask(id, subTaskDetails));
    }

    @Operation(summary = "Delete a subtask", description = "Remove a subtask by ID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubTask(@PathVariable Long id) {
        subTaskService.deleteSubTask(id);
        return ResponseEntity.noContent().build();
    }
}

