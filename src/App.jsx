import AppRoutes from './routes/AppRoutes';
import './App.css';
import Navegation from './Components/Navegation/Navegation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProviderWrapper } from './contexts/auth.context';


function App() {
  return (
    <div className="App">
      <AuthProviderWrapper>
        <Navegation />
        <AppRoutes />
      </AuthProviderWrapper>

    </div>
  )
}

export default App;
