import { useEffect, useState } from "react";
import { MovieModel } from "../../../Models/MovieModel";
import { movieService } from "../../../Services/MovieService";
import "./MovieList.css";
import { MovieCard } from "../MovieCard/MovieCard";
import { notify } from "../../../Utils/notify";
import { useTitle } from "../../../Utils/UseTitle";
import { PageTitle } from "../../LayoutArea/PageTitle/PageTitle";
import axios from "axios";
import { Button } from "@mui/material";
import { appConfig } from "../../../Utils/AppConfig";

export function MovieList(): JSX.Element {

    useTitle("Shalev's Movies");

    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        movieService.getAllMovies()
            .then(dbMovies => setMovies(dbMovies))
            .catch(err => notify.error(err));
    }, []);

    const resetMoviesData = async () => {
        try {
            const response = await axios.get(appConfig.moviesUrl + 'reset');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    return (
        <div className="MovieList">
            {movies ?
                <>
                    <PageTitle title="Click to Edit or Delete" />
                    {movies.map(movie => <MovieCard key={movie.externalId} movie={movie} />)}
                </> :
                <>
                    <PageTitle title="The movie list is empty. Click to reset the Movies data" />
                </>
            }

            <div className="resetMovies">
                <Button variant="contained" color="primary" onClick={resetMoviesData}>
                    Reset Movies Data
                </Button>
            </div>
        </div>
    );
}
