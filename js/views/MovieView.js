// js/views/MovieView.js
var MovieView = Backbone.View.extend({
    tagName: 'div',
    className: 'col-md-3 mb-4',

    template: _.template(`
        <div class="card h-100">
            <img src="<%= Poster %>" class="card-img-top" alt="<%= Title %>" onerror="this.src='picture-vector-icon-no-image-260nw-1732584341.webp';">

            <div class="card-body">
                <h5 class="card-title"><%= Title %></h5>
                <p class="card-text">Year: <%= Year %></p>
                <p class="card-text">imdbID: <%= imdbID %></p>
                <p class="card-text">Type: <%= Type %></p>

                <button class="btn btn-primary btn-sm show-details">Details</button>
            </div>
        </div>
    `),

    events: {
        'click .show-details': 'showDetails'
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    // showDetails: function() {
    //     Backbone.trigger('movie:show', this.model.get('imdbID'));
    // }

    showDetails: function() {
        const imdbID = this.model.get('imdbID');
        //window.open(`detail.html?id=${imdbID}`, '_blank'); // Open in new tab
       // window.location.href = `detail.html?id=${imdbID}`;
       //window.location.hash = `movie/${imdbID}`;
       Backbone.history.navigate(`movie/${imdbID}`, { trigger: true });

    }
});
