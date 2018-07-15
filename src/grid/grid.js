import React, { Component, forwardRef } from 'react';
import { css } from 'emotion';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  hasEqualKeyVals,
  reducePropAliases,
  getLayoutClass,
  SHARED_LAYOUT_PROPS,
  SHARED_LAYOUT_PROP_ALIASES
} from '../utils';

const LAYOUT_PROP_KEYS = [
  'gridGap',
  'gridRowGap',
  'gridColumnGap',
  'gridTemplateRows',
  'gridTemplateColumns',
  'justifyItems',
  'alignItems',
  'placeItems',
  'justifyContent',
  'alignContent',
  'placeContent',
  'gridAutoColumns',
  'gridAutoRows',
  'gridAutoFlow',
  ...SHARED_LAYOUT_PROPS
];

const LAYOUT_PROP_ALIASES = {
  gridGap: ['gap'],
  gridRowGap: ['rowGap'],
  gridColumnGap: ['columnGap'],
  gridTemplateRows: ['gtr', 'rows'],
  gridTemplateColumns: ['gtc', 'columns'],
  justifyItems: ['ji'],
  alignItems: ['ai'],
  placeItems: ['pi'],
  justifyContent: ['jc'],
  alignContent: ['ac'],
  placeContent: ['pc'],
  gridAutoColumns: ['gac'],
  gridAutoRows: ['gar'],
  gridAutoFlow: ['gaf'],
  ...SHARED_LAYOUT_PROP_ALIASES
};

const ALL_LAYOUT_PROPS = [
  ...LAYOUT_PROP_KEYS,
  ...reducePropAliases(LAYOUT_PROP_ALIASES),
  'breakpoints'
];

class Grid extends Component {
  static defaultProps = {
    Component: 'div'
  };

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!hasEqualKeyVals(nextProps, prevState.props, ALL_LAYOUT_PROPS)) {
      const gridProps = pick(nextProps, ALL_LAYOUT_PROPS);
      return {
        props: nextProps,
        gridClass: getLayoutClass(
          gridProps,
          LAYOUT_PROP_KEYS,
          LAYOUT_PROP_ALIASES
        )
      };
    }
    return null;
  }

  constructor (props) {
    super(props);
    const gridProps = pick(props, ALL_LAYOUT_PROPS);

    this.state = {
      props,
      gridClass: getLayoutClass(
        gridProps,
        LAYOUT_PROP_KEYS,
        LAYOUT_PROP_ALIASES
      )
    };
  }

  render () {
    const { Component, className, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_LAYOUT_PROPS);
    return (
      <Component
        {...restProps}
        ref={innerRef}
        className={css`
          ${this.state.gridClass} ${className};
        `}
      >
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Grid innerRef={ref} {...props} />);
