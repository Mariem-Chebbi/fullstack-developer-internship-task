package com.example.backend.services;

import com.example.backend.entities.Task;
import com.example.backend.entities.TaskStatus;
import com.example.backend.repositories.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements ITaskService {
    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setName(taskDetails.getName());
            task.setPriority(taskDetails.getPriority());
            task.setStatus(taskDetails.getStatus());
            task.setDescription(taskDetails.getDescription());
            task.setDueDate(taskDetails.getDueDate());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task markAsCompleted(Long id) {
        return taskRepository.findById(id).map(task -> {
                    task.setStatus(TaskStatus.COMPLETED);
                    return taskRepository.save(task);
                }
        ).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public Task markAsIncomplete(Long id) {
        return taskRepository.findById(id).map(task -> {
                    task.setStatus(TaskStatus.IN_PROGRESS);
                    return taskRepository.save(task);
                }
        ).orElseThrow(() -> new RuntimeException("Task not found"));
    }
}
