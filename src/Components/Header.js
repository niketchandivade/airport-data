import "../styles/Header.css";

export default function Header(props) {
    const name = props.name;

    return (
        <div>
            <header className="Navbar">
                <div className="Toolbar">
                    <div className="Title"> {name} </div>
                </div>
            </header>
        </div>
    );
}
