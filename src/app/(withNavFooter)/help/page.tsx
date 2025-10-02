import Help from '@/components/WithNavFooterComponents/Help';
import { getAllFaqs } from '@/services/Faq';

const HelpPage = async () => {
  const { data: faqs } = await getAllFaqs();

  return (
    <div>
      <Help faqs={faqs} />
    </div>
  );
};

export default HelpPage;
