const traineeDataBtn = document.getElementById('#traineeWinBtn')
const closeBtn = document.getElementById('#closeBtn')
// Start Window For Trainee Data
function createWindowTraineeData(){
    window.ipcRenderer.send('createWindowTraineeData',null)
}

function closeMainWindow(){
    window.ipcRenderer.send('closeMainWindow',null)
}
closeBtn.addEventListener('click',closeMainWindow)
traineeDataBtn.addEventListener('click',createWindowTraineeData)