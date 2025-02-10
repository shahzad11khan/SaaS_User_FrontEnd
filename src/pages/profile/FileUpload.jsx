import defaultPic  from '../../assets/default user/defaultUser.png';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { imageUpload } from '../../slices/profileSlice';



export const FileUpload = ({token ,form }) => {
    let dispatch = useDispatch()
    let handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("profileImage", file);
        dispatch(imageUpload({formData,token}))
      };

  return (
    <div  className="relative w-[150px] h-[150px]  rounded-full">
      <img className="h-full w-full rounded-full object-cover" src={form.profileImage? form.profileImage : defaultPic} alt="user" />
      <label
        htmlFor="file-input"
        className="absolute right-[12px] bottom-[12px] hover:bg-[#013D29] text-[#219653] bg-white h-[30px] w-[30px] border rounded-full cursor-pointer flex justify-center items-center"
      >
        <i className="fa-regular fa-pen-to-square"></i>
      </label>
      <input
      id="file-input"
      type="file"
      className="hidden"
      onChange={handleFileUpload}
      />
  </div>
  )
}


FileUpload.propTypes = {
    token : PropTypes.string,
    form: PropTypes.shape({
      profileImage:PropTypes.string,
      googelProfile: PropTypes.string
    }).isRequired
}