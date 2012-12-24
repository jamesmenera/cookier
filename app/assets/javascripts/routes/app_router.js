Gsc.Router = Em.Router.extend({
  location: 'hash',
  enableLogging:  true,

  goToCookies:        Em.Route.transitionTo('cookies'),
  goToParticipants:   Em.Route.transitionTo('participants.index'),
  goToHome:           Em.Route.transitionTo('root.index'),

  root: Em.Route.extend({
    index: Em.Route.extend({
      route: '/',
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('cookies');
      }
    }),

    cookies:  Em.Route.extend({
      route: '/cookies',
      enter: function ( router ){
        console.log("The cookies sub-state was entered.");
      },
      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('cookies', router.get('store').findAll(Gsc.Cookie));
      }
    }),

    participants: Em.Route.extend({
      route: '/participants',

      showParticipant: function(router, event) {
        router.transitionTo('participants.participant.index', event.context);
      },

      showNewParticipant: function(router) {
        router.transitionTo('participants.newParticipant', {});
      },

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('participants', router.get('store').findAll(Gsc.Participant));
      },

      index: Em.Route.extend({
        route: '/',

        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('participants');
        }
      }),
      newParticipant: Em.Route.extend({
        route: '/participants/new',

        cancelEdit: function(router) {
          router.transitionTo('participants.index');
        },

        connectOutlets: function(router) {
          router.get('participantsController').connectOutlet('editParticipant', {});
          router.get('editParticipantController').enterEditing();
        },

        exit: function(router) {
          router.get('editParticipantController').exitEditing();
        }
      }),

      participant: Em.Route.extend({
        route: ':participant_id',

        connectOutlets: function(router, context) {
          router.get('participantsController').connectOutlet('participant', context);
        },

        index: Em.Route.extend({
          route: '/',

          showEdit: function(router) {
            router.transitionTo('participant.edit');
          },

          connectOutlets: function(router, context) {
            router.get('participantController').connectOutlet('showParticipant');
          }
        }),
        edit: Em.Route.extend({
          route: 'edit',

          cancelEdit: function(router) {
            router.transitionTo('participants.participant.index');
          },

          connectOutlets: function(router) {
            var participantController = router.get('participantController');
            participantController.connectOutlet('editParticipant', participantController.get('content'));
            router.get('editParticipantController').enterEditing();
          },

          exit: function(router) {
            router.get('editParticipantController').exitEditing();
          }
        })
      })
    })
  })
});