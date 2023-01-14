import { Form, useLoaderData } from 'react-router-dom';
import { getContact } from '../contacts';

const Contact = () => {
  const { contact } = useLoaderData();
  // const contact = {
  //   first: 'Your',
  //   last: 'name',
  //   avatar: 'https://placekitten.com/g/200/200',
  //   twitter: 'your_handle',
  //   note: 'Something here',
  //   favorite: true,
  // };
  return (
    <>
      <div id='contact'>
        <div>
          <img src={contact.avatar} key={contact.avatar} />
        </div>
        <div>
          <h1>
            {contact.first || contact.last ? (
              <>
                {contact.first}

                {contact.last}
              </>
            ) : (
              <i>No name</i>
            )}
            <Favorite contact={contact} />
          </h1>
          {contact.twitter && (
            <p>
              <a
                target='_blank'
                href={`https://twitter.com/${contact.twitter}`}
              >
                {contact.twitter}
              </a>
            </p>
          )}
          {contact.notes && <p>{contact.notes}</p>}

          <div>
            <Form action='edit'>
              <button type='submit'>Edit</button>
            </Form>
            <Form
              action='destroy'
              method='POST'
              onSubmit={(event) => {
                if (!confirm('Are you sure to delete this record?')) {
                  event.preventDefault();
                }
              }}
            >
              <button type='submit'>delete</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const Favorite = ({ favorite }) => {
  return (
    <Form method='POST'>
      <button
        name='favorite'
        value={favorite ? false : true}
        aria-label={favorite ? 'remove for favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
};

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}
export default Contact;
