import PageMain from '../../pages/main/main';

type AppProps = {
  rentOffersCount: number;
}

function App({rentOffersCount}: AppProps): JSX.Element {
  return (
    <PageMain rentOffersCount={rentOffersCount} />
  );
}

export default App;
