// src\COMPONENTS\DASHBOARD\Pages\Home.js
import React from 'react';
import '../Style/home.css';
import '../Style/Transaction.css'; // Import Transaction's CSS

function Home() {
  return (
    <main className="hero transaction-container"> {/* Added transaction-container class */}
      {/* Background Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>
      <div className="bg-circle bg-circle-3"></div>
      <div className="bg-circle bg-circle-4"></div>

      <div className="home-content transaction-content"> {/* Using transaction-content for inner styling */}
        <div className="blue-circle bottom-left"></div>
        <div className="blue-circle-gradient bottom-left-large"></div>
        <div className="small-circle top-right-small"></div>
        <div className="small-circle bottom-right-small"></div>
        <div className="small-circle left-center"></div>

        <h2>Fast, Smart and</h2>
        <h1>Smooth Trade</h1>
        <div className="line-deco"></div>
        <p className="description">
          MerchXpress is a modern marketplace designed for efficiency and convenience.
          We connect merchants and buyers through a seamless trading experience,
          offering smart features, secure transactions, and a user-friendly interface.
        </p>
        <div className="line-deco"></div>
        <p className="join">Be Part of Us! <a href="/register">JOIN NOW</a></p>
      </div>
    </main>
  );
}

export default Home;