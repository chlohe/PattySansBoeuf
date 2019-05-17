//relations is GLOBAL Map variable declared in main.js

function addRelation(name, x, y){
    //Ensure we dont get key clash
    const key = x+name+y;
    if (!relations.has(key)){
        //Do the actual adding
        relations.set(key, {
            name,
            x,
            y
        })
    }
    else
    {
        //TODO: ALERT USER THIS ALREADY EXISTS
        console.warn("relation already exists");
    }
}

function removeRelation(key){
    relations.delete(key);
}

function solveRelations(){
    const relArray = Array.from(relations).map(x => x[1]);
    const payload = {
        data: JSON.stringify(relArray)
    };
    //Clear the table
    $('#iTable').html('');
    //Send the problem 
    $.post( "/solve", payload, data => {
        displayResults(JSON.parse(data));    
    });
}

function displayResults(data){
    const inviteText = "Invite";
    const notInviteText = "Nah";

    const results = new Map();
    const peopleWithBeef = [];
    //Parse the results a wee bit
    Object.keys(data).forEach(key => {
        results.set(key, data[key] ? inviteText : notInviteText);
        peopleWithBeef.push(key);
    });
    //Invite the people sans boeuf
    const peopleWithoutBeef = Array.from(people).filter(x => !peopleWithBeef.includes(x[0])).map(x => x[0]);
    peopleWithoutBeef.forEach(x => {
        results.set(x, inviteText);
    });
    //Populate table
    $('#iTable').html( `
        <tr> 
            ${Array.from(results).sort().map(r => `<tr id='invitation-${r[0]}'><td> ${r[0]} </td> <td> ${r[1]} </td> </tr>`)}
        </tr>
    `);
}