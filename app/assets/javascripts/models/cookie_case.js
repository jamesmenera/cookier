Gsc.CookieCase = DS.Model.extend({
  name: DS.attr('string'),
  quantityStart: DS.attr('number'),
  quantityEnd: DS.attr('number'),
  siteSale: DS.belongsTo('Gsc.SiteSale'),

  casesBaseTenCheckOut: function() {
    return Math.round(this._baseTen(this.get('quantityStart')));
  }.property('quantityStart'),

  casesBaseTenCheckIn: function() {
    return Math.round(this._baseTen(this.get('quantityEnd')));
  }.property('quantityEnd'),

  boxesLeftOverCheckOut: function() {
    return this._boxesLeftOver(this.get('quantityStart')) ;
  }.property('quantityStart'),

  boxesLeftOverCheckIn: function() {
    return this._boxesLeftOver(this.get('quantityEnd')) ;
  }.property('quantityEnd'),

  caseCountCheckOut: function() {
    if (boxesLeftOverCheckOut === "0") {
      return casesBaseTenCheckOut + " cases";
    } else {
      return casesBaseTenCheckOut + " cases and boxes " + boxesLeftOverCheckOut;
    }
  }.property('quantityStart'),

  caseCountCheckIn: function() {
    if (boxesLeftOverCheckOut === "0") {
      return casesBaseTenCheckIn + " cases";
    } else {
      return casesBaseTenCheckIn + " cases and boxes " + boxesLeftOverCheckIn;
    }
  }.property('quantityEnd'),

  _baseTen: function(quantity) {
    return quantity / 12.0;
  },

  _boxesLeftOver: function(quantity) {
    return Math.round((this._baseTen(quantity) - parseInt(this._baseTen(quantity)))*12);
  }
});
