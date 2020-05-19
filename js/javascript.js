//menu pop-out
const menu = document.getElementById('menu-pop');
const listenToMenu = () => {
	menu.addEventListener('click', (event) => {
		let menuDisplay = document.getElementById('menu');
		menuDisplay.className != 'visible'
			? (menuDisplay.className = 'visible')
			: (menuDisplay.className = 'hidden');
	});
};
//buttons in array
const buttons = Array.from(document.getElementsByClassName('filter-button'));
const listenToButtons = () => {
	buttons.forEach((button) =>
		button.addEventListener('click', (event) =>
			showItems(dataRaw, event.target.value)
		)
	);
};

//searchbar listener
const searchBar = document.getElementById('search-bar');
const listenToSearch = () => {
	searchBar.addEventListener('input', (event) =>
		showItems(dataRaw, event.target.value)
	);
};

//show filtered items
const showItems = (data, filter) => {
	//close menu
	setTimeout(() => {
		document.getElementById('menu').className = 'hidden';
	}, 400);
	//show movies in the DOM
	const parseMovies = (movies, filter) => {
		//clear current list
		const mainUl = document.getElementById('movie-list');
		//Which filter selected?
		const currentFilter = document.getElementById('filter-title');
		currentFilter.innerHTML = filter + ' filter geselecteerd';
		mainUl.innerHTML = '';
		movies.forEach((movie) => {
			const newLi = document.createElement('li');
			const newA = document.createElement('a');
			const newImage = document.createElement('img');
			newImage.src = movie.Poster;
			newImage.title = movie.Title + '\nrelease jaar: ' + movie.Year;
			newImage.classList = 'movie-poster';
			newA.href = 'https://www.imdb.com/title/' + movie.imdbID;
			newA.target = '_blank';
			newLi.classList = 'movie-list-item';
			newA.appendChild(newImage);
			newLi.appendChild(newA);
			mainUl.appendChild(newLi);
		});
	};

	//filter the data based on selected filter or search
	const filteredMovies = (data, filter) => {
		const filteredMovies = Array.from(
			data.filter((item) => item.Title.indexOf(filter) !== -1)
		);
		const newMovies = Array.from(
			data.filter((item) => parseInt(item.Year) > 2014)
		);
		switch (filter) {
			case 'nieuw':
				parseMovies(newMovies, filter);
				break;
			case 'geen':
				parseMovies(data, filter);
				break;
			default:
				parseMovies(filteredMovies, filter);
		}
	};

	filteredMovies(data, filter);
};
//set event listeners, but not before DOM is fully loaded
const setEventListeners = () => {
	listenToButtons();
	listenToSearch();
	listenToMenu();
};

//respect the DOM
document.addEventListener('DOMContentLoaded', function () {
	setEventListeners();
});

//nothing filtered yet so show ALL
showItems(dataRaw, 'geen');
//
