/** @jsx jsx */
import React, { Component, forwardRef } from 'react';
import { jsx } from '@emotion/core';
import pick from 'lodash.pick';
import omit from 'lodash.omit';

import {
  reducePropAliases,
  getLayoutStyles,
  SHARED_PROPS,
  SHARED_PROP_ALIASES,
  BOX_PROPS,
  BOX_PROP_ALIASES
} from './utils';

const ALL_BOX_PROPS = [...SHARED_PROPS, ...BOX_PROPS];

const ALL_BOX_PROP_ALIASES = { ...SHARED_PROP_ALIASES, ...BOX_PROP_ALIASES };

const ALL_PROPS = [
  ...ALL_BOX_PROPS,
  ...reducePropAliases({ ...SHARED_PROP_ALIASES, ...BOX_PROP_ALIASES }),
  'breakpoints'
];

class Box extends Component {
  static defaultProps = {
    Component: 'div'
  };

  render () {
    const { Component, css, innerRef, children, ...rest } = this.props;
    const restProps = omit(rest, ALL_PROPS);

    const boxProps = pick(rest, ALL_PROPS);
    const boxStyles = getLayoutStyles(
      boxProps,
      ALL_BOX_PROPS,
      ALL_BOX_PROP_ALIASES,
      true
    );

    return (
      <Component {...restProps} ref={innerRef} css={[boxStyles, css]}>
        {children}
      </Component>
    );
  }
}

export default forwardRef((props, ref) => <Box innerRef={ref} {...props} />);
