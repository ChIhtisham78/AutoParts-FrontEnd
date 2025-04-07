import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteHomePages } from '@/data/affiliatePage';
import { useDeleteImageMutation } from '@/data/client/uploadImage';

const AffiliatePrograms = () => {
    const { mutate: deletehomepage,isLoading: loading } = useDeleteHomePages();
    const { data } = useModalState();
  const { closeModal } = useModalAction();

async function handleDelete() {
  deletehomepage(data);
  closeModal();
}


  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default AffiliatePrograms;
