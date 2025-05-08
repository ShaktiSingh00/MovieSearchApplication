

// js/views/MovieDetailView.js
var MovieDetailView = Backbone.View.extend({
    el: '#movie-detail',

    template: _.template(`
        <div class="card mb-4">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="<%= Poster %>" class="img-fluid" alt="<%= Title %>" onerror="this.src='picture-vector-icon-no-image-260nw-1732584341.webp';">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><%= Title %> (<%= Year %>)</h5>
                        <p><strong>Plot:</strong> <%= Plot %></p>
                        <p><strong>Released:</strong> <%= Released %></p>
                        <p><strong>Runtime:</strong> <%= Runtime %></p>
                        <p><strong>Genre:</strong> <%= Genre %></p>
                        <p><strong>Director:</strong> <%= Director %></p>
                        <p><strong>Writer:</strong> <%= Writer %></p>
                        <p><strong>Actors:</strong> <%= Actors %></p>
                        <p><strong>Language:</strong> <%= Language %></p>
                        <p><strong>Country:</strong> <%= Country %></p>
                        <p><strong>Awards:</strong> <%= Awards %></p>
                        <p><strong>Metascore:</strong> <%= Metascore %></p>
                        <p><strong>IMDB Rating:</strong> <%= imdbRating %></p>
                        <p><strong>Production:</strong> <%= Production %></p>
                        <p><strong>Website:</strong> <%= Website %></p>
                        <button class="btn btn-secondary btn-sm mb-3" id="back-btn">← Back</button>
                    </div>
                </div>
            </div>
        </div>
    `),

    events: {
        'click #back-btn': 'goBack'
    },

    render: function(data) {
        this.$el.html(this.template({ ...data }));
    },

    // fetchAndRender: async function(imdbID) {
    //     $.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=982ff953`, (data) => {
    //         this.render(data);
    //     });
    // },

    fetchAndRender: async function(imdbID) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=982ff953`);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            this.$el.html('<p class="text-danger">Failed to load movie details.</p>');
        }
    },
    

    goBack: function() {
        Backbone.history.navigate('', { trigger: true });
    }
});
