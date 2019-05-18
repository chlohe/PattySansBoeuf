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

function refreshRelationTable(){
    $('#rTable').html( `
        <tr> 
            ${Array.from(relations).sort().map(r => 
                `<tr id='relation-${r[0]}'>
                    <td> ${decodeURIComponent(r[1].x)} </td>
                    <td> ${relationTypes.get(r[1].name).name} </td>
                    <td> ${decodeURIComponent(r[1].y)} </td>
                    <td class='table-options'> <a id='remove-${r[0]}' class='rmr-button'> (x) </a> </td>
                </tr>`
            )}
        </tr>
    `);
    $('.rmr-button').click(e => {
        removeRelation(e.target.id.substring(7));
        refreshRelationTable();
    });
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
        try{
            displayResults(JSON.parse(data));    
        }
        catch(e){
            displasyLackOfResults();
        }
    });
}

function displasyLackOfResults(){
    $('#iTable').html("Ur fucked m9 :(");
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
    //Don't forget to decode the names!
    $('#iTable').html( `
        <tr> 
            ${Array.from(results).sort().map(r => `<tr id='invitation-${r[0]}'><td> ${decodeURIComponent(r[0])} </td> <td> ${r[1]} </td> </tr>`)}
        </tr>
    `);
}