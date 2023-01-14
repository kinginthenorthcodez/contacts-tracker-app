import { Form } from 'react-router-dom';

const Contact = () => {
  const contact = {
    first: 'Your',
    last: 'name',
    avatar: 'https://placekitten.com/g/200/200',
    twitter: 'your_handle',
    note: 'Something here',
    favorite: true,
  };
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
          {contact.note && <p>{contact.note}</p>}

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

const Favorite = () => {
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

export default Contact;
