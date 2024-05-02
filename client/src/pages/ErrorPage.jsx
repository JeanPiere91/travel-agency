import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
        <h1>404 Page Not Found. Please Try a different Route</h1>
        <p>
          <i>{error?.statusText || error?.message || 'Unknown Error'}</i>
        </p>
        <a href='/'>Return to Homepage</a>
    </div>
  );
}

export default ErrorPage;