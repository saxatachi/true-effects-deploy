
export const handleMovetoHome = (history) => {
    history.push("/");
}
export const handleMovetoScheduler = (history) => {
    history.push("/schedule");
}
export const handleMovetoCreator = (history) => {
    history.push("/createtraining");
}
export const handleMovetoMeasurements = (history) => {
    history.push("/addmeasurements");
}
export const handleMovetoAllMeasurements = (history) => {
    history.push("/displaymeasurements");
}

export const handleMovetoGoalsAndDimensions = (history) =>{
    history.push("/goals_and_dimensions")
}
export const handleMovetoAddGoals = (history) => {
    history.push("/addgoals");
}

export const handleMoveToScheduler = (history) =>{
    history.push("/scheduler");
}

export const handleMoveToTraining = (history) => {
    history.push("/training")
}

export const handleMovetoSettings = (history) =>{
    history.push("/settings")
}

export const handleMoveToModifyTraining = (history) =>{
    history.push("/modify_training")
}