import { Action } from 'redux';

enum ActionNames {
  OPEN = 'open',
  CLOSE = 'close',
}

interface OpenAction extends Action {
  type: ActionNames.OPEN;
}

export const open = (): OpenAction => ({
  type: ActionNames.OPEN,
});

interface CloseAction extends Action {
  type: ActionNames.CLOSE;
}

export const close = (): CloseAction => ({
  type: ActionNames.CLOSE,
});

export type Actions = OpenAction | CloseAction;

export interface State {
  openFilter: boolean;
}

const initialState: State = { openFilter: false };

export default function reducer(
  state: State = initialState,
  action: Actions
): State {
  switch (action.type) {
    case ActionNames.OPEN:
      return { openFilter: true };
    case ActionNames.CLOSE:
      return { openFilter: false };
    default:
      return state;
  }
}
