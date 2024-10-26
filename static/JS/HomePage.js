//#region SlidingMovies

//When window is loaded it runs the following JavaScript
window.onload = function(){
    const sliders = {};

    //Gets each slider container an splits it up in to constants
    //Needs to be done as there are 3 sliders all using this one piece of code
    document.querySelectorAll('.movie-slider-container').forEach((slider) => {
        const sliderId = slider.id;
        //Holds all the movie posters in 1 line
        const movieWrapper = document.getElementById(`movieWrapper${sliderId.charAt(sliderId.length - 1)}`);
        //Holds a single movie
        const movies = movieWrapper.querySelectorAll('.movie');

        //
        let currentSlide = 0;
        //Sets the amount of movie posters that should be visible
        const visibleMovies = 5;
        //Sets the width of the movie poster
        const movieWidth = 240;
        //The number of movies is the total amount of times 
        //the const "movies" was created, this value is stored
        const totalMovies = movies.length;

        for (let i = 0; i < visibleMovies; i++) {
            //Makes a copy of the first and last 5 movie posters
            const cloneFirst = movies[i].cloneNode(true);
            const cloneLast = movies[totalMovies - 1 - i].cloneNode(true);
            //Adds the cloned movie posters to each end of
            //the movie wrapper(all movies in 1 line)
            movieWrapper.appendChild(cloneFirst);
            movieWrapper.insertBefore(cloneLast, movieWrapper.firstChild);
        }

        //Now that copies have been made the total number of movies has increased
        const updatedTotalMovies = movieWrapper.children.length;

        //Sets the slide position to that of showing the first 5 movie posters
        let currentSlidePos = visibleMovies;
        //Sets the movie wrapper position to its basic where the first 5 movies are visible 
        movieWrapper.style.transform = `translateX(-${currentSlidePos * movieWidth}px)`;

        function slideRight() {
            //Everytime the user presses the slide rigth button it first checks if the
            //rest of the variables are correct, if they are it adds one to the current
            //position and moves the style wrapper 1 movie poster along
            if (currentSlidePos < updatedTotalMovies - visibleMovies) {
                currentSlidePos++;
                movieWrapper.style.transition = 'transform 0.5s ease';
                movieWrapper.style.transform = `translateX(-${currentSlidePos * movieWidth}px)`;
            } else {
            //If the variables dont match it will skip the transition and move the movie
            //warpper staight to its correct location
                currentSlidePos = visibleMovies;
                movieWrapper.style.transition = 'none';
                movieWrapper.style.transform = `translateX(-${currentSlidePos * movieWidth}px)`;
            }
        }

        function slideLeft() {
            if (currentSlidePos > 0) {
                currentSlidePos--;
                movieWrapper.style.transition = 'transform 0.5s ease';
                movieWrapper.style.transform = `translateX(-${currentSlidePos * movieWidth}px)`;
            } else {
                currentSlidePos = updatedTotalMovies - visibleMovies * 2;
                movieWrapper.style.transition = 'none';
                movieWrapper.style.transform = `translateX(-${currentSlidePos * movieWidth}px)`;
            }
        }

        //Fills an array with JavaScript functions so that the id 
        //can be differentiated from one another
        sliders[sliderId] = { slideRight, slideLeft };
    });

    //When the arrow button is clicked it comes here which calls the function while
    //maintaining the array of sqlider id's
    window.slideRight = function(sliderId){
        sliders[sliderId].slideRight();
    };

    window.slideLeft = function(sliderId){
        sliders[sliderId].slideLeft();
    };
};

//#endregion
