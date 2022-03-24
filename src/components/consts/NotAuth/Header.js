import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Header() {
    return (
        <div className="_header">
            <Link href="/" passHref>
                <a className="navbar-brand">
                    <Image
                        src={'/LogoHeader.svg'}
                        alt='logo'
                        width={136}
                        height={18}
                    />
                </a>
            </Link>
            <Link href="/" passHref>
                <a>
                    <Image
                        src={'/icons/help.svg'}
                        alt='icon'
                        width={24}
                        height={24}
                    />
                    <span>Help</span>
                </a>
            </Link>
        </div>
    )
}

export default Header