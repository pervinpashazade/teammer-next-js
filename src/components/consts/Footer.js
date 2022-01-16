import Image from "next/image";
import Link from "next/link";
import LogoFooter from '../../../public/LogoFooter.svg'

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <Link href="/">
                    <a>
                        <Image
                            src={LogoFooter}
                            alt="img"
                            width={121}
                            height={16}
                            layout="fixed"
                        />
                    </a>
                </Link>
            </div>
            <div className="footer-links">
                <ul>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/facebook.svg" /> */}
                            <Image
                                src={'/social-images/facebook.svg'}
                                alt='facebook img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/instagram.svg" /> */}
                            <Image
                                src={'/social-images/instagram.svg'}
                                alt='instagram img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/twitter.svg" /> */}
                            <Image
                                src={'/social-images/twitter.svg'}
                                alt='twitter img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/youtube.svg" /> */}
                            <Image
                                src={'/social-images/youtube.svg'}
                                alt='youtube img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/tiktok.svg" /> */}
                            <Image
                                src={'/social-images/tiktok.svg'}
                                alt='tiktok img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a className="icons">
                            {/* <img src="/social-images/linkedin.svg" /> */}
                            <Image
                                src={'/social-images/linkedin.svg'}
                                alt='linkedin img'
                                width={12}
                                height={12}
                                layout='fixed'
                            />
                        </a>
                    </Link></li>
                    <li>
                        <Link href="/">
                            <a>
                                Explore
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Blog
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Company
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/app" passHref>
                            <a>
                                About
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Support
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Send feedback
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Terms of service
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            <a>
                                Privacy policy
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Footer
