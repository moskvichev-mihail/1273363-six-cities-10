import {Link} from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <section className="404 container">
      <h1>
        404.
        <br/>
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </section>
  );
}

export default NotFound;
