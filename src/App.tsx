import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-dvh bg-paella-cream text-paella-dark font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receta/:id" element={<Detail />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
