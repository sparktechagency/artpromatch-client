import AfterLoginHeader from './AfterLoginHeader/AfterLoginHeader';
import FilteredTatto from './AfterLoginHeader/FilteredTatto/FilteredTatto';

const AfterLogin = () => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <AfterLoginHeader />
      <FilteredTatto />
    </div>
  );
};

export default AfterLogin;
