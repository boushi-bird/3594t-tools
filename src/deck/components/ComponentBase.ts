import { Component } from 'react';

export default abstract class ComponentBase<
  P = {},
  S = {},
  SS = any // eslint-disable-line @typescript-eslint/no-explicit-any
> extends Component<P, S, SS> {}
