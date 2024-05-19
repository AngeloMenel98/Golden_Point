import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import UsersModal from "../UsersModal/UsersModal";

interface UsersModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTeamModal: React.FC<UsersModalProps> = ({ open, onClose }) => {
  const tour = useSelector((state: RootState) => state.tour.tour);

  return <UsersModal tourId={tour?.Id} open={open} onClose={onClose} />;
};

export default AddTeamModal;
