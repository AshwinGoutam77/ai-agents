import React from "react";
import HireSection from "../components/HireSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-white transition-opacity duration-1000`}
    >
      <Header />
      <HireSection />
      <Footer />
    </div>
  );
}
