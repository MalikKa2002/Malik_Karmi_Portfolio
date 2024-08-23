let currentPage = 0;
const clientId = 'bWpRp26lh5y82bXfy5qGk4PrGlErDGFHkz_GUCfAxjI'; // Replace with your Unsplash client ID
const searchField = $('#searchField');
const gallery = $('#gallery');
const loadMoreButton = $('#loadMore');
const modal = $('#imageModal');
const modalImage = $('#modalImage');
const modalTitle = $('#modalTitle');
const modalDescription = $('#modalDescription');
const modalLikes = $('#modalLikes');
const closeModal = $('.close');

searchField.on('input', function() {
    const query = searchField.val().trim();
    if (query.length >= 3) {
        currentPage = 1;
        searchImages(query);
    } else {
        gallery.empty();
        loadMoreButton.hide();
    }
});

loadMoreButton.on('click', function() {
    const query = searchField.val().trim();
    if (query.length >= 3) {
        currentPage++;
        searchImages(query, true);
    }
});

closeModal.on('click', function() {
    modal.hide();
});

$(window).on('click', function(event) {
    if (event.target == modal[0]) {
        modal.hide();
    }
});

function searchImages(query, append = false) {
    $.ajax({
        url: `https://api.unsplash.com/search/photos`,
        data: {
            query: query,
            client_id: clientId,
            per_page: 20,
            page: currentPage
        },
        success: function(data) {
            displayImages(data.results, append);
            loadMoreButton.toggle(data.total_pages > currentPage);
        },
        error: function(error) {
            console.error('Error fetching images:', error);
        }
    });
}

function displayImages(images, append) {
    if (!append) gallery.empty();
    images.forEach(image => {
        const imageElement = $(`
            <div class="image">
                <img src="${image.urls.thumb}" alt="${image.alt_description}">
            </div>
        `);
        imageElement.on('click', function() {
            modalImage.attr('src', image.urls.regular);
            modalTitle.text(image.description || 'No title');
            modalDescription.text(image.alt_description || 'No description');
            modalLikes.text(`Likes: ${image.likes}`);
            modal.show();
        });
        gallery.append(imageElement);
    });
}
