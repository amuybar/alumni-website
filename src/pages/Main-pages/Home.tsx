
import AboutSection from '../../componets/About';
import EventSection from '../../componets/Events';
import HeroSection from '../../componets/Hero_section';
import NewsSection from '../../componets/News';
import SaccoSection from '../../componets/Sacco';
import SocialsSection from '../../componets/Socials';
import NewsLetter from '../../componets/NewsLetter';
import AlumniMerchandiseStore from '../../componets/Store';


const Home=()=>{
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      <EventSection/>
      <NewsSection/>
      <SaccoSection/>
      <AlumniMerchandiseStore/>
      <SocialsSection/>
      <NewsLetter/>
    </>
  );
}
export default Home;