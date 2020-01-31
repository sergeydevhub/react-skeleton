import { ReduxModuleHelper } from "@core/helpers";

class AppModule extends ReduxModuleHelper {}
const appModule = new AppModule('app');

const init = appModule.sync<any>('init', cb => (payload) => cb({ payload }));

const actions = {
  init
};

export {
  actions,
  appModule,
  AppModule
}
