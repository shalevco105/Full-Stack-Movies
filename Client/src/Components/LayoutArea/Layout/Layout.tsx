import { Copyrights } from "../Copyrights/Copyrights";
import { Header } from "../Header/Header";
import { SideNavbar } from "../SideNavbar/SideNavbar";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Header />
            </header>
            <aside>
                <SideNavbar />
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
                <Copyrights />
            </footer>
        </div>
    );
}
