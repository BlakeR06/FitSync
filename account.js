const signUpForm = document.getElementById('signUpForm')
const loginForm = document.getElementById('loginForm')
const accountManagerBigScreenContainer = document.getElementById('accountManagerBigScreenContainer')
const accountManagerSmallScreenContainer = document.getElementById('accountManagerSmallScreenContainer')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// FORMATTING
let screenWidth = window.innerWidth
FormatScreen()

addEventListener('resize', function(){
    screenWidth = window.innerWidth
    FormatScreen()
})

function FormatScreen(){
    if(screenWidth <= 940){
        accountManagerSmallScreenContainer.appendChild(signUpForm)
        accountManagerSmallScreenContainer.appendChild(loginForm)
    }
    else{
        accountManagerBigScreenContainer.appendChild(signUpForm)
        accountManagerBigScreenContainer.appendChild(loginForm)
    }
}

function SignUpToggle(){
    loginForm.reset()
    loginForm.style.display = 'none'
    loginForm.style.opacity = 0
    signUpForm.style.display = 'block'
    setTimeout(function(){
        signUpForm.style.opacity = 1
    }, 1)
}

function LoginToggle(){
    signUpForm.reset()
    signUpForm.style.display = 'none'
    signUpForm.style.opacity = 0
    loginForm.style.display = 'block'
    setTimeout(function(){
        loginForm.style.opacity = 1
    }, 1)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// FORMATTING

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// SIGN UP
const sheetsUrl = 'https://script.google.com/macros/s/AKfycbxs_2TQKpcQTB4ck6XopSbS96gf3aYofumO-c6C125Mxkw3XbPkW3KCFWrO2f3Qj99whg/exec'

signUpForm.addEventListener('submit', SignUp)
function SignUp(event){
    event.preventDefault()
    StartLoading()

    var signUpFormData = new FormData(signUpForm)

    fetch(sheetsUrl, {
        method: 'POST',
        body: signUpFormData
    })
    .then(response => response.text())
    .then(data => {
        if(data == 'AccountCreated'){
            alert('Account created successfully! Returning to login page.')
            LoginToggle()
        }
        else if(data == 'UsernameAlreadyTaken'){
            alert('Username already exists. Please enter a different username.')
            signUpForm.reset()
        }
        else{
            alert('We encountered an error. Please try again later.')
            signUpForm.reset()
        }
        StopLoading()
    })
    .catch(error => {
        StopLoading()
        alert('We encountered an error. Please try again later.')
        signUpForm.reset()
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// SIGN UP

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LOGIN
loginForm.addEventListener('submit', Login)
function Login(event){
    event.preventDefault()
    StartLoading()

    var loginFormData = new FormData(loginForm)

    fetch(sheetsUrl, {
        method: 'POST',
        body: loginFormData
    })
    .then(response => response.text())
    .then(data => {
        if(data == 'LoggedIn'){
            localStorage.setItem('currentUser', document.getElementById('loginUsername').value)
            loginForm.reset()
            window.location.href = 'Home.html'
        }
        else{
            alert('Incorrect username or password.')
            loginForm.reset()
        }
        StopLoading()
    })
    .catch(error => {
        StopLoading()
        alert('We encountered an error. Please try again later.')
        loginForm.reset()
    })
} 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// LOGIN