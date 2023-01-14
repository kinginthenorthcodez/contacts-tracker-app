import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';

const Root = () => {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
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
          <Form method='POST'>
            <button type='submit'>New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <>
                        <i>No Name</i>
                      </>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id='detail'
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
};
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}
export default Root;
