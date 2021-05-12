/* Global Variables */
const generateButton = document.getElementById("generate");
const zipCodeInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
//openweathermap api Urls
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&zip=`;
const apiKey = `&appid=ec417041ab5fc9af8a93edc55e27dfc1`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

// add click event on generate button to execute the function that ...
//1-check input validations.
//2-call getTemp fn to get temperature from openweathermap.org/api
//3- then call postDataToServer fn to post data to local server (date/feeling/temp"that we got from api").
//4-then call getAllEntries() that retrive the final data from the server and display it on html. 
generateButton.addEventListener("click", () => {
    if (validatezipCode() == true && validatefeelingsInput() == true) {
        getTemp(baseUrl, zipCodeInput.value, apiKey).then(function (response) {
            postDataToServer('/postData', {
                date: newDate,
                temp: Math.round(response.main.temp),
                feelings: feelingsInput.value
            });
            getAllEntries();
            clearInputs();
        })
    }
})

// getTemp fn to get temp from openweathermap api by zip code
async function getTemp(baseUrl, zipCode, apiKey) {
    const ApiResponse = await fetch(baseUrl + zipCode + apiKey);
    try {
        const weatherData = await ApiResponse.json();
        return weatherData;
    }
    catch (error) {
        console.log(error);
    }
}

//postDataToServer fn to post the data to server (date/feeling/temp"that we got from api").
async function postDataToServer(serverUrl, data) {
    const response = await fetch(serverUrl, {
        method: "post",
        credentials: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        const finalData = await response.json();
        return finalData;
    }
    catch (error) {
        console.log(error);
    }
}

//getAllEntries fn to retrive the final data from the server and 
async function getAllEntries() {
    const request = await fetch('/getData');
    try {
        const allData = await request.json();
        console.log(allData);
        date.innerHTML = `<i class="fas fa-calendar-alt ml-1"></i> Date : ${allData.date}`;
        temp.innerHTML = `<i class="fas fa-thermometer-half ml-1"></i> Temperature : ${allData.temp} &deg;C`;
        content.innerHTML = `<i class="fas fa-smile-beam"></i> Feeling : ${allData.feelings}`;
    }
    catch (error) {
        console.log(error);
    }
}

//clear inputs after generate
function clearInputs() {
    zipCodeInput.value = "";
    feelingsInput.value = "";
}

//validate zipCodeInput.value 
function validatezipCode() {
    const zipCodeAlert = document.getElementById("zipCodeAlert");
    const regex = /^[0-9]{5}$/;
    if (regex.test(zipCodeInput.value) == true) {
        zipCodeInput.classList.remove("is-invalid");
        zipCodeAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        zipCodeInput.classList.add("is-invalid");
        zipCodeAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
zipCodeInput.addEventListener("keyup", validatezipCode);

//validate feelingsInput.value
function validatefeelingsInput() {
    const feelingAlert = document.getElementById("feelingAlert");
    const regex = /^[A-za-z0-9]{3,15}$/;
    if (regex.test(feelingsInput.value) == true) {
        feelingsInput.classList.remove("is-invalid");
        feelingAlert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        feelingsInput.classList.add("is-invalid");
        feelingAlert.classList.replace("d-none", "d-block");
        return false;
    }
}
feelingsInput.addEventListener("keyup", validatefeelingsInput);





