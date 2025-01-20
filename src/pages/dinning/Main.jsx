// import data from "../../../public/dinning.json"
import {ProductCard} from '../../components/ProductCard'
import PropTypes from "prop-types";

export const Main = ({products}) => {
  return (
    
    <div className=" py-10 px-4 w-[78%]  bg-white rounded-lg ">
      <h1 className=" text-[34px] font-semibold " >Dinning</h1>
      <div  className=' flex gap-4 py-3 flex-col justify-start md:flex-row  flex-wrap '>
        {products.map((deal, index) => (
          <ProductCard key={index} data={deal } />
        ))}
      </div>
    </div>
  )
}

Main.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      sale: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};