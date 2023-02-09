import {format, parseISO, isBefore} from 'date-fns';

const tasks = (()=>{
    let taskList = [];

    const task = (title, description, dueDate, priority, projectIndex)=>{
        return {title, description, dueDate, priority, projectIndex};
    };

    function addTask(title, dueDate, description, priority, projectIndex){
        if(description == ''){
            description = `(no description)`;
        }
            
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, projectIndex);
        taskList.unshift(newTask);
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
    }

    function editTask(taskIndex, title, dueDate, description, priority, projectIndex){
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, projectIndex);
        taskList[taskIndex] = newTask;
    }

    return {addTask, getTasks, getTaskByIndex, editTasksProjects, editTask}
})();

export default tasks;