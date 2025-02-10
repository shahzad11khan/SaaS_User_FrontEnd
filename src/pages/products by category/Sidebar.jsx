import { useState  } from "react"
import PropTypes from "prop-types"
// import { useLocation } from "react-router-dom"

export const Sidebar = ({lowToHigh ,highToLow ,viewByCtgry ,products}) => {
    let ctry = products.map(el=> el.productSubCategory);
    let cArr = [...new Set(ctry)];
    console.log(cArr)
    let [priceToggle , setPriceToggle] = useState(false)
    let [ctgryToggle , setCtgryToggle] = useState(false)

  return (
    <div className="w-[23%] py-10 px-5 bg-white outfit rounded-lg">
        <div className="flex flex-col gap-3">
            <h1 className=" text-[34px] font-semibold "> Filter</h1>
            <div>
                <div className='flex justify-between items-center'>
                    <span className='text-[20px] font-semibold '>Price</span>
                    <i onClick={()=> setPriceToggle(!priceToggle)}  className={`mt-1 cursor-pointer ${priceToggle? 'fa-solid fa-chevron-up': 'fa-solid fa-chevron-down'}`}></i>
                </div>
                {priceToggle? 
                <ul className="pl-3 pt-1">
                    <li onClick={()=> lowToHigh()} className="cursor-pointer " > Low to High</li>
                    <li onClick={()=> highToLow()} className="cursor-pointer">High to low</li>
                </ul>:
                null}
            </div>
            <div>
                <div className='flex justify-between items-center'>
                    <span className='text-[20px] font-semibold '>Categories</span>
                    <i onClick={()=> setCtgryToggle(!ctgryToggle)}  className={`mt-1 cursor-pointer ${ctgryToggle? 'fa-solid fa-chevron-up': 'fa-solid fa-chevron-down'}`}></i>
                </div>
                <ul className="pl-3 pt-1">
                    {ctgryToggle && cArr.map((el,idx)=>(
                        <li className="cursor-pointer" onClick={()=> viewByCtgry(el)} key={idx}>{el}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}
Sidebar.propTypes = {
    lowToHigh: PropTypes.func.isRequired,
    highToLow: PropTypes.func.isRequired,
    viewByCtgry: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            productCategory: PropTypes.string.isRequired,
            productDescription: PropTypes.string.isRequired,
            productImagePublicId: PropTypes.string.isRequired,
            productImageUrl: PropTypes.string.isRequired,
            productName: PropTypes.string.isRequired,
            productPrice: PropTypes.number.isRequired,
            productQuantity: PropTypes.number.isRequired,
            productSubCategory: PropTypes.string,
            productTag: PropTypes.string,
            rating: PropTypes.number,
            role: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired
  };