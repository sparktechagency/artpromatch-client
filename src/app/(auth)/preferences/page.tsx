import Preferences from '@/components/WithoutNavFooterComponents/Preferences';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const PreferencesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { role } = await searchParams;

  return (
    <div>
      <Preferences role={role as string} />
    </div>
  );
};

export default PreferencesPage;
