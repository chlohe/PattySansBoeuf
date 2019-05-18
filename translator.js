const Logic = require('logic-solver');

module.exports = {
  translate(source) {
    const results = [];
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
      if(x.name == 'comes'){
        results.push(this.translateComes(x));
      }
    });
    return results;
  },
  parse(source) {
    const data = source.data;
    if(data == undefined){
      return -1;
    }
    return JSON.parse(data);
  },
  translateHates(x) {
    return Logic.atMostOne(x.x, x.y);
  },
  translateDates(x) {
    return Logic.equiv(x.x, x.y);
  },
  translateEx(x) {
    //TODO: Figure out the translation for this one. Weightings?
    return Logic.or(x.x, x.y);
  },
  translateComes(x) {
    return x.x;
  }

}