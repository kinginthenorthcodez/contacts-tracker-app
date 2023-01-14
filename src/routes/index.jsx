import homeImg from '../assets/img/contact-img.svg';
const Index = () => {
  return (
    <div id='home-page'>
      <p id='zero-state'>
        This Web app allows you to easily keep track of your social circle
        <br />
        Check out{' '}
        <a href='https://github.com/kinginthenorthcodez/contacts-tracker-app'>
          the docs at github Resource.
        </a>
        .
      </p>
      <img src={homeImg} alt='about' />
    </div>
  );
};

export default Index;
