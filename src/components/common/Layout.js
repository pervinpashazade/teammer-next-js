import React, { useState } from "react";
import Header from "../consts/Header";
import Footer from "../consts/Footer";
import { useAuth } from "../../../Auth";

const Layout = ({ children }) => {

    const authContext = useAuth();

    const [user, setUser] = useState(authContext);

    React.useEffect(() => {
        setUser(authContext.currentUser);
    }, [authContext.currentUser])

    return (
        <div className="container">
            <Header user={user} />
            <main>
                {children}
            </main>
            <Footer user={user} />
        </div>
    )
}
export default Layout
