const workoutsContainer = document.getElementById('workoutsContainer')
const createWorkoutContainer = document.getElementById('createWorkoutContainer')
const getStartedContainer = document.getElementById('getStartedContainer')
const progressContainer = document.getElementById('progressContainer')

let hasStarted = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// NAV BAR
const navBarWorkoutsButton = document.getElementById('navBarButton1')
const navBarProgressButton = document.getElementById('navBarButton2')
let workoutsTab = true

navBarWorkoutsButton.addEventListener('click', function(){
    if(!workoutsTab){
        workoutsTab = true
        navBarWorkoutsButton.style.color = 'rgb(22, 192, 0)'
        navBarProgressButton.style.color = 'white'
        if(hasStarted){
            progressContainer.style.display = 'none'
            workoutsContainer.style.display = 'block'
        }
    }
    else{
        window.location.reload()
    }
})
navBarProgressButton.addEventListener('click', function(){
    if(workoutsTab){
        workoutsTab = false
        navBarProgressButton.style.color = 'rgb(22, 192, 0)'
        navBarWorkoutsButton.style.color = 'white'
        if(hasStarted){
            progressContainer.style.display = 'block'
            workoutsContainer.style.display = 'none'
        }
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// NAV BAR

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LOADING
const loadingScreenCover = document.getElementById('loadingScreenCover')
const loadingDot1 = document.getElementById('loadingDot1')
const loadingDot2 = document.getElementById('loadingDot2')
const loadingDot3 = document.getElementById('loadingDot3')

function StartLoading() {
    loadingScreenCover.style.display = 'block';
    loadingDot1.style.opacity = 1;
    loadingDot2.style.opacity = 1;
    loadingDot3.style.opacity = 1;

    function animate() {
        loadingDot1.style.opacity = 0;
        setTimeout(function() {
            loadingDot2.style.opacity = 0;
            loadingDot1.style.opacity = 1;
        }, 150); // Faster transition
        setTimeout(function() {
            loadingDot3.style.opacity = 0;
            loadingDot2.style.opacity = 1;
        }, 300); // Faster transition
        setTimeout(function() {
            loadingDot3.style.opacity = 1;
        }, 450); // Faster transition
    }
    animate(); 
    setInterval(animate, 1400);
}

function StopLoading(){
    loadingScreenCover.style.display = 'none'
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LOADING

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// STARTUP
const sheetsUrl = 'https://script.google.com/macros/s/AKfycbxs_2TQKpcQTB4ck6XopSbS96gf3aYofumO-c6C125Mxkw3XbPkW3KCFWrO2f3Qj99whg/exec';

document.addEventListener('DOMContentLoaded', function() {
    var currentUser = localStorage.getItem('currentUser');
    document.getElementById('amountOfExercisesInput').value = amountOfWorkouts
    document.getElementById('createWorkoutUsername').value = currentUser
    StartLoading()
    if (currentUser) {
        document.getElementById('username1').textContent = currentUser;
        document.getElementById('progressTitle').textContent = currentUser + "'s Progress"
        document.getElementById('getStartedInput').value = currentUser;

        const getStartedForm = document.getElementById('getStartedForm');
        if (getStartedForm) {
            getStartedForm.addEventListener('submit', function(event) {
                GetStartedCheck(event);
            });
            setTimeout(() => {
                getStartedForm.dispatchEvent(new Event('submit')); 
            }, 100); 
        }
    }
    else{
        alert('We encountered an error.')
        window.location.href = 'Account.html'
    } 
});

function GetStartedCheck(event) {
    event.preventDefault(); 

    var getStartedForm = document.getElementById('getStartedForm');
    var getStartedFormData = new FormData(getStartedForm);

    fetch(sheetsUrl, {
        method: 'POST',
        body: getStartedFormData
    })
    .then(response => response.json())
    .then(data => {
        if (data === 'NotStarted') {
            StopLoading()
            hasStarted = false
            createWorkoutContainer.style.display = 'none'
            workoutsContainer.style.display = 'none'
        } 
        else {
            StopLoading()
            hasStarted = true
            getStartedContainer.style.display = 'none'
            createWorkoutContainer.style.display = 'none'
            data.forEach(workoutName => {
                var editButtonContainer = document.createElement('div')
                editButtonContainer.className = 'editButtonContainer'

                var editButton = document.createElement('div')
                editButton.className = 'editButton img cp'

                var workoutNameContainer = document.createElement('div')
                workoutNameContainer.className = 'workoutContainer cp'

                var displayWorkoutName = document.createElement('div')
                displayWorkoutName.className = 'font2 green'
                displayWorkoutName.textContent = workoutName

                var workoutNameSubtitle = document.createElement('div')
                workoutNameSubtitle.className = 'font4 grey'
                workoutNameSubtitle.textContent = 'Click to start workout'

                const workoutsParentContainer = document.getElementById('workoutsParentContainer')
                workoutNameContainer.appendChild(displayWorkoutName)
                workoutNameContainer.appendChild(workoutNameSubtitle)
                editButtonContainer.appendChild(workoutNameContainer)
                editButtonContainer.appendChild(editButton)
                workoutsParentContainer.appendChild(editButtonContainer)
            })
        }
    })
    .catch(error => {
        alert('Something went wrong...');
        StopLoading()
        window.location.href = 'Account.html'
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// STARTUP

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CREATE WORKOUT
document.getElementById('getStartedButton').addEventListener('click', function(){
    getStartedContainer.style.display = 'none'
    createWorkoutContainer.style.display = 'block'
})

const addNewExerciseButton = document.getElementById('addNewExerciseButton');
let amountOfWorkouts = 1;

addNewExerciseButton.addEventListener('click', function() {
    amountOfWorkouts += 1;
    document.getElementById('amountOfExercisesInput').value = amountOfWorkouts

    var newExerciseContainer = document.createElement('div');
    newExerciseContainer.className = 'newExerciseContainer mt2';

    var newExerciseLabelContainer1 = document.createElement('div');
    newExerciseLabelContainer1.className = 'exerciseLabelContainer';

    var newExerciseLabelContainer2 = document.createElement('div');
    newExerciseLabelContainer2.className = 'exerciseLabelContainer';

    var newExerciseLabelContainer3 = document.createElement('div');
    newExerciseLabelContainer3.className = 'exerciseLabelContainer';

    var newExerciseLabel1 = document.createElement('div');
    newExerciseLabel1.className = 'font3 grey exerciseLabel';
    newExerciseLabel1.textContent = 'Name';

    var newExerciseLabel2 = document.createElement('div');
    newExerciseLabel2.className = 'font3 grey exerciseLabel';
    newExerciseLabel2.textContent = 'Sets';

    var newExerciseLabel3 = document.createElement('div');
    newExerciseLabel3.className = 'font3 grey exerciseLabel';
    newExerciseLabel3.textContent = 'Reps';

    var newExerciseNameInput = document.createElement('input');
    newExerciseNameInput.setAttribute('type', 'text');
    newExerciseNameInput.setAttribute('placeholder', 'Exercise name');
    newExerciseNameInput.setAttribute('name', 'ExerciseNameInput' + amountOfWorkouts);
    newExerciseNameInput.setAttribute('required', '');

    var newExerciseSetsInput = document.createElement('input');
    newExerciseSetsInput.className = 'smallInput';
    newExerciseSetsInput.setAttribute('type', 'text');
    newExerciseSetsInput.setAttribute('placeholder', 'X');
    newExerciseSetsInput.setAttribute('name', 'ExerciseSetsInput' + amountOfWorkouts);
    newExerciseSetsInput.setAttribute('required', '');

    var newExerciseRepsInput = document.createElement('input');
    newExerciseRepsInput.className = 'smallInput';
    newExerciseRepsInput.setAttribute('type', 'text');
    newExerciseRepsInput.setAttribute('placeholder', 'X');
    newExerciseRepsInput.setAttribute('name', 'ExerciseRepsInput' + amountOfWorkouts);
    newExerciseRepsInput.setAttribute('required', '');

    newExerciseLabelContainer1.appendChild(newExerciseLabel1);
    newExerciseLabelContainer1.appendChild(newExerciseNameInput);

    newExerciseLabelContainer2.appendChild(newExerciseLabel2);
    newExerciseLabelContainer2.appendChild(newExerciseSetsInput);

    newExerciseLabelContainer3.appendChild(newExerciseLabel3);
    newExerciseLabelContainer3.appendChild(newExerciseRepsInput);

    newExerciseContainer.appendChild(newExerciseLabelContainer1);
    newExerciseContainer.appendChild(newExerciseLabelContainer2);
    newExerciseContainer.appendChild(newExerciseLabelContainer3);

    const newExerciseParentContainer = document.getElementById('newExerciseParentContainer');
    newExerciseParentContainer.appendChild(newExerciseContainer);
});

document.getElementById('removePreviousExerciseButton').addEventListener('click', function(){
    const newExerciseParentContainer = document.getElementById('newExerciseParentContainer');
    if(amountOfWorkouts > 1){
        newExerciseParentContainer.removeChild(newExerciseParentContainer.lastChild)
        amountOfWorkouts -= 1
        document.getElementById('amountOfExercisesInput').value = amountOfWorkouts
    }
})

const newWorkoutForm = document.getElementById('newWorkoutForm')
newWorkoutForm.addEventListener('submit', CreateWorkout);
function CreateWorkout(event){
    event.preventDefault()
    StartLoading()

    var newWorkoutFormData = new FormData(newWorkoutForm)
    fetch(sheetsUrl, {
        method: 'POST',
        body: newWorkoutFormData
    })
    .then(response => response.text())
    .then(data => {
        StopLoading()
        if(data == 'WorkoutCreated'){
            alert('Workout created successfully!')
            window.location.reload()
        }
    })
    .catch(error => {
        StopLoading()
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CREATE WORKOUT
