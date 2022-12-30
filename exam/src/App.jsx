import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import HistoryPage from './pages/HistoryPage'
import MainPage from './pages/MainPage'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
