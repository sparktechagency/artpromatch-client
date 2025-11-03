import AvailableFlash from '@/components/WithNavFooterComponents/AvailableFlash';
import ProfileSideBar from '@/components/WithNavFooterComponents/Profile/ProfileSidebar';
import TattoArtistProfile from '@/components/WithNavFooterComponents/Profile/TattooArtistProfile';

const ArtistProfilePage = async ({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) => {
  const { artistId } = await params;

  console.log({ artistId });

  return (
    <div className="px-2 md:px-0">
      <TattoArtistProfile />
      <div className="container mx-auto  flex flex-col md:flex-row my-10">
        <div className="md:w-[20%] ">
          <ProfileSideBar />
        </div>
        <div className="md:w-[80%] px-5">
          <div>
            <h1 className="text-2xl font-bold">About Alex Rivera</h1>
            <p>
              I&apos;m a professional tattoo artist with over 10 years of
              experience specializing in realism and black & grey designs. My
              focus is on creating lifelike portraits and intricate custom
              designs for clients who want their tattoos to tell a story.
            </p>
          </div>
          <AvailableFlash />
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
