import star from "../assets/Card/Star 5.png"
import PropTypes from 'prop-types'

  function CardRating  ({rating})  {
    let fullStar = Math.floor(rating);
    let halfStar = rating && rating % 1 !== 0;
    let arr = [];
        for(let i= 0; i< fullStar ; i++){
        arr.push({star})}
    return(
        <>
            {arr.map((el ,index) =>(
            <img className="h-[15px] w-[15px]" src={el.star} alt="star" key={index} />
            ))}
            {halfStar && <i className=" mt-[3px] text-[#FFC633] flex items-center fa-solid fa-star-half h-[18px] "></i> }
        </>
    )
}


CardRating.propTypes = {
    rating: PropTypes.number
}
export default CardRating