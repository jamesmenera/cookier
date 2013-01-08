Gsc.AddParticipantRoute = Ember.Route.extend({
  init: function() {
    this._super();

    // reuse the EditContactController for adding contacts
    this.container.register('controller', 'addPArticipantRoute', Gsc.EditParticipantController);
  },

  setupController: function(controller) {
    // create a new record on a local transaction
    this.transaction = controller.get('store').transaction();
    var model = this.transaction.createRecord(Gsc.Participant, {});

    controller.set('content', model);
  },

  exit: function() {
    this._super();

    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  renderTemplate: function() {
    // reuse the editParticipant template for adding contacts
    this.render('editParticipant');
  },

  events: {
    cancel: function() {
      this.transitionTo('participantsIndex');
    },

    save: function(participant) {
      // when creating new records, it's necessary to wait for the record to be assigned
      // an id before we can transition to its route (which depends on its id)
      participant.addObserver('id', this, function() {
        this.transitionTo('participant', participant);
      });

      // commit and then clear the local transaction
      this.transaction.commit();
      this.transaction = null;
    }
  }
});