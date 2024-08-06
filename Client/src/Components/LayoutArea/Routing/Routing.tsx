import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { MovieList } from "../../MovieArea/MovieList/MovieList";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Suspense, lazy } from "react";
import { MovieDetails } from "../../MovieArea/MovieDetails/MovieDetails";
import { AddMovie } from "../../MovieArea/AddMovie/AddMovie";
import { EditMovie } from "../../MovieArea/EditMovie/EditMovie";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { ContactMe } from "../../AboutArea/ContactMe/ContactMe";
import GeminiForm from "../../HomeArea/GeminiForm/GeminiForm";
import AuthWrapper from "../AuthWrapper";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";

export function Routing(): JSX.Element {
    const isAuthenticated = !!useSelector<AppState, UserModel>(store => store.user);
    const LazyAbout = lazy(() => import("../../AboutArea/About/About"));
    const suspenseAbout = <Suspense> <LazyAbout /> </Suspense>

    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/gemini" element={
                    <AuthWrapper isAuthenticated={isAuthenticated}>
                        <GeminiForm />
                    </AuthWrapper>
                } />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/movies" element={
                    <AuthWrapper isAuthenticated={isAuthenticated}>
                        <MovieList />
                    </AuthWrapper>
                } />
                <Route path="/movies/details/:externalId" element={
                    <AuthWrapper isAuthenticated={isAuthenticated}>
                        <MovieDetails />
                    </AuthWrapper>
                } />

                <Route path="/movies/new" element={
                    <AuthWrapper isAuthenticated={isAuthenticated}>
                        <AddMovie />
                    </AuthWrapper>
                } />

                <Route path="/movies/edit/:externalId" element={
                    <AuthWrapper isAuthenticated={isAuthenticated}>
                        <EditMovie />
                    </AuthWrapper>
                } />

                <Route path="/about" element={suspenseAbout} />
                <Route path="/contact-us" element={<ContactMe />} />

                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}
