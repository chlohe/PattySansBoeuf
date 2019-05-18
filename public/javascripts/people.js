//people is GLOBAL Map variable declared in main.js

function addPerson(name){
    //Escape spaces and dodgy shit
    name = encodeURIComponent(name);
    //Ensure we dont get key clash
    if (!people.has(name)){
        //Do the actual adding
        people.set(name, {})
    }
    else
    {
        //TODO: ALERT USER THIS ALREADY EXISTS
        console.warn("person already exists");
    }
}

function removePerson(name){
    name = encodeURIComponent(name);
    people.delete(name);
}