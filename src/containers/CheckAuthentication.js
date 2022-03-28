import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuth } from '../../Auth';

function CheckAuthentication({ children }) {

    const authContext = useAuth();

    useEffect(() => {
        console.log('CHECK AUTHENTICATION => ', authContext.currentUser);

        // console.log('FIRE BASE CHECK => , ', getAuth().);

    }, [authContext]);

    return (
        <>
            {children}
        </>
    )
}

export default CheckAuthentication