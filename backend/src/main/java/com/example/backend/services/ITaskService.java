package com.example.backend.services;

import com.example.backend.entities.Task;

import java.util.List;
import java.util.Optional;

public interface ITaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails);
    void deleteTask(Long id);
    Task markAsCompleted (Long id);
    Task markAsIncomplete (Long id);

}
