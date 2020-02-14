const filteredMovies = (data, filter) => {
    data.forEach((item) => {if (item.Title.indexOf(filter)){console.log(item.Title)}});
}