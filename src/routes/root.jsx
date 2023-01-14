import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { getContacts, createContact } from '../contacts';

const Root = () => {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);
  return (
    <>
      <div id='sidebar'>
        <h1>
          Contacts Tracker{' '}
          <p style={{ paddingLeft: '15px' }}>
            <Link to={'contact-info'}>Get in Touch</Link>
          </p>
        </h1>
        <div>
          <Form id='search-form' role='search'>
            <input
              id='q'
              name='q'
              aria-label='search-contacts'
              type='search'
              placeholder='search'
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, { replace: !isFirstSearch });
              }}
              className={searching ? 'loading' : ''}
            />
            <div id='search-spinner' aria-hidden hidden={!searching} />
            <div className='sr-only' aria-live='polite'></div>
          </Form>
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
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}
export default Root;
