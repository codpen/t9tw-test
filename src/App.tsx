import { AppStore } from './store';
import { AppThemeProvider } from './theme';
import Routes from './routes';
import Layout from './layout';
import { ErrorBoundary } from './components';
import { BrowserRouter } from 'react-router-dom';
import i18n from "./i18n";
import { useTranslation } from 'react-i18next';

/**
 * Root Application Component
 */
const App = () => {
  const { t } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <ErrorBoundary name="App">
      <AppStore>
        <AppThemeProvider>
          <BrowserRouter>
            <Layout>
              <Routes />
            </Layout>
          </BrowserRouter>
        </AppThemeProvider>
      </AppStore>
    </ErrorBoundary>
    // <div className='App'>
    //   <h1>{t("SignUp")}</h1>
    //   <select onChange={changeLanguage}>
    //     <option value="en" selected>
    //       en
    //     </option>
    //     <option value="ru">ru</option>
    //   </select>
    // </div>
  );
};

export default App;
