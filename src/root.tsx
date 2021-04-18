import React from "react";
import { Store, Reducer } from "redux";
import * as Sentry from "@sentry/browser";
import { ConnectedRouter } from "connected-react-router";
import {Route, Switch} from "react-router";
import { history, Transition } from "@core/routing";
import { Provider } from "react-redux";
import {configureStore} from "@core/store";
import { theme } from "@theme";
import LocalizationProvider from "@core/localization";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { ErrorsHandlerContainer } from "@core/exceptions/handlers";
import { AuthProtectedRoute } from "@core/routing";
import { paths } from "@core/routing/routes";
import { MainLayout } from "./layouts/main";
import { AuthLayout } from "./layouts/auth";
import { Preloader } from "@app/shared/preloaders";
import { BeforeUnloadPromptComponent as BeforeUnloadPrompt } from "@app/shared/prompts";
import { NotFoundPage } from "@app/root/pages/not-found";
import { ErrorPageComponent } from '@app/root/pages/error';
import { SecondaryLayout } from "./layouts/secondary";
import { rootReducer, rootSaga } from '@modules/app/root';


const store: Store = configureStore((rootReducer as Reducer), rootSaga);

Sentry.init({ dsn: process.env.SENTRY_DSN });

const Wrapper: React.ExoticComponent<
  { children?: React.ReactNode }
> = process.env.NODE_ENV === 'development'
  ? React.StrictMode
  : React.Fragment;

const Root: React.FC = () => {
  return (
    <Wrapper>
      <Provider store={ store }>
        <MuiThemeProvider theme={ theme }>
          <CssBaseline />
          <BeforeUnloadPrompt />
          <Helmet>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Helmet>
          <LocalizationProvider>
            <ConnectedRouter history={ history }>
              <Transition enter={ 400 } exit={ 400 }>
                <ErrorsHandlerContainer>
                  <Switch>
                    <AuthProtectedRoute
                      exact
                      path={ paths.ROOT }
                    >
                      <MainLayout>
                        <Preloader
                          variant="page"
                          Component={ import("@app/root/pages/main") }
                        />
                      </MainLayout>
                    </AuthProtectedRoute>
                    <AuthProtectedRoute
                      exact
                      path={ paths.LOGIN }
                    >
                      <AuthLayout>
                        <Preloader
                          variant="page"
                          Component={ import("@app/account/pages/login") }
                        />
                      </AuthLayout>
                    </AuthProtectedRoute>
                    <Route exact path={paths.ERROR}>
                      <SecondaryLayout>
                        <ErrorPageComponent />
                      </SecondaryLayout>
                    </Route>
                    <Route exact path={paths.NOT_FOUND}>
                      <SecondaryLayout>
                        <NotFoundPage />
                      </SecondaryLayout>
                    </Route>
                    <Route>
                      <SecondaryLayout>
                        <NotFoundPage />
                      </SecondaryLayout>
                    </Route>
                  </Switch>
                </ErrorsHandlerContainer>
              </Transition>
            </ConnectedRouter>
          </LocalizationProvider>
        </MuiThemeProvider>
      </Provider>
    </Wrapper>
  )
};

export default Root;
