import { useEffect, useState } from "react";
import { MovieModel } from "../../../Models/MovieModel";
import { movieService } from "../../../Services/MovieService";
import "./MovieList.css";
import { MovieCard } from "../MovieCard/MovieCard";
import { notify } from "../../../Utils/notify";
import { useTitle } from "../../../Utils/UseTitle";
import { PageTitle } from "../../LayoutArea/PageTitle/PageTitle";
import { Button } from "@mui/material";

export function MovieList(): JSX.Element {

    useTitle("Shalev's Movies");
    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        getMovies(false)
    }, []);

    const resetMoviesData = async () => {
        movieService.resetAllMovies()
            .then(dbMovies => {
                console.log({ dbMovies })
                setMovies(dbMovies)
            })
            .catch(err => notify.error(err));
    };

    const getMovies = async (force: boolean) => {
        movieService.getAllMovies(force)
            .then(dbMovies => {
                console.log({ dbMovies })
                setMovies(dbMovies)
            })
            .catch(err => notify.error(err));
    };

    return (
        <div className="MovieList">
            <PageTitle title="Movie List" />

            <div >
                <Button className="moviesButton" variant="contained" color="primary" onClick={resetMoviesData}>
                    Reset Movies Data
                </Button>
                <Button className="moviesButton" variant="contained" color="primary" onClick={() => getMovies(true)}>
                    Refresh Movies List
                </Button>
            </div>

            {movies && movies.length > 0 ?
                <>
                    <p>Click to Edit or Delete Movie</p>
                    {movies.map(movie => <MovieCard key={movie.externalId} movie={movie} />)}
                </> :
                <>
                    <PageTitle title="The movie list is empty. Click to reset the Movies data" />
                </>
            }
        </div>
    );
}
