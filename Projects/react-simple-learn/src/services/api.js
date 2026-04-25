const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";  // 去掉末尾的斜杠

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const movies = await response.json();
    return movies.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const movies = await response.json();
    return movies.results;
}