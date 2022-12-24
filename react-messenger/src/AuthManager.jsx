import { connect } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App'
import PageLogin from './pages/PageLogin'

const AuthManager = ({ auth }) => (
  <>
    {auth.user && auth.tokens ? (
      <App />
    ) : (
      <HashRouter>
        <Routes>
          <Route path={'/login'} element={<PageLogin />} />
          <Route path={'*'} element={<Navigate to={'/login'} />} />
        </Routes>
      </HashRouter>
    )}
  </>
)

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AuthManager)
