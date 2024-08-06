import { PageTitle } from "../PageTitle/PageTitle";
import "./PageNotFound.css";

export function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <PageTitle title="The page you are looking for doesn't exist." />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true" allow="autoplay" title="Page not Found"></iframe>
        </div>
    );
}
