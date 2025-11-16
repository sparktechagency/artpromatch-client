import LinkedAccounts from '@/components/WithNavFooterComponents/LinkedAccounts';
import { fetchProfileData } from '@/services/Auth';

const LinkedAccountsPage = async () => {
  const { data: profileData } = await fetchProfileData();

  return (
    <div>
      <LinkedAccounts profileData={profileData} />
    </div>
  );
};

export default LinkedAccountsPage;
