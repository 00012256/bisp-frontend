import Contact from "../components/Contact";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <Stats />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
