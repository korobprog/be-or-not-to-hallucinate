import Hero from "@/components/Hero";
import About from "@/components/About";
import Topics from "@/components/Topics";
import Registration from "@/components/Registration";
import Tickets from "@/components/Tickets";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Topics />
      <Tickets />
      <Registration />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
