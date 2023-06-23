import React from 'react';
import NavbarComp from '@/components/Navbar';
const RootLayout =({children}: any) =>{
    return(
        <>
        <div>
            <NavbarComp/>

        </div>
        <main>{children}</main>
        </>
    )
}

export default RootLayout;