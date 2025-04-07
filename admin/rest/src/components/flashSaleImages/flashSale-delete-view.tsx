import ConfirmationCard from '@/components/common/confirmation-card';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useDeleteImageMutation } from '@/data/client/uploadImage';

const FlashSaleDeleteView = () => {
    const { mutate: deleteImage,isLoading: loading } = useDeleteImageMutation();
    const { data } = useModalState();
  const { closeModal } = useModalAction();

async function handleDelete() {
  deleteImage(data);
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

export default FlashSaleDeleteView;
