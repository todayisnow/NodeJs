// to inject the service as a dependancy
import { Injectable } from "@angular/core";
//to make requests and manibulate the headers
import { Http, Headers } from "@angular/http";
//get the request and send the data as an opservable .. map operator .. "rxjs" reacticve extention for javascript
import "rxjs/add/operator/map";

//to use the injectable we need to add the decorator
@Injectable()
export class TaskService {
    //injecting the http to constractor
    constructor(private http: Http) {
        console.log("Task Service Initialized...");
    }
    getTasks() {
        return this.http.get("/api/tasks").map(res => res.json());//http://localhost:3000/api/tasks/ if we are in other domain

    }
    addTask(newTask:any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), { headers })
            .map(res => res.json());
    }
    deleteTask(id:any) {
        
        return this.http.delete('/api/task/'+id)
            .map(res => res.json());
    }
    updateStatus(task: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/' + task._id, JSON.stringify(task), { headers })
            .map(res => res.json());
    }
}