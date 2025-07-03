import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/" className="logo">Ani<span>preneur</span></Link>
            <a href="https://www.youtube.com/@Anipreneur" target="_blank" rel="noopener noreferrer" className="btn">Subscribe Now</a>
        </header>
    );
}
