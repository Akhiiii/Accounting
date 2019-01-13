import dva from 'dva';
import RouterConfig from './router';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './less/main.less';

const app = dva({
    history: createHistory(),        // comment it to change browser router to hash router     
  });

app.use(createLoading());

app.router(RouterConfig);

app.model(require('./Pages/Clients/ClientsModal').default);
app.model(require('./Pages/Vendors/VendorsModal').default);
// app.model(require('./Pages/Vendors/VendorsModal').default);

app.start('#root');