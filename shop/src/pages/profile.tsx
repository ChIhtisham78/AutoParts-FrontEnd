import ProfileAddressGrid from '@/components/profile/profile-address';
import Card from '@/components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import ProfileForm from '@/components/profile/profile-form';
import ProfileContact from '@/components/profile/profile-contact';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import DashboardLayout from '@/layouts/_dashboard';
import Email from 'next-auth/providers/email';
import ProfileUpdateEmail from '@/components/profile/profile-update-email';
export { getStaticProps } from '@/framework/general.ssr';

const ProfilePage = () => {
  const { t } = useTranslation('common');
  const { me }: any = useUser();
  console.log('me wow' + me.profileImage);

  if (!me) return null;
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="w-full overflow-hidden px-1 pb-1">
        <div className="mb-8">
          <ProfileForm user={me} />
          {/* <ProfileUpdateEmail user={me} /> */}
          <ProfileContact userId={me.id} contact={me.phoneNumber} />
        </div>

        <Card className="w-full">
          <ProfileAddressGrid
            userId={me.id}
            addresses={me.address}
            label={t('text-addresses')}
          />
        </Card>
      </div>
    </>
  );
};

ProfilePage.authenticationRequired = true;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ProfilePage;
