import Link from "next/link";
import navStyles from "./nav.module.css";

export default function Nav() {
    return (
        <nav>
            <ul className={navStyles.mainNav}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/">Search</Link>
                </li>
                <li>
                    <Link href="/">Favorites</Link>
                </li>
            </ul>
        </nav>
    )
}