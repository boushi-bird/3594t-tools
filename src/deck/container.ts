import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { App } from './components/';
import { open, close } from './module';
import { ReduxAction, ReduxState } from './store';

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public open() {
    this.dispatch(open());
  }

  public close() {
    this.dispatch(close());
  }
}

export default connect(
  (state: ReduxState) => ({ value: state.reducer }),
  (dispatch: Dispatch<ReduxAction>) => ({
    actions: new ActionDispatcher(dispatch),
  })
)(App);
