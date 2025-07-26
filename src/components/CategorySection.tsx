// components/CategorySection.tsx
const categories = [
    { name: "Áo nữ", image: "https://buggy.yodycdn.com/images/home-banner-dt/abc69d9b67573502f5216e54309f49f5.webp" },
    { name: "Quần nam", image: "https://buggy.yodycdn.com/images/home-banner-dt/abc69d9b67573502f5216e54309f49f5.webp" },
    { name: "Trẻ em", image: "https://buggy.yodycdn.com/images/home-banner-dt/abc69d9b67573502f5216e54309f49f5.webp" }
];

function CategorySection() {


    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Danh mục nổi bật</h2>
            <div className="row">
                {categories.map((c, index) => (
                    <div className="col-md-4 text-center" key={index}>
                        <img src={c.image} alt={c.name} className="img-fluid rounded mb-2" />
                        <h5>{c.name}</h5>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default CategorySection;
