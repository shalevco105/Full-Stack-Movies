import "./Home.css";
import { useTitle } from "../../../Utils/UseTitle";
import GeminiForm from "../GeminiForm/GeminiForm";
import { PageTitle } from "../../LayoutArea/PageTitle/PageTitle";

export function Home(): JSX.Element {
    useTitle("Shalev's Movies Home");
    return (
        <div className="Home">
            <PageTitle title="Welcome to Shalev's Movies Website" />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/RWH8_tvsMBc?autoplay=true" allow="autoplay" title="Page not Found"></iframe>
        </div>
    );
}
