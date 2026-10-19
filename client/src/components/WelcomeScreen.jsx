import React from 'react';

/**
 * WelcomeScreen Component
 * First-load splash / onboarding screen matching the user's reference image:
 * - Hand holding purple pen writing on spiral notebook with purple plant & eraser
 * - "Quick Notes" script title
 * - "Capture your thoughts instantly" tagline
 * - "Get Started" bottom button
 */
export const WelcomeScreen = ({ onGetStarted }) => {
  return (
    <div className="welcome-screen-wrapper">
      <div className="welcome-card-container">
        {/* Top Illustration Area */}
        <div className="welcome-illustration-box">
          <svg
            className="welcome-svg-art"
            viewBox="0 0 380 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Decorative Glow */}
            <circle cx="190" cy="160" r="130" fill="url(#purpleGlow)" opacity="0.35" />

            {/* Purple Plant / Succulent behind notebook on top right */}
            <g transform="translate(240, 25)">
              {/* Plant leaves radiating outward */}
              <path d="M40 50 C20 15, 60 5, 45 45 Z" fill="#9333ea" />
              <path d="M45 45 C30 5, 80 15, 55 50 Z" fill="#a855f7" />
              <path d="M50 50 C55 10, 100 35, 60 55 Z" fill="#7e22ce" />
              <path d="M55 55 C80 25, 110 60, 65 65 Z" fill="#9333ea" />
              <path d="M55 60 C85 50, 110 85, 65 75 Z" fill="#c084fc" />
              <path d="M55 65 C95 80, 100 110, 60 85 Z" fill="#7e22ce" />
              <path d="M50 70 C75 95, 80 125, 45 90 Z" fill="#a855f7" />
              <path d="M45 75 C55 110, 50 135, 35 95 Z" fill="#9333ea" />
              <path d="M40 75 C30 115, 15 130, 25 90 Z" fill="#c084fc" />
              <path d="M35 70 C10 100, -5 110, 15 80 Z" fill="#7e22ce" />
              <path d="M30 65 C-10 80, -20 70, 10 60 Z" fill="#a855f7" />
              <path d="M30 55 C-10 50, -5 30, 20 45 Z" fill="#9333ea" />
              <path d="M35 50 C5 25, 20 10, 35 40 Z" fill="#c084fc" />
              {/* Plant center pot/base */}
              <circle cx="40" cy="65" r="14" fill="#581c87" />
              <circle cx="40" cy="65" r="8" fill="#3b0764" />
            </g>

            {/* Purple Highlighter / Eraser on the left */}
            <g transform="translate(60, 60) rotate(-15)">
              <rect x="0" y="0" width="34" height="75" rx="8" fill="#7e22ce" stroke="#581c87" strokeWidth="2.5" />
              {/* Eraser cap / top band */}
              <rect x="0" y="45" width="34" height="30" rx="6" fill="#581c87" />
              {/* Highlight shine */}
              <line x1="8" y1="8" x2="8" y2="40" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Spiral Notebook Container */}
            <g transform="translate(100, 40) rotate(-4)">
              {/* Shadow */}
              <rect x="12" y="16" width="165" height="215" rx="14" fill="rgba(88, 28, 135, 0.12)" />
              {/* Notebook Cover / Back */}
              <rect x="0" y="0" width="165" height="215" rx="12" fill="#ffffff" stroke="#581c87" strokeWidth="2.8" />

              {/* Ruled lines on paper */}
              <line x1="28" y1="42" x2="148" y2="42" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="64" x2="148" y2="64" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="86" x2="148" y2="86" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="108" x2="148" y2="108" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="130" x2="148" y2="130" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="152" x2="148" y2="152" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="174" x2="148" y2="174" stroke="#e2e8f0" strokeWidth="1.8" />
              <line x1="28" y1="196" x2="148" y2="196" stroke="#e2e8f0" strokeWidth="1.8" />

              {/* Purple highlight scribble on line 2 */}
              <rect x="30" y="58" width="55" height="12" rx="3" fill="#e9d5ff" opacity="0.9" />

              {/* Cursive handwritten text on the lines */}
              <path
                d="M 32 62 Q 40 56, 48 64 T 65 60 T 80 62 T 115 59"
                fill="none"
                stroke="#4a044e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 32 84 Q 45 78, 58 86 T 78 82 T 100 84 T 130 81"
                fill="none"
                stroke="#581c87"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 32 106 Q 48 100, 64 108 T 88 104 T 120 106"
                fill="none"
                stroke="#6b21a8"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Spiral rings on the left edge */}
              {[15, 35, 55, 75, 95, 115, 135, 155, 175, 195].map((y) => (
                <g key={y}>
                  <ellipse cx="6" cy={y} rx="9" ry="4" fill="none" stroke="#581c87" strokeWidth="2.4" />
                  <circle cx="6" cy={y} r="2" fill="#581c87" />
                </g>
              ))}
            </g>

            {/* Hand holding a purple pen writing on the notebook */}
            <g transform="translate(185, 95)">
              {/* Hand silhouette / outline */}
              {/* Forearm & Wrist */}
              <path
                d="M 68 185 C 65 140, 55 110, 48 95 C 44 88, 38 80, 28 78 C 20 76, 12 80, 8 85 C 2 92, 0 100, 2 110 C 6 128, 25 150, 52 188 Z"
                fill="#ffffff"
                stroke="#1e1b4b"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />

              {/* Thumb and Index fingers holding pen */}
              <path
                d="M 28 78 C 20 72, 8 72, 2 80 C -4 88, -2 98, 8 104 C 18 108, 28 102, 34 94"
                fill="#ffffff"
                stroke="#1e1b4b"
                strokeWidth="2.4"
              />

              {/* Purple Pen */}
              <g transform="translate(-25, 75) rotate(-35)">
                {/* Pen Body */}
                <rect x="0" y="0" width="11" height="90" rx="4" fill="#7e22ce" stroke="#3b0764" strokeWidth="2.2" />
                {/* Pen Tip / Grip */}
                <polygon points="0,0 11,0 5.5,-16" fill="#d8b4fe" stroke="#3b0764" strokeWidth="2" />
                {/* Pen Nib touching paper */}
                <circle cx="5.5" cy="-16" r="1.5" fill="#3b0764" />
                {/* Pen Clip & Accent Band */}
                <rect x="1" y="24" width="9" height="5" fill="#facc15" />
                <rect x="-3" y="10" width="3" height="35" rx="1.5" fill="#e2e8f0" stroke="#3b0764" strokeWidth="1.2" />
              </g>

              {/* Knuckles & Finger Details */}
              <path d="M 12 86 C 18 90, 24 88, 30 84" fill="none" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M 22 96 C 28 100, 34 98, 38 92" fill="none" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
            </g>

            {/* Gradient definition */}
            <defs>
              <radialGradient id="purpleGlow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Text Section matching the reference */}
        <div className="welcome-content-text">
          <h1 className="welcome-script-title">Quick Notes</h1>
          <p className="welcome-subtitle">Capture your thoughts instantly</p>
        </div>

        {/* Bottom Full-Width "Get Started" Button */}
        <div className="welcome-footer-action">
          <button
            type="button"
            className="welcome-btn-get-started"
            onClick={onGetStarted}
            id="btn-welcome-get-started"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
