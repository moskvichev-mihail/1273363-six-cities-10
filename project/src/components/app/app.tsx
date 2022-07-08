import PageMain from '../page-main/page-main';

type AppProps = {
  rentOffersCount: number;
}

function App({rentOffersCount}: AppProps): JSX.Element {
  return (
    <PageMain rentOffersCount={rentOffersCount} />
  );
}

export default App;
