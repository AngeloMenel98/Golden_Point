import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxSlices/store";
import UsersModal from "../UsersModal/UsersModal";
import { useState } from "react";

interface AddTeamModalProps {
  onClose: () => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ onClose }) => {
  const tour = useSelector((state: RootState) => state.tour.tour);

  const [activeModal, setActiveModal] = useState<number>(0);

  const onNext = () => {
    setActiveModal((prev) => prev + 1);
  };

  return (
    <>
      <UsersModal
        tourId={tour?.Id}
        onClose={onClose}
        isAddTeam={true}
        onNext={onNext}
      />
      {activeModal == 1 && (
        <UsersModal
          tourId={tour?.Id}
          onClose={onClose}
          isAddTeam={true}
          onNext={onNext}
        />
      )}
      {activeModal == 2 && (
        <UsersModal
          tourId={tour?.Id}
          onClose={onClose}
          isAddTeam={true}
          onNext={onNext}
        />
      )}
      {activeModal == 3 && (
        <UsersModal
          tourId={tour?.Id}
          onClose={onClose}
          isAddTeam={true}
          onNext={onNext}
        />
      )}
    </>
  );
};

export default AddTeamModal;
