import { Link } from "react-router-dom"

const Basket = () => {
    return (
        <section>
            <h1>Kosaram</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
    )
}

export default Basket;