import {format, parseISO, isBefore} from 'date-fns';

const tasks = (()=>{
    let taskList = [];

    const task = (title, description, dueDate, priority, projectIndex)=>{
        return {title, description, dueDate, priority, projectIndex};
    };

    function addTask(title, dueDate, description, priority, projectIndex){
        if(description == '')
            description = `(no description)`;
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, projectIndex);
        taskList.unshift(newTask);
    }

    function getTasks(filter, projectIndex=-1){
        if(filter == 'All')
            return taskList;
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

    return {addTask, getTasks}
})();

export default tasks;