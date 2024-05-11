const traineeDataBtn = document.getElementById('#traineeWinBtn')
const trainerDataBtn = document.getElementById('#trainerWinBtn')
const closeBtn = document.getElementById('#closeBtn')
// Start Window For Trainee Data
function createWindowTraineeData(){
    window.ipcRenderer.send('createWindowTraineeData',null)
}
function createWindowTrainerData(){
    window.ipcRenderer.send('createWindowTrainerData',null)
}
function closeMainWindow(){
    window.ipcRenderer.send('closeMainWindow',null)
}
traineeDataBtn.addEventListener('click',createWindowTraineeData)
trainerDataBtn.addEventListener('click',createWindowTrainerData)
closeBtn.addEventListener('click',closeMainWindow)