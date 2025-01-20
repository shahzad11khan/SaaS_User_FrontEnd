import PropTypes from 'prop-types';

export const UserDetails = ({form ,setEdit , edit}) => {
  return (
    <ul className="px-10 flex  gap-10">
        <li className="flex items-center" >
            <span className="font-semibold">Username :</span>
            <span className="opacity-50"> {form.username}</span>
        </li>
        <li className="flex items-center outfit">
            <span>Email :</span>
            <span className="opacity-50" > {form.email}</span>
        </li>
        <button onClick={() => setEdit(!edit)} className="text-[#219653]">edit</button> 
    </ul>
  )
}

UserDetails.propTypes = {
  form: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired
};
