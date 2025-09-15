import AfterLoginHeader from './AfterLoginHeader';
import FilteredTatto from './AfterLoginHeader/FilteredTatto';

const ClientAfterLogin = () => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <AfterLoginHeader />
      <FilteredTatto />
    </div>
  );
};

export default ClientAfterLogin;
