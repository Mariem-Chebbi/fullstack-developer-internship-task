package com.example.backend.services;

import com.example.backend.entities.SubTask;
import com.example.backend.repositories.SubTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubTaskServiceImpl implements ISubTaskService {
    private final SubTaskRepository subTaskRepository;

    public List<SubTask> getAllSubTasks() {
        return subTaskRepository.findAll();
    }

    public Optional<SubTask> getSubTaskById(Long id) {
        return subTaskRepository.findById(id);
    }

    public SubTask createSubTask(SubTask subTask) {
        return subTaskRepository.save(subTask);
    }

    public SubTask updateSubTask(Long id, SubTask subTaskDetails) {
        return subTaskRepository.findById(id).map(subTask -> {
            subTask.setName(subTaskDetails.getName());
            subTask.setCompleted(subTaskDetails.isCompleted());
            return subTaskRepository.save(subTask);
        }).orElseThrow(() -> new RuntimeException("SubTask not found"));
    }

    public void deleteSubTask(Long id) {
        subTaskRepository.deleteById(id);
    }
}

