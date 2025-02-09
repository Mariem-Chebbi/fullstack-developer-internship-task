package com.example.backend.services;

import com.example.backend.entities.SubTask;

import java.util.List;
import java.util.Optional;

public interface ISubTaskService {
    List<SubTask> getAllSubTasks();
    Optional<SubTask> getSubTaskById(Long id);
    SubTask createSubTask(SubTask subTask);
    SubTask updateSubTask(Long id, SubTask subTaskDetails);
    void deleteSubTask(Long id);
}
