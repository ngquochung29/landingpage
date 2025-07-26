// pages/Home.tsx
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {useState} from "react";
import {ProductQuery} from "../types/Dto";

function Home() {
    const [query,setQuery] = useState<ProductQuery>({
        sortDir: "DESC",
        sortBy : "createdAt",
        page:0,
        size:10,
        query: "",
        category: "",
        brand:""
    })

    return (
        <>
            <Header/>
            <HeroBanner />
            <CategorySection />
            <ProductSection query={query} />
            <Footer/>
        </>
    );
}
export default Home;
