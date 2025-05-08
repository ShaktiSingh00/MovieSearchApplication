// // js/collections/MovieCollection.js
// var MovieCollection = Backbone.Collection.extend({
//     model: Movie,
//     url: function() {
//         return `https://www.omdbapi.com/?s=${this.searchTerm}&apikey=982ff953&page=${this.page}`;
//     },
//     searchTerm: '',
//     page: 1,

//     search: function(term, page = 1) {
//         this.searchTerm = term;
//         this.page = page;
//         this.fetch({ reset: true });
//     },

//     parse: function(response) {
//         return response.Search || [];
//     }
// });


var MovieCollection = Backbone.Collection.extend({
    model: Movie,
    searchTerm: '',
    page: 1,
    totalResults: 0,

    url: function () {
        return `https://www.omdbapi.com/?s=${this.searchTerm}&apikey=982ff953&page=${this.page}`;
    },

    search: function (term, page = 1) {
        this.searchTerm = term;
        this.page = page;
        this.fetch({ reset: true });
    },

    parse: function (response) {
        this.totalResults = parseInt(response.totalResults || 0);
        return response.Search || [];
    }
});
