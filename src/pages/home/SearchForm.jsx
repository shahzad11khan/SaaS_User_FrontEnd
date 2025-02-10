
import { useTranslation } from 'react-i18next';
import VectorIcon from '../../assets/icons/Vector.svg';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';


export const SearchForm = ({ setProduct, setCategoryName}) => {
  const {products}  = useSelector(state => state.product);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [form, setForm] = useState({
    SelectedCategory: '',
    search: '',
    selectedSubCategory: '',
  });



  const { t } = useTranslation();

  useEffect(() => {
    // Extract unique categories from `products`
    const uniqueCategories = [...new Set(products?.map((el) => el.productCategory))];
    setCategories(uniqueCategories);
  }, [products]);

  const handleCategory = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value, selectedSubCategory: '' }));

    // Extract unique subcategories for the selected category
    const filteredSubCategories = [
      ...new Set(products.filter((el) => el.productCategory === value).map((el) => el.productSubCategory)),
    ];
    setSubCategories(filteredSubCategories);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    console.log('submit clicked')
    e.preventDefault();

    if (!form.SelectedCategory || !form.selectedSubCategory || !form.search) {
      toast.error('Please select all fields before searching');
      return;
    }

    const filteredProducts = products.filter(
      (el) =>
        el.productCategory === form.SelectedCategory &&
        el.productSubCategory === form.selectedSubCategory &&
        el.productName.toLowerCase().includes(form.search.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      toast.error('Product not found');
    } else {
      setCategoryName(form);
      setProduct(filteredProducts);
    }
  };

  return (
    <div className='mx-4 z-20 relative md:flex justify-center'>
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} />
      <div className='shadow-xl top-[-50px] w-full absolute md:w-[1200px] bg-white rounded-lg p-5'>
        <form onSubmit={handleSearchSubmit} className='flex flex-col md:flex-row md:flex-wrap gap-3 justify-center items-center'>
          <select onChange={handleCategory} name='SelectedCategory' className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border bg-[#F9F9F9]' required>
            <option value=''>{t('hero.searchForm.selectCategory')}</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select onChange={handleChange} name='selectedSubCategory' className='w-full md:w-[30%] rounded-lg h-[44px] px-4 border bg-[#F9F9F9]' required>
            <option value=''>{t('hero.searchForm.selectSubCtgry')}</option>
            {subCategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <span className='w-full md:w-[25%] relative'>
            <img className='absolute top-3 left-3' src={VectorIcon} alt='search' />
            <input onChange={handleChange} value={form.search} placeholder={t('hero.searchForm.placeHolder')} className='w-full h-[44px] px-9 rounded-lg border' type='text' name='search' required />
          </span>

          <span className='w-full md:w-[10%] flex items-center justify-center'>
            <button type='submit' className='bg-[#013D29] w-full rounded-full text-white py-1 px-5'>
              {t('hero.searchForm.button')}
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  setProduct: PropTypes.func.isRequired,
  setCategoryName: PropTypes.func.isRequired,
};
