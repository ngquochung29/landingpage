// pages/Home.tsx
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
    return (
        <>
            <Header/>
            <HeroBanner />
            <CategorySection />
            <ProductSection />
            {/*<Footer/>*/}
        </>
    );
}
export default Home;
