import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Szerkesztő</h1>
            <br />
            <p>Termék szerkesztő</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
            <p>Új termék</p>
            <div className="flexGrow">
                <Link to="/new">Új</Link>
            </div>
        </section>
    )
}

export default Editor