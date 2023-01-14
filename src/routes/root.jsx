const Root = () => {
  return (
    <>
      <div id='sidebar'>
        <h1>Contacts Tracker</h1>
        <div>
          <form id='search-form' role='search'>
            <input
              id='q'
              name='q'
              aria-label='search-contacts'
              type='search'
              placeholder='search'
            />
            <div id='search-spinner' aria-hidden hidden={true} />
            <div className='sr-only' aria-live='polite'>
              Heyy
            </div>
          </form>
          <form method='POST'>
            <button type='submit'>New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={'/contacts/1'}>You name</a>
            </li>
            <li>
              <a href={'/contacts/2'}>You Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id='details'></div>
    </>
  );
};

export default Root;
