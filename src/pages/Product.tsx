
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailPage from "../components/ProductDetailPage";

function Product() {
    return (
        <>
            <Header/>
            <div className="main-content">
                <ProductDetailPage />
            </div>
            <Footer/>
        </>
    );
}
export default Product;
