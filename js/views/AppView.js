// js/views/AppView.js
var AppView = Backbone.View.extend({
    el: '#app',

    events: {
        'keyup #search-input': 'onSearch'
    },

    initialize: function() {
        this.collection = new MovieCollection();
        this.detailView = new MovieDetailView();

        this.listenTo(this.collection, 'reset', this.renderResults);
       // Backbone.on('movie:show', this.fetchMovieDetails);
    },

    onSearch: function(e) {
        if (e.keyCode === 13) {
            const query = this.$('#search-input').val().trim();
            if (query) {
                this.collection.search(query);
                this.$('#movie-detail').empty(); // clear old details
            }
        }
    },

    renderResults: function() {
        const $results = this.$('#results');
        $results.empty();

        this.collection.each(movie => {
            const view = new MovieView({ model: movie });
            $results.append(view.render().el);
        });
        this.renderPagination();
    },

    // fetchMovieDetails: function(imdbID) {
    //     $.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=982ff953`, (data) => {
    //         const detailView = new MovieDetailView();
    //         detailView.render(data);
    //     });
    // },
    fetchMovieDetails: async function(imdbID) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=982ff953`);
            const data = await response.json();
    
            const detailView = new MovieDetailView();
            detailView.render(data);
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            $('#movie-detail').html('<p class="text-danger">Error loading movie details.</p>');
        }
    },
    
    show: function() {
        this.$('#search-input').show();
        this.$('#results').show();
        this.$('#pagination').show();
        this.$('#movie-detail').hide(); // hide detail view
    },
    
    hide: function() {
        this.$('#search-input').hide();
        this.$('#results').hide();
        this.$('#pagination').hide();
        this.$('#movie-detail').show(); // show detail view
    },

    renderPagination: function () {
        const total = this.collection.totalResults;
        const currentPage = this.collection.page;
        const totalPages = Math.ceil(total / 10);
        const $pagination = this.$('#pagination');
    
        $pagination.empty();
    
        if (totalPages <= 1) return;
    
        const groupSize = 10;
        const currentGroup = Math.floor((currentPage - 1) / groupSize);
        const startPage = currentGroup * groupSize + 1;
        const endPage = Math.min(startPage + groupSize - 1, totalPages);
    
        // Previous group button
        if (startPage > 1) {
            const prevBtn = $('<button class="btn btn-outline-secondary m-1">« Prev</button>');
            prevBtn.on('click', () => {
                this.collection.search(this.collection.searchTerm, startPage - 1);
                this.$('#movie-detail').empty();
            });
            $pagination.append(prevBtn);
        }
    
        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            const btn = $(`<button class="btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} m-1">${i}</button>`);
            btn.on('click', () => {
                this.collection.search(this.collection.searchTerm, i);
                this.$('#movie-detail').empty();
            });
            $pagination.append(btn);
        }
    
        // Next group button
        if (endPage < totalPages) {
            const nextBtn = $('<button class="btn btn-outline-secondary m-1">Next »</button>');
            nextBtn.on('click', () => {
                this.collection.search(this.collection.searchTerm, endPage + 1);
                this.$('#movie-detail').empty();
            });
            $pagination.append(nextBtn);
        }
    }
    
    
    
 });

