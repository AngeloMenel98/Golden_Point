import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import UsersModal from "../UsersModal/UsersModal";

interface AddTeamModalProps {
  onClose: () => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ onClose }) => {
  const tour = useSelector((state: RootState) => state.tour.tour);

  return <UsersModal tourId={tour?.Id} onClose={onClose} isAddTeam={true} />;
};

export default AddTeamModal;
