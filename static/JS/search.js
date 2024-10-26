$(document).ready(function() {
    $('#searchInput').on('input', function() {
        let query = $(this).val();
        console.log('Query:', query);
        if (query.length > 0) {
            $.ajax({
                url: '/search',
                data: { query: query },
                success: function(data) {
                    console.log('Search Results:', data);
                    $('#suggestionsList').empty();
                    if (data.length > 0) {
                        data.forEach(function(movie) {
                            $('#suggestionsList').append(`<li data-id="${movie.id}" class="suggestion-item">${movie.title}</li>`);
                        });
                        $('#suggestionsList').show();
                    } else {
                        $('#suggestionsList').hide();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error fetching data:', textStatus, errorThrown);
                }
            });
        } else {
            $('#suggestionsList').hide();
        }
    });

    $(document).on('click', '.suggestion-item', function() {
        let movieId = $(this).data('id');
        window.location.href = `/MoviePage/${movieId}`;
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('.search-section').length) {
            $('#suggestionsList').hide();
        }
    });
});
