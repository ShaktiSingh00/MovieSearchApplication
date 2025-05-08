

var Movie = Backbone.Model.extend({
    defaults: {
        Title: '',
        Year: '',
        imdbID: '',
        Poster: '',
        Plot: ''
    },
    urlRoot: 'https://www.omdbapi.com/',
    url: function () {
        return this.urlRoot + '?i=' + this.id + '&apikey=982ff953';
    }
});
