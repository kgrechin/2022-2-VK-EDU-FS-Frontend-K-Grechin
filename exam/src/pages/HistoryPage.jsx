import { connect } from 'react-redux'

import ClearIcon from '@mui/icons-material/Clear'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { Link } from 'react-router-dom'
import { clearTranslates } from '../actions/translates'
import Button from '../components/Button'
import HistoryRecord from '../components/HistoryRecord'
import Wrapper from '../components/Wrapper'

const HistoryPage = ({ history, clearTranslates }) => {
  const renderRecords = () => {
    return history.map((el, idx) => <HistoryRecord {...el} key={idx} />)
  }
  return (
    <Wrapper>
      {renderRecords()}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '16px',
          right: '16px'
        }}
      >
        <Button onClick={clearTranslates}>
          <ClearIcon />
        </Button>
        <Link to="/">
          <Button>
            <GTranslateIcon />
          </Button>
        </Link>
      </div>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  history: state.translates
})

export default connect(mapStateToProps, { clearTranslates })(HistoryPage)
