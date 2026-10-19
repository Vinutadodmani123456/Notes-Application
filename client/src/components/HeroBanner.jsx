import React from 'react';
import { Feather, Sun, Moon } from 'lucide-react';
import bannerCenterArt from '../assets/banner_center_art_hd.png';

/**
 * HeroBanner Component
 * Directly matches user's new reference banner:
 * - Top-left: NoteNest logo badge + NoteNest text
 * - Left: ☀️ Good Afternoon, / Vinuta! / Small notes. Big dreams. ✨
 * - Center: 3D purple journal, heart, pen, paper stack, and potted plant
 * - Right: "A little progress each day adds up to big results." with outline heart ~ ♡ ~ doodle
 * - Top-right: subtle theme toggle
 */
export const HeroBanner = ({
  theme,
  onToggleTheme,
  userName = 'Vinuta',
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <section className="hero-banner-card new-aesthetic-banner" aria-label="Welcome Banner">
      {/* Top Controls: Theme Toggle on top-right */}
      <button
        type="button"
        className="hero-theme-toggle-btn"
        onClick={onToggleTheme}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle theme"
        id="btn-hero-theme-toggle"
      >
        {theme === 'dark' ? <Moon size={18} color="#c084fc" /> : <Sun size={19} color="#6366f1" />}
      </button>

      {/* Top-Left: NoteNest Logo & Brand */}
      <div className="banner-brand-badge">
        <div className="banner-brand-icon">
          <Feather size={14} color="#ffffff" strokeWidth={2.5} />
        </div>
        <span className="banner-brand-name">NoteNest</span>
      </div>

      {/* Banner Main Content Grid */}
      <div className="banner-content-grid">
        {/* Left Column: Greeting */}
        <div className="banner-greeting-col">
          <div className="banner-greeting-row">
            <span className="banner-sun-emoji" role="img" aria-label="Sun">☀️</span>
            <span className="banner-greeting-prefix">{getGreeting()},</span>
          </div>
          <h1 className="banner-user-headline">{userName}!</h1>
          <p className="banner-tagline-text">Small notes. Big dreams. ✨</p>
        </div>

        {/* Center: 3D Illustration */}
        <div className="banner-illustration-col">
          <img
            src={bannerCenterArt}
            alt="NoteNest 3D Journal and Pen"
            className="banner-3d-illustration-img"
          />
        </div>

        {/* Right Column: Quote & Hand-drawn Heart Doodle */}
        <div className="banner-quote-col">
          <p className="banner-quote-text">
            &ldquo;A little progress<br />
            each day adds up<br />
            to big results.&rdquo;
          </p>
          <div className="banner-heart-doodle" aria-hidden="true">
            <svg width="86" height="24" viewBox="0 0 86 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Left doodle line */}
              <path d="M4 14 C18 10, 24 16, 36 12" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" />
              {/* Center cute heart */}
              <path
                d="M43 14 C43 14, 38 7, 41 4 C44 1.5, 47.5 4, 49 6.5 C50.5 4, 54 1.5, 57 4 C60 7, 55 14, 49 20 C43 14, 43 14, 43 14 Z"
                stroke="#8b5cf6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Right doodle line */}
              <path d="M62 13 C72 16, 78 11, 82 14" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
