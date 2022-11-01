import SimpleImageSlider from "react-simple-image-slider";
import './carousal.styles.scss'
const images=[
    { url: "https://i.ibb.co/px2tCc3/jackets.png" },
    { url: "https://i.ibb.co/0jqHpnp/sneakers.png" },
    { url: "https://images-na.ssl-images-amazon.com/images/G/31/img18/HomeImprovement/Brand/Havells/IR__Smart_Socket_1500X300._CB635576681_.jpg" },

]
export const Carousal=()=>{
return(
    <div className="image-slider">
        <SimpleImageSlider
            width={"93.4%"}
            height={400}
            object-fit={"contain"}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
        />
    </div>
)
}