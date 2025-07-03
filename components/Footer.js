import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="social-links">
                <a href="https://www.youtube.com/@Anipreneur" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} <span>Anipreneur</span>. All Rights Reserved.</p>
        </footer>
    );
}