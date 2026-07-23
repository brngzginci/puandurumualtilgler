/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const LowerLeagueSocialStrip: React.FC = () => {
  return (
    <div className="lower-league-social-strip">
      {/* Brand Icon Box */}
      <div className="lower-league-social-logo-box">
        <img
          src="/branding/altligler-logo.png"
          alt="AltLigler"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' height='1'></svg>";
          }}
        />
      </div>

      {/* 5 Social Media Handles */}
      <div className="lower-league-social-items">
        {/* X (Twitter) */}
        <div className="lower-league-social-item">
          <svg className="w-[18px] h-[18px] fill-current flex-shrink-0" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>AltLiglerTR</span>
        </div>

        {/* Facebook */}
        <div className="lower-league-social-item">
          <svg className="w-[18px] h-[18px] fill-current flex-shrink-0" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>AltLiglerTR</span>
        </div>

        {/* Instagram */}
        <div className="lower-league-social-item">
          <svg className="w-[18px] h-[18px] stroke-current fill-none flex-shrink-0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          <span>altligler</span>
        </div>

        {/* Threads */}
        <div className="lower-league-social-item">
          <svg className="w-[18px] h-[18px] fill-current flex-shrink-0" viewBox="0 0 24 24">
            <path d="M12.001 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10.001 10 2.822 0 5.41-.18 7.428-2.613l-1.554-1.28c-1.458 1.758-3.535 1.893-5.874 1.893-4.418 0-7.923-3.41-7.923-7.999 0-4.59 3.505-8 7.923-8 3.978 0 7.025 2.766 7.025 6.84 0 2.453-1.026 4.16-2.66 4.16-1.042 0-1.637-.692-1.428-1.894l.808-4.529h-2.023l-.128.723c-.391-.561-1.127-.852-1.972-.852-2.186 0-3.956 1.89-3.956 4.184 0 2.227 1.638 3.864 3.732 3.864 1.114 0 2.019-.481 2.585-1.29.58 1.109 1.83 1.69 3.327 1.69 2.923 0 4.743-2.392 4.743-6.155C22.028 6.068 17.53 2 12.001 2zm-.575 12.28c-1.14 0-1.996-.867-1.996-2.062 0-1.222.883-2.128 2.023-2.128 1.14 0 1.968.878 1.968 2.1 0 1.222-.855 2.09-1.995 2.09z"/>
          </svg>
          <span>altligler</span>
        </div>

        {/* TikTok */}
        <div className="lower-league-social-item">
          <svg className="w-[18px] h-[18px] fill-current flex-shrink-0" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.27 6.27 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.83 4.47V10.23a8.16 8.16 0 0 0 4.76 1.52V8.3a4.85 4.85 0 0 1-1-.16v-1.45z"/>
          </svg>
          <span>altligler</span>
        </div>
      </div>
    </div>
  );
};

export default LowerLeagueSocialStrip;
