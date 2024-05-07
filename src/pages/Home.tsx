import NavBar from '../componets/NavBar';
import Footer from '../componets/Footer';
import AboutSection from '../componets/About';
import EventSection from '../componets/Events';
import HeroSection from '../componets/Hero_section';
import NewsSection from '../componets/News';
import SaccoSection from '../componets/Sacco';
import SocialsSection from '../componets/Socials';


const Home=()=>{
  return (
    <>
      <NavBar/>
      <HeroSection/>
      <AboutSection/>
      <EventSection/>
      <NewsSection/>
      <SaccoSection/>
      <SocialsSection/>
      <Footer/>
    </>
  );
}
export default Home;