'use client';

import { useState, useEffect, useRef } from 'react';

export default function TerminalPuzzle() {
    const [typedLines, setTypedLines] = useState([]);
    const [isTyping, setIsTyping] = useState(true);
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showVideo, setShowVideo] = useState(false);

    const terminalBodyRef = useRef(null);
    const keyInputRef = useRef(null);
    const sectionRef = useRef(null);
    const animationTimeoutRef = useRef(null); // Ref to hold the timeout ID

    const linesToType = [
        { text: 'Booting AYANOKOJI_PROTOCOLS.EXE...', delay: 50 },
        { text: 'Bypassing security layers... Done.', delay: 50 },
        { text: 'Accessing encrypted file: [PROJECT_NIGHTFALL]', delay: 50 },
        { text: '...', delay: 500 },
        { text: 'FILE CONTENTS:', delay: 50, class: 'highlight' },
        { text: 'XLI GVYI QEXXIV MW RSX E TEWWZI XSSPM RKIVC XS FI AMIPHIH FYX E JSVGI XS FI WLETIH.', delay: 20 },
        { text: '...', delay: 500 },
        { text: 'DECRYPTION HINT:', delay: 50, class: 'highlight' },
        { text: "The key is the ultimate tool of the puppet master.", delay: 50 },
        { text: 'Awaiting user input...', delay: 50 }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let currentLineIndex = 0;
                    
                    const typeLine = () => {
                        if (currentLineIndex >= linesToType.length) {
                            setIsTyping(false);
                            setShowPuzzle(true);
                            setTimeout(() => keyInputRef.current?.focus(), 100);
                            return;
                        }

                        const lineData = linesToType[currentLineIndex];
                        setTypedLines(prev => [...prev, { text: '', class: lineData.class || '' }]);
                        let charIndex = 0;

                        const typeChar = () => {
                            if (charIndex < lineData.text.length) {
                                // --- THIS IS THE CORRECTED, IMMUTABLE STATE UPDATE ---
                                setTypedLines(prev => {
                                    const newLines = [...prev]; // 1. Create shallow copy of the array
                                    const lineToUpdate = { ...newLines[currentLineIndex] }; // 2. Create shallow copy of the object to modify
                                    lineToUpdate.text += lineData.text.charAt(charIndex); // 3. Modify the copy
                                    newLines[currentLineIndex] = lineToUpdate; // 4. Place the modified copy back into the array
                                    return newLines; // 5. Set the new state
                                });
                                // --- END OF FIX ---

                                if (terminalBodyRef.current) {
                                    terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
                                }
                                charIndex++;
                                animationTimeoutRef.current = setTimeout(typeChar, lineData.delay / 2);
                            } else {
                                currentLineIndex++;
                                animationTimeoutRef.current = setTimeout(typeLine, lineData.delay * 2);
                            }
                        };
                        typeChar();
                    };

                    animationTimeoutRef.current = setTimeout(typeLine, 500);
                    observer.unobserve(sectionRef.current);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleDecryption = () => {
        const CORRECT_KEY = "MANIPULATE";
        if (inputValue.toUpperCase().trim() === CORRECT_KEY) {
            setMessage({ text: 'ACCESS GRANTED. DECRYPTION SUCCESSFUL.', type: 'success-message' });
            setShowPuzzle(false);
            setShowVideo(true);
        } else {
            setMessage({ text: 'ACCESS DENIED. KEY INCORRECT. SECURITY ALERT TRIGGERED.', type: 'error-message' });
            setInputValue('');
            keyInputRef.current?.focus();
        }
    };

    return (
        <div className="terminal" data-aos="zoom-in" ref={sectionRef}>
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="btn-close"></span><span className="btn-min"></span><span className="btn-max"></span>
                </div>
                <div className="terminal-title">AYANOKOJI_PROTOCOLS.EXE</div>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {typedLines.map((line, index) => (
                    <div key={index} className={`line ${line.class}`}>{line.text}</div>
                ))}
                {isTyping && <span className="cursor">█</span>}
            </div>
            {showPuzzle && (
                <div className="puzzle-container visible">
                    <div id="terminal-message" className={message.type}>{message.text}</div>
                    <div className="input-group">
                        <label htmlFor="decryption-key"> Enter Decryption Key:</label>
                        <input type="text" id="decryption-key" name="decryption-key" autoComplete="off" ref={keyInputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyUp={e => e.key === 'Enter' && handleDecryption()} />
                        <button className="decrypt-btn" onClick={handleDecryption}>DECRYPT</button>
                    </div>
                </div>
            )}
            {showVideo && (
                <div className="video-reveal visible">
                    <h3>// DECRYPTION SUCCESSFUL: PROJECT_NIGHTFALL.MP4</h3>
                    <div className="decrypted-message">"True mastery isn't about the cards you're dealt, but how you play the hand."</div>
                    <div className="video-wrapper">
                        <iframe src="https://www.youtube.com/embed/YOUR_SECRET_VIDEO_ID" title="Secret Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}