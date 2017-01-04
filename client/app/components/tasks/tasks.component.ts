
import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service"
import {Task} from "../../../Task";
@Component({
    //for relative path to be viewd
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})
export class TasksComponent {
    tasks: Task[];
    title: string;

    //injecting the service
    constructor(private taskService: TaskService) {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks =tasks
        });
    }

    addTask(event:any) {
        event.preventDefault();
        var newTask= {
            title: this.title,
            isDone:false
        }
        this.taskService.addTask(newTask).subscribe(Task => {
            this.tasks.push(Task);
            this.title = "";
        });
        {
            
        }

    }
    deleteTask(id: any) {
        
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id ){
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }

    updateStatus(task: any) {
        var uTask = {
            title: task.title,
            isDone: !task.isDone,
            _id:task._id
        };
        
        this.taskService.updateStatus(uTask).subscribe(task => {
            task.isDone = !task.isDone;
        });
        {

        }

    }
}
