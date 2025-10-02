import SignInForm from '@/components/WithoutNavFooterComponents/SignInForm';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const SiginInPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { redirectPath } = await searchParams;

  return (
    <div>
      <SignInForm redirectPath={redirectPath} />
    </div>
  );
};

export default SiginInPage;
