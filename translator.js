var Logic = require('logic-solver');

module.exports = {
  translate: function(source){
    var results = [];
    source.forEach(x => {
      if(x.name == 'hates'){
        results.push(this.translateHates(x));
      }
      if(x.name == 'dates'){
        results.push(this.translateDates(x));
      }
      if(x.name == 'ex'){
        results.push(this.translateEx(x));
      }
    });
    return results;
  },
  parse: function(source){
    var data = source.data;
    if(data == undefined){
      return -1;
    }
    return JSON.parse(data);
  },
  translateHates: function(x){
    return Logic.atMostOne(x.x, x.y);
  },
  translateDates: function(x){
    return Logic.equiv(x.x, x.y);
  },
  translateEx: function(x){
    //TODO: Figure out the translation for this one. Weightings?
    return Logic.or(x.x, x.y);
  }

}