import { getContentPagesData } from '@/services/Content';
import { IContent } from '@/types';
import { sanitizeHtml } from '@/lib/sanitize-html';

export const metadata = {
  title: 'Refund Policy | Steady Hands',
  description:
    'Read our Refund Policy to learn about eligibility, conditions, and the process for requesting a refund.',
};

const RefundPolicyPage = async () => {
  const { data: refundPolicyData } = await getContentPagesData('refund-policy');
  const pageContent: IContent = refundPolicyData;
  const safeHtml = sanitizeHtml(pageContent?.content || '');

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {pageContent?.title || 'Refund Policy'}
        </h1>
        <p className="text-lg text-gray-600">
          Understand how refunds work, including eligibility criteria and the
          steps to request one.
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

export default RefundPolicyPage;
