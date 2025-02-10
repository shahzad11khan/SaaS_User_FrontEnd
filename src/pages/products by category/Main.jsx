// import data from "../../../public/dinning.json"
import {ProductCard} from '../../components/ProductCard'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'

export const Main = ({products}) => {
  console.log(products)
  
// let {products} = useSelector(state => state.product)
let {category} = useParams()
  return (
    <div className=" py-10 px-4 w-[78%]  bg-white rounded-lg ">
      <h1 className=" text-[34px] font-semibold " >{category.toUpperCase()}</h1>
      <div  className=' flex gap-4 py-3 flex-col justify-start md:flex-row  flex-wrap '>
        {products?.map((deal, index) => (
          deal.productCategory === category &&
          <ProductCard key={index} data={deal} />
        ))}
      </div>
    </div>
  )
}

Main.propTypes = {
  products: PropTypes.arrayOf({
  productCategory: PropTypes.string,
  productDescription: PropTypes.string,
  productImagePublicId: PropTypes.string,
  productImageUrl :PropTypes.string,
  productName :PropTypes.string,
  productPrice :PropTypes.number,
  productQuantity :PropTypes.number,
  productSubCategory :PropTypes.string,
  productTag :PropTypes.string,
  rating :PropTypes.number,
  role :PropTypes.string,
  updatedAt :PropTypes.string,
  userId :PropTypes.string,
  userName :PropTypes.string,
  _id :PropTypes.string,
  })
}