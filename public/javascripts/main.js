//Use a map in case we want to attach metadata to these things later on
const relations = new Map();
const people = new Map();
const relationTypes = new Map();

$(document).ready(() => {

    //Populate relationTypes
    relationTypes.set('hates', {name: 'hates', arity: 2});
    relationTypes.set('dates', {name: 'is dating', arity: 2});
    relationTypes.set('ex', {name: 'used to date', arity: 2});
    relationTypes.set('comes', {name: 'must come', arity: 1});

    $('#rField').html(`
        ${Array.from(relationTypes).map(r => `<option value='${r[0]}'> ${r[1].name} </option>`)}
    `);

    //Adding people button   
    $('#btnAddPerson').click(e => {
        e.preventDefault();
        const nameField =  $('#nameField');
        const personName = nameField.val();
        //Check if empty
        if(personName == ""){
            return;
        }
        //Append to our map
        addPerson(personName);
        //Reset the field
        nameField.val("");
        //Populate table
        $('#pTable').html( `
            <tr> 
                ${Array.from(people).sort().map(p => `<tr id='person-${p[0]}'><td> ${decodeURIComponent(p[0])} </td></tr>`)}
            </tr>
        `);
        //Populate combobox options
        //NE PAS OUBLIER QUE LE "NOM" (p[0]) EST CODÉ!! (Utilisez 'decodeURIComponent')
        $('#xField').html(`
            ${Array.from(people).sort().map(p => `<option value=${p[0]}> ${decodeURIComponent(p[0])} </option>`)}
        `)
        $('#xField').val('');
    });
    
    //Adding relations button
    $('#btnAddRelation').click(e => {
        e.preventDefault();
        //Fetch the necessary vals
        const x = $('#xField').val();
        const y = $('#yField').val();
        const name = $('#rField').val();
        const arity = relationTypes.get(name).arity;
        //Check for empty values
        if(x == null || (y == null && arity == 2) || name == null){
            return;
        }
        //Append to our map, making sure arities are right
        addRelation(name, x, arity == 1 ? '' : y);
        //Populate table
        $('#rTable').html( `
            <tr> 
                ${Array.from(relations).sort().map(r => `<tr id='relation-${r[0]}'><td> ${decodeURIComponent(r[1].x)} </td> <td> ${relationTypes.get(r[1].name).name} </td> <td> ${decodeURIComponent(r[1].y)} </td></tr>`)}
            </tr>
        `);
    });

    //On Change X
    $('#xField').on('change', function (e) {
        const valueSelected = this.value;
        const yField = $('#yField');
        //Populate other field with everything BUT our option
        //Again, don't forget to decode the name
        if(!yField.prop('disabled')){
            yField.html(`
                ${Array.from(people).filter(p => p[0] != valueSelected).sort().map(p => `<option value=${p[0]}> ${decodeURIComponent(p[0])} </option>`)}
            `);
        }
    });

    //On Change R
    $('#rField').on('change', function (e) {
        const yField = $('#yField');
        const valueSelected = this.value;
        //Set y field enabled based upon linear/bilinear
        const linear = relationTypes.get(valueSelected).arity == 1;
        yField.prop('disabled', linear);
        yField.val(linear ? '' : yField.val());
    });

    //Solve button
    $('#btnSolve').click(e => {
        e.preventDefault();
        solveRelations();
    })

})