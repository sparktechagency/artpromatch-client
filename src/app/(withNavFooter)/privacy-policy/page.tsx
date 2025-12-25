import { getContentPagesData } from '@/services/Content';
import { IContent } from '@/types';
import { sanitizeHtml } from '@/lib/sanitize-html';

// export const metadata = {
//   title: 'Privacy Policy | Steady Hands',
//   description:
//     'Read our privacy policy to understand how we protect your data and ensure transparency.',
// };

export const dynamic = 'force-dynamic';

const PrivacyPolicyPage = async () => {
  const { data: privacyPolicyData } = await getContentPagesData(
    'privacy-policy'
  );
  const pageContent: IContent = privacyPolicyData;
  const safeHtml = sanitizeHtml(pageContent?.content || '');

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {pageContent?.title || 'Privacy Policy'}
        </h1>
        <p className="text-lg text-gray-600">
          Learn how we handle, store, and protect your personal information.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <div
          className="rich-content text-gray-700"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
