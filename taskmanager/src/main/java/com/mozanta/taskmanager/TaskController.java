package com.mozanta.taskmanager;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TaskController{

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/")
    public List<Tasks> GetTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tasks GetTasks(@PathVariable String id){
        return taskRepository.findById(id).orElse(null);
    }
    @PostMapping("/")
    public Tasks postMethodName(@RequestBody Tasks tasks){
        return taskRepository.save(tasks);
    }
    @PutMapping("/")
    public Tasks PutMapping(@RequestBody Tasks newTasks){
        Tasks oldTasks = taskRepository.findById(newTasks.getId()).orElse(null);
        oldTasks.setTask(newTasks.getTask());
        taskRepository.save(oldTasks);
        return oldTasks;
    }
    @DeleteMapping("/{id}")
    public String DeleteTask(@PathVariable String id){
    taskRepository.deleteById(id);
    return id;

    }
}