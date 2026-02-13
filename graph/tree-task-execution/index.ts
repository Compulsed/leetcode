
/*
    Problem:
    1. Execute tasks when all their dependencies have been executed

    Solution:
    1. Iterate through each task, attempting to run it
    2. When tasks have been completed, add them to the completed task set
    3. Maintain a dict of dependencies <taskIdReq, taskId>, when we remove
        from required deps we should see if we can now run it


    Methods:
    1. attemptExecute(taskId)
        1. If we have all the deps
            1. Run the function
            2. Add to the run list
        3. Attempt to run any other tasks that might now have become available
*/

interface Task {
    taskId: string
    dependencies: string[]
}

const tasks: Task[] = [
    { taskId: "5", dependencies: ["4"] },
    { taskId: "1", dependencies: [] },
    { taskId: "2", dependencies: ["1"] },
    { taskId: "3", dependencies: ["1"] },
    { taskId: "4", dependencies: ["1", "3"] },
    
    // Cycle
    { taskId: "10", dependencies: ["12"] },
    { taskId: "11", dependencies: ["10"] },
    { taskId: "12", dependencies: ["11"] },
]

const completedTasks: { [taskId: string]: boolean } = {}
const taskDependences: { [taskDependency: string]: Task[] } = {}

const tasksById: { [taskId: string]: Task } = tasks.reduce(
    (acc, task) => {
        acc[task.taskId] = task
        return acc
    },
    {}
)

const attemptExecute = (task: Task) => {

    // Have all our dependencies been executed?
    const missingDependencies = task.dependencies.filter(dependentTaskId => {
        return !completedTasks[dependentTaskId]
    })


    // If they have been executed, we can run out task
    if (missingDependencies.length === 0) {
        console.log(`Executed: ${task.taskId}`)
        
        // Mark task as executed
        completedTasks[task.taskId] = true

        // Now that we have executed a new task, look for other tasks that might now
        //  be runnable
        if (taskDependences[task.taskId]) {
            taskDependences[task.taskId].forEach(task => attemptExecute(task))
        }
    } 
    
    // If they have not been executed, build up the data structure that allows them
    //  to be efficiently found & run
    else {
        missingDependencies.forEach(requiredTaskId => {
            if(!taskDependences[requiredTaskId]) {
                taskDependences[requiredTaskId] = []
            } 
            
            taskDependences[requiredTaskId].push(task)
        })
    }
}

tasks.forEach(t => attemptExecute(t))

// To maintain the cycle path, this can be done in few ways:
//  1. Return concat path (like I am doing now)
//  2. A path argument into tasksSeen (though, would not give fast lookup, unless ordered dict)
//      and an return value to indicate we have hit the basecase
const isCycleReturnPath = (task: Task, tasksSeen: { [key: string]: boolean }): string[] => {
    if (tasksSeen[task.taskId]) {
        return [task.taskId]
    }

    tasksSeen[task.taskId] = true

    const cycles = task.dependencies.map(d => {
        // WARNING: Requires a new seen list per run through OR to backtrack
        return isCycleReturnPath(tasksById[d], { ... tasksSeen }) 
    })

    // Find the first path with a cycle, we know there is a cycle once we return a path
    const withCycle = cycles.find(c => c.length)

    return withCycle 
        ? [...withCycle, task.taskId]
        : []
}


tasks.forEach(t => console.log('TaskId: ', t.taskId, isCycleReturnPath(t, {})))

const isCycle = (task: Task, taskPath: string[], tasksSeen: { [key: string]: boolean }): string[] | null => {
    if (tasksSeen[task.taskId]) {
        return [...taskPath, task.taskId]
    }

    for (let i = 0; i < task.dependencies.length; ++i) {
        const taskId = task.dependencies[i]

        const isCyclePath = isCycle(tasksById[taskId], [...taskPath, task.taskId], { ...tasksSeen, [task.taskId]: true } )

        if (isCyclePath) {
            return isCyclePath
        }
    }

    return null
}


tasks.forEach(t => console.log('TaskId: ', t.taskId, isCycle(t, [], {})))