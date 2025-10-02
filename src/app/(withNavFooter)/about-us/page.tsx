import { getContentPagesData } from '@/services/Content';
import { IContent } from '@/types';

const AboutUsPage = async () => {
  const { data: aboutUsData } = await getContentPagesData('about-us');
  const pageContent: IContent = aboutUsData;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {pageContent?.title || 'About Us'}
        </h1>
        <p className="text-lg text-gray-600">
          Get to know more about our mission, vision, and story.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <div
          className="text-lg leading-relaxed text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: pageContent?.content || '' }}
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
