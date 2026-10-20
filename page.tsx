import ImageHeader from "@/assets/mainImage/FondoHeader.png";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Description from "@/components/Description";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <main className="flex-grow w-full">
        <div className="bg-center bg-cover flex flex-col items-center justify-start flex-shrink-0 pb-[2.5rem]" style={{backgroundImage: `url(${ImageHeader.src})`,}}>
          <Header></Header>
          <Hero></Hero>
        </div>
        <Description></Description>
        <Footer></Footer>
      </main>
    </div>
  );
}
