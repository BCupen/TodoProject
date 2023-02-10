import {format, parseISO, isBefore, isAfter} from 'date-fns';

const tasks = (()=>{
    let taskList = [];

    const task = (title, description, dueDate, priority, projectIndex, completed)=>{
        return {title, description, dueDate, priority, projectIndex};
    };

    function sendToLocalStorage(){
        const tasksObject = {taskList};
        localStorage.setItem('tasks', JSON.stringify(tasksObject));
    }


    function initializeTaskList(){
        const tasksObject =  JSON.parse(localStorage.getItem('tasks'));
        if(tasksObject != null)
            taskList = tasksObject.taskList;
    }

    function addTask(title, dueDate, description, priority, projectIndex, completed = false){
        if(description == ''){
            description = `(no description)`;
        }
            
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, projectIndex, completed);
        taskList.unshift(newTask);

        sendToLocalStorage();
    }

    function getTasks(filter, projectIndex=-1){
        if(filter == 'All'){
            if(projectIndex == -1)
                return taskList;
            else return taskList.filter(task => task.projectIndex == projectIndex);
        }
        if(filter == 'Today'){
            const today = format(new Date(), 'yyyy-MM-dd');
            const todaysTasks = taskList.filter(task => task.dueDate == today);
            return todaysTasks;
        }
        if(filter == 'Upcoming'){
            const today = new Date();
            const nextWeek = format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), 'yyyy-MM-dd');
            const upcomingTasks = taskList.filter(task => isBefore(parseISO(task.dueDate), parseISO(nextWeek)));
            return upcomingTasks;
        }
    }

    function getTaskByIndex(taskIndex){
        if(taskIndex >= 0)
            return taskList[taskIndex];
        return null;
    }

    //if a project is deleted, update all tasks that were assigned to that project
    function editTasksProjects(pIndex){
        for(let [i, task] of taskList.entries()){
            console.log(task.projectIndex)
            if(task.projectIndex == pIndex){
                task.projectIndex = -1;
                taskList[i] = task;
            }else if(task.projectIndex > pIndex){
                task.projectIndex -= 1;
                taskList[i] = task;
            }
        }

        sendToLocalStorage();
    }

    function editTask(taskIndex, title, dueDate, description, priority, projectIndex, completed=false){
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, projectIndex, completed);
        taskList[taskIndex] = newTask;
        sendToLocalStorage();
    }

    function deleteTaskByIndex(taskIndex){
        taskList.splice(taskIndex, 1);
        sendToLocalStorage();
    }

    function completeTask(taskIndex){
        taskList[taskIndex].completed = true;
        const completedTask = taskList.splice(taskIndex, 1);
        taskList.push(completedTask[0]);
        sendToLocalStorage()
    }

    function  incompleteTask(taskIndex){
        taskList[taskIndex].completed =  false;
        sendToLocalStorage();
    }

    return {initializeTaskList, addTask, getTasks, getTaskByIndex, editTasksProjects, editTask, deleteTaskByIndex, completeTask, incompleteTask}
})();

export default tasks;