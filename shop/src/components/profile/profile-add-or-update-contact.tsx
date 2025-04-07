import { useTranslation } from 'next-i18next';
import { useModalState } from '@/components/ui/modal/modal.context';
import OtpForm from '@/components/otp/otp-form';
import { useUpdateUserContact } from '@/framework/user';
import PhoneNumberForm from '../otp/phone-number-form';

const ProfileAddOrUpdateContact = () => {
  const { t } = useTranslation('common');
  const {
    data: { customerId, contact, profileId },
  } = useModalState();
  const { mutate: updateProfile } = useUpdateUserContact();
  console.log(contact);

  function onContactUpdate({ phone_number }: { phone_number: string }) {
    if (!customerId) {
      return false;
    }
    updateProfile({
      id: customerId,
      phoneNumber: phone_number,
      // profile: {
      //   id: profileId,
      //   contact: phone_number,
      // },
    });
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-light p-5 sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-5 text-center text-sm font-semibold text-heading sm:mb-6">
        {contact ? t('text-update') : t('text-add-new')}{' '}
        {t('text-contact-number')}
      </h1>
      {/* <OtpForm phoneNumber={contact} onVerifySuccess={onContactUpdate} /> */}
      <PhoneNumberForm
        onSubmit={onContactUpdate}
        // isLoading={isLoading}
        phoneNumber={contact}
      />
    </div>
  );
};

export default ProfileAddOrUpdateContact;
