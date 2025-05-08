  

// js/router/AppRouter.js
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'home',
        'movie/:id': 'showMovie'
    },

    initialize: function() {
        this.appView = new AppView();
    },

    home: function() {
        this.appView.show();
       // $('#movie-detail').empty();
    },

    showMovie: function(imdbID) {
        this.appView.hide();
        const detailView = new MovieDetailView();
        detailView.fetchAndRender(imdbID);
    }
});
