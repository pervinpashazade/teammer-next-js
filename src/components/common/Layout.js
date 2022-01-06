import Header from "../consts/Header";
import Footer from "../consts/Footer";

const Layout = ({children}) => {
    return (
        <div className="container">
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}
export default Layout
