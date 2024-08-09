import "./Home.css";
import { useTitle } from "../../../Utils/UseTitle";
import { PageTitle } from "../../LayoutArea/PageTitle/PageTitle";
import SocialIcon from "../../AboutArea/SocialIcon/SocialIcon";

export function Home(): JSX.Element {
    useTitle("Shalev's Movies Home");
    return (
        <div className="Home">
            <PageTitle title="Welcome to Shalev's Movies Website!!" />
            <iframe width="560" height="315" src="https://www.youtube.com/embed/RWH8_tvsMBc?autoplay=true" allow="autoplay" title="Page not Found"></iframe>
            <div className="social-icons">
                <SocialIcon title="Facebook" link="https://www.facebook.com/profile.php?id=100001302181122" />
                <SocialIcon title="LinkedIn" link="https://www.linkedin.com/in/shalev-cohen%F0%9F%87%AE%F0%9F%87%B1-a80b77232/" />
                <SocialIcon title="Instagram" link="https://www.instagram.com/shalev.cohen1/" />
            </div>
        </div>
    );
}
