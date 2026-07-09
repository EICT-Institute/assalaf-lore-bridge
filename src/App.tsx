import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import Upload from './pages/Upload';
import TranslationHub from './pages/TranslationHub';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="vault" element={<Vault />} />
            <Route path="upload" element={<Upload />} />
            <Route path="hub" element={<TranslationHub />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </DataProvider>
  );
}

export default App;
