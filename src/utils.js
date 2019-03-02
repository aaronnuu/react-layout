import { css } from '@emotion/core';
import memoize from 'fast-memoize';
import reduce from 'lodash.reduce';

export const SHARED_PROPS = [
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'height',
  'width',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'overflow'
];

export const SHARED_PROP_ALIASES = {
  position: ['pos'],
  top: ['t'],
  right: ['r'],
  bottom: ['b'],
  left: ['l'],
  height: ['h'],
  width: ['w'],
  maxHeight: ['maxh'],
  maxWidth: ['maxw'],
  minHeight: ['minh'],
  minWidth: ['minw'],
  padding: ['p'],
  paddingTop: ['pt'],
  paddingRight: ['pr'],
  paddingBottom: ['pb'],
  paddingLeft: ['pl'],
  margin: ['m'],
  marginTop: ['mt'],
  marginRight: ['mr'],
  marginBottom: ['mb'],
  marginLeft: ['ml'],
  overflow: ['o']
};

export const BOX_PROPS = [
  'flexDirection',
  'flexWrap',
  'alignItems',
  'alignContent',
  'justifyContent',
  'flexGrow',
  'flexShrink',
  'flex',
  'flexAuto',
  'flexNone'
];

export const BOX_PROP_ALIASES = {
  flexDirection: ['fd', 'direction'],
  flexWrap: ['fw', 'wrap'],
  alignItems: ['ai'],
  alignContent: ['ac'],
  justifyContent: ['jc'],
  flexGrow: ['fg'],
  flexShrink: ['fs'],
  flex: ['f'],
  flexAuto: ['fa'],
  flexNone: ['fn']
};

export const GRID_PROPS = [
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
  'gridAutoFlow'
];

export const GRID_PROP_ALIASES = {
  gridGap: ['gg', 'gap'],
  gridRowGap: ['grg', 'rowGap'],
  gridColumnGap: ['gcg', 'columnGap'],
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
  gridAutoFlow: ['gaf']
};

export const reducePropAliases = props =>
  reduce(props, (acc, prop) => acc.concat(prop), []);

const getStyles = (props, propKeys, propAliases, flex) => {
  return reduce(
    propKeys,
    (styles, key) => {
      styles[key] =
        props[key] ||
        reduce(
          propAliases[key],
          (acc, alias) => {
            if (props[alias]) {
              acc = props[alias];
            }
            return acc;
          },
          undefined
        ) ||
        (key === 'flexDirection' && flex && 'column');
      return styles;
    },
    {}
  );
};

const getBreakpointStyles = (props, propKeys, propAliases, flex) => {
  if (props.breakpoints) {
    return reduce(
      props.breakpoints,
      (styles, val, key) => {
        if (!isNaN(parseInt(key))) {
          styles[`@media (max-width: ${key}px)`] = getStyles(
            val,
            propKeys,
            propAliases,
            flex
          );
        } else {
          styles[key] = getStyles(val, propKeys, propAliases, flex);
        }
        return styles;
      },
      {}
    );
  } else {
    return {};
  }
};

const getStyleObject = (...args) => ({
  ...getStyles(...args),
  ...getBreakpointStyles(...args)
});

export const getLayoutStyles = memoize(
  (props, propKeys, propAliases, flex = false, grid = true) =>
    css({
      display: flex ? 'flex' : grid ? 'grid' : 'block',
      ...getStyleObject(props, propKeys, propAliases, flex)
    })
);
