import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-page-5674c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsementLists")

const inputEl = document.getElementById("input-el")
const fromBtn = document.getElementById("from-btn")
const toBtn = document.getElementById("to-btn")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function(){
    let endorsementValue = inputEl.value
    console.log(endorsementValue)
    push(endorsementsInDB, endorsementValue)
    clearTextArea()  
})

onValue(endorsementsInDB, function(snapshot){
    if(snapshot.exists()){
        clearPreviousEndorsementInDOM ()
        let itemsArray = Object.entries(snapshot.val())
        for(let i = 0; i < itemsArray.length; i++){
            let currentEndorsement = itemsArray[i]
            let currentEndorsementkey = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
            appendEndorsementfromDB(currentEndorsement)
        }
    }
    else{
        endorsementListEl.innerHTML ="There are no endorsements yet...."
    }
})

function appendEndorsementfromDB(item){
    let itemKey = item[0]
    let itemvalue = item[1]
    const newEl = document.createElement("li")
    newEl.textContent = itemvalue
    endorsementListEl.append(newEl)
}

function clearTextArea() {
    inputEl.value = ""
}

function clearPreviousEndorsementInDOM (){
    endorsementListEl.textContent = ""
}

function openFromForm (){
    document.getElementById("from-form").style.display = "block"
}

function closeForm (){
    document.getElementById("from-form").style.display = "none"
}