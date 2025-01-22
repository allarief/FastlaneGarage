"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "/images/banner2.jpg",
    "/images/#",
    "/images/#",
  ];

  const catalogImages = [
    { src: "/images/banner1.jpg", alt: "Catalog Item 1", label: "Catalog Item 1" },
    { src: "/images/banner1.jpg", alt: "Catalog Item 2", label: "Catalog Item 2" },
    { src: "/images/catalog3.jpg", alt: "Catalog Item 3", label: "Catalog Item 3" },
    { src: "/images/catalog4.jpg", alt: "Catalog Item 4", label: "Catalog Item 4" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
        <h2 className="section-title">New Launching!</h2>
        <br />
        <div className="spareparts">
          <div className="sparepart-item">
            <Image
              src="/images/sparepart1.png"
              alt="Sparepart 1"
              layout="responsive"
              width={200}
              height={200}
              objectFit="cover"
              className="sparepart-image"
            />
            <p>Sparepart 1</p>
            <Link href="/sparepart/1" className="detail-link">Lihat Detail</Link>
          </div>
          <div className="sparepart-item">
            <Image
              src="/images/sparepart2.jpg"
              alt="Sparepart 2"
              layout="responsive"
              width={200}
              height={200}
              objectFit="cover"
              className="sparepart-image"
            />
            <p>Sparepart 2</p>
            <Link href="/sparepart/2" className="detail-link">Lihat Detail</Link>
          </div>
          <div className="sparepart-item">
            <Image
              src="/images/sparepart3.jpg"
              alt="Sparepart 3"
              layout="responsive"
              width={200}
              height={200}
              objectFit="cover"
              className="sparepart-image"
            />
            <p>Sparepart 3</p>
            <Link href="/sparepart/3" className="detail-link">Lihat Detail</Link>
          </div>
        </div>
      </div>

      <br />

      <div className="hero-container flex w-full">
        {/* Hero Section */}
        <div className="hero bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 min-h-screen text-white flex flex-col items-center justify-center relative w-full overflow-hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 sm:px-8">
            <h1 className="text-5xl font-extrabold mb-4 text-shadow-lg animate__animated animate__fadeInUp animate__delay-1s">
              Discover Our Amazing Products
            </h1>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-shadow-md animate__animated animate__fadeInUp animate__delay-2s">
              Explore a wide range of innovative products tailored for your needs. Quality, durability, and style all in one place!
            </p>
            <Link href="#catalog">
              <button className="btn btn-primary btn-lg shadow-lg hover:scale-110 hover:bg-blue-800 transition-all transform animate__animated animate__fadeInUp animate__delay-3s">
                Start Exploring
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="absolute bottom-0 right-0 w-1/3">
            <Image
              src="/images/hero-image.png"
              alt="#"
              width={500}
              height={500}
              className="object-cover rounded-full shadow-xl"
            />
          </div>
        </div>

        {/* Sidebar Section (on the right side) */}
        <div className="sidebar w-full flex flex-col justify-center p-8">
          <Image
            src="/images/hero1.jpg"
            alt="Sidebar Image"
            width={400}
            height={300}
            className="rounded-lg shadow-lg mb-6 hover:scale-105 transition-transform duration-300"
          />
          <p className="text-lg text-gray-700">
            Explore our diverse collection of products that suit your every need. Our products are designed for excellence, ensuring a seamless experience for you.
          </p>
        </div>
      </div>

      {/* Catalog Section */}
      <div id="catalog" className="catalog mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Our Catalog</h2>
        <div className="catalog-items">
          {catalogImages.map((item, index) => (
            <div key={index} className={`catalog-item ${index === currentSlide ? 'active' : ''}`}>
              <Image
                src={item.src}
                alt={item.alt}
                layout="responsive"
                width={300}
                height={300}
                objectFit="cover"
                className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <p className="text-center mt-2">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {catalogImages.map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(to right, #f7f7f7, #e0e0e0);
          color: #333;
          width: 100vw;
          overflow-x: hidden;
        }

        .slider {
          position: relative;
          width: 100vw;
          margin-bottom: 40px;
          border: 2px solid #bdc3c7;
          border-radius: 0;
          overflow: hidden;
        }

        .slide-container {
          position: relative;
          width: 100vw;
          height: 400px;
          overflow: hidden;
        }

        .slider-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .prev-btn, .next-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(44, 62, 80, 0.7);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 1.5rem;
          border-radius: 5px;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .prev-btn:hover, .next-btn:hover {
          background-color: rgba(44, 62, 80, 0.9);
          transform: translateY(-50%) scale(1.1);
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
          width: 100vw;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #e74c3c;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .spareparts {
          display: flex;
          justify-content: center;
          gap: 20px;
          width: 100vw;
          flex-wrap: wrap;
        }

        .sparepart-item {
          text-align: center;
          background-color: #ecf0f1;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          transform: translateY(0);
          flex: 1 1 calc(33.333% - 40px);
          margin: 10px;
        }

        .sparepart-item:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-10px);
        }

        .sparepart-image {
          border-radius: 8px;
          margin-bottom: 10px;
          transition: transform 0.3s ease;
          object-fit: cover;
        }

        .sparepart-image:hover {
          transform: scale(1.1);
        }

        .sparepart-item p {
          margin-top: 10px;
          color: #2c3e50;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .detail-link {
          display: inline-block;
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #e74c3c;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .detail-link:hover {
          background-color: #c0392b;
        }

        .hero-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          margin-top: 40px;
          width: 100vw;
          flex-wrap: wrap;
        }

        .hero {
          flex: 1 1 60%;
        }

        .sidebar {
          background-color: #ecf0f1;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: left;
          width: 100vw;
          flex: 1 1 35%;
        }

        .catalog {
          padding: 20px;
          background-color: #ecf0f1;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100vw;
        }

        .catalog-items {
          display: flex;
          overflow: hidden;
          position: relative;
          width: 100vw;
        }

        .catalog-item {
          min-width: 100%;
          transition: transform 0.5s ease;
          display: none; /* Hide all items by default */
        }

        .catalog-item.active {
          display: block; /* Show only the active item */
        }

        .catalog-item img {
          width: 100%; /* Set the image width to 100% */
          height: auto; /* Maintain the aspect ratio */
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .catalog-item p {
          margin-top: 10px;
          color: #2c3e50;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 10px 15px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .pagination-btn.active {
          background-color: #c0392b;
        }

        .pagination-btn:hover {
          background-color: #c0392b;
        }

        @media (max-width: 768px) {
          .sparepart-item {
            flex: 1 1 calc(50% - 20px);
          }

          .hero {
            flex: 1 1 100%;
          }

          .sidebar {
            flex: 1 1 100%;
          }
        }

        @media (max-width: 480px) {
          .sparepart-item {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
}