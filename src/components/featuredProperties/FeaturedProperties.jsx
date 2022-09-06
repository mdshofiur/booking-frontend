import useFetcher from "../../hook/useFetcher";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  
  const { data, loading, error } = useFetcher("/hotel?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item, index) => (
            <div key={index} className="fpItem">
              <img src={item?.photos} alt="feature_img" className="fpImg" />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">
                Starting from ${item?.cheapestPrice}
              </span>
              {item?.ratings && (
                <div className="fpRating">
                  <button>{item?.ratings}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
