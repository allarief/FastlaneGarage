"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/banner1.png",
    "/images/banner2.jpg",
    "/images/sparepart3.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  return (
    <div className="dashboard">
      {/* Slider Section */}
      <div className="slider">
        <button onClick={prevSlide} className="prev-btn">Prev</button>
        <div className="slide-container">
          <Image
            src={images[currentSlide]}
            alt={`Sparepart slide ${currentSlide + 1}`}
            layout="fill" // Ensures the image fills the container
            objectFit="cover" // Keeps the image proportions while covering the container
            className="slider-image"
          />
        </div>
        <button onClick={nextSlide} className="next-btn">Next</button>
      </div>

      {/* Sparepart Listing Section */}
      <div className="sparepart-listing">
        <h2>New Launching!</h2>
        <br></br>
        <div className="spareparts">
          <div className="sparepart-item">
            <Image
              src="/images/new1.jpg"
              alt="Sparepart 1"
              width={200}
              height={200}
            />
            <p>Sparepart 1</p>
            <Link href="/sparepart/1">Lihat Detail</Link>
          </div>
          <div className="sparepart-item">
            <Image
              src="/images/sparepart2.jpg"
              alt="Sparepart 2"
              width={200}
              height={200}
            />
            <p>Sparepart 2</p>
            <Link href="/sparepart/2">Lihat Detail</Link>
          </div>
          <div className="sparepart-item">
            <Image
              src="/images/sparepart3.jpg"
              alt="Sparepart 3"
              width={200}
              height={200}
            />
            <p>Sparepart 3</p>
            <Link href="/sparepart/3">Lihat Detail</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 20px;
          font-family: 'Roboto', sans-serif;
          background-color: #f7f7f7; /* Soft light background */
          color: #333; /* Dark grey text for readability */
        }

        header {
          text-align: center;
          margin-bottom: 30px;
          color: #2c3e50; /* Elegant dark blue */
        }

        h1 {
          font-size: 2rem;
        }

        .slider {
          position: relative;
          width: 100%;
          margin-bottom: 40px;
          border: 2px solid #bdc3c7; /* Light grey border for subtle elegance */
          border-radius: 10px;
          overflow: hidden;
        }

        .slide-container {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
        }

        .slider-image {
          object-fit: cover; /* Ensures image covers the entire container */
          width: 100%;
          height: 100%;
        }

        .prev-btn, .next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(44, 62, 80, 0.7); /* Dark transparent background */
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 1.5rem;
          border-radius: 5px;
        }

        .prev-btn {
          left: 10px;
        }

        .next-btn {
          right: 10px;
        }

        .sparepart-listing {
          text-align: center;
          margin-top: 40px;
        }

        .spareparts {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .sparepart-item {
          text-align: center;
          background-color: #ffffff; /* Clean white background */
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
          transition: all 0.3s ease;
        }

        .sparepart-item:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Increased shadow on hover */
          transform: scale(1.05);
        }

        .sparepart-item img {
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .sparepart-item p {
          margin-top: 10px;
          color: #2c3e50; /* Elegant dark text color */
        }

        .sparepart-item a {
          color: #3498db; /* Elegant blue for links */
          text-decoration: none;
          font-weight: bold;
        }

        .sparepart-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
