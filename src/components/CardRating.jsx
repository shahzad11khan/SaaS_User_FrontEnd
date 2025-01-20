import star from "../assets/Card/Star 5.png"
import PropTypes from 'prop-types'

  function CardRating  ({rating})  {
    let fullStar = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    let arr = [];
        for(let i= 0; i< fullStar ; i++){
        arr.push({star})}
    return(
        <>
            {arr.map((el ,index) =>(
            <img className="h-[18px] w-[18px]" src={el.star} alt="star" key={index} />
            ))}
            {halfStar ? <i className=" mt-[3px] text-[#FFC633] flex items-center fa-solid fa-star-half h-[18px] "></i> :null}
        </>
    )
}


CardRating.propTypes = {
    rating: PropTypes.number.isRequired
}
export default CardRating