import { useNavigate } from "react-router-dom";

const BackButton = ({ className = "btn btn-warning" }) => {
  const navigate = useNavigate();

  return (
    <button type="button" className={className} onClick={() => navigate(-1)}>
      Back
    </button>
  );
};

export default BackButton;