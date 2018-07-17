# react-layout

CSS grid and flexbox helper components for react. Uses emotion for css injection.

## Features

- Declarative layout - having layout properties on the component makes page layout easier to reason about while not sacrificing performance by inlining all styles
  - Class construction is memoized based on props
- Aliased css properties - less typing required
  - All properties (except position which is shortened to `pos`) are shortened to the first letter of each word of the property
  - Some of the more common properties also have easier to remember aliases (e.g. `rows` for `gridTemplateRows`)
  - **You can either use the full prop name or any of it's aliases.**
- Flexible breakpoints
  - Given an integer as the key (or a string that can be parsed to an integer) the breakpoint will default as `@media (max-width: <key>px)`
  - Anything else will simply use the key as the media query
- Inspired by react-native styling, flex-direction defaults to column

## Getting Started

### Installing

Install using yarn

```
yarn add @aaronuu/react-layout emotion
```

Install using npm

```
npm -i @aaronuu/react-layout emotion
```

## Usage

```js
import { Box, Grid, GridItem } from '@aaronuu/react-layout';

const BREAKPOINT_MOBILE = '768';
const BREAKPOINT_TABLET = '@media(min-width: 768px and max-width: 1024px)';

class YourComponent extends Component {
  render() {
    return (
      <Grid
        rowGap="20px"
        columnGap="10px"
        rows="auto 1fr auto"
        columns="repeat(10, 100px)"
        breakpoints={{
          [BREAKPOINT_TABLET]: {
            rows: 'auto minmax(150px, 500px) auto'
          },
          [BREAKPOINT_MOBILE]: {
            rows: '1fr'
          }
        }}
      >
        <GridItem
          Component="span"
          area="1 / 1 / 4 / 3"
          breakpoints={{
            [BREAKPOINT_MOBILE]: {
              area: '1 / 1 / 2 / 3'
            }
          }}
        >
          <Box padding="10px">
            <h1>Heading</h1>
          </Box>
        </GridItem>
        <GridItem
          area="1 / 3 / 4 / 11"
          breakpoints={{
            [BREAKPOINT_MOBILE]: {
              area: '1 / 3 / 2 / 11'
            }
          }}
        >
          <Box ai="center" jc="center">
            <p>Content</p>
          </Box>
        </GridItem>
      </Grid>
    );
  }
}
```

## Props

### Shared

| Prop          | Alias |
| ------------- | ----- |
| Component     | -     |
| position      | pos   |
| top           | t     |
| right         | r     |
| bottom        | b     |
| left          | l     |
| height        | h     |
| width         | w     |
| maxHeight     | maxh  |
| maxWidth      | maxw  |
| minHeight     | minh  |
| minWidth      | minw  |
| padding       | p     |
| paddingTop    | pt    |
| paddingRight  | pr    |
| paddingBottom | pb    |
| paddingLeft   | pl    |
| margin        | m     |
| marginTop     | mt    |
| marginRight   | mr    |
| marginBottom  | mb    |
| marginLeft    | ml    |

### Box

| Prop           | Alias         |
| -------------- | ------------- |
| flexDirection  | fd, direction |
| flexWrap       | fw, wrap      |
| alignItems     | ai            |
| alignContent   | ac            |
| justifyContent | jc            |
| flexGrow       | fg            |
| flexShrink     | fs            |
| flex           | f             |
| flexAuto       | fa            |
| flexNone       | fn            |

### Grid

| Prop                | Alias          |
| ------------------- | -------------- |
| gridGap             | gg, gap        |
| gridRowGap          | grg, rowGap    |
| gridColumnGap       | gcg, columnGap |
| gridTemplateRows    | gtr, rows      |
| gridTemplateColumns | gtc, columns   |
| justifyItems        | ji             |
| alignItems          | ai             |
| placeItems          | pc             |
| justifyContent      | jc             |
| alignContent        | ac             |
| placeContent        | pc             |
| gridAutoColumns     | gac            |
| gridAutoRows        | gar            |
| gridAutoFlow        | gaf            |

### GridItem

| Prop            | Alias            |
| --------------- | ---------------- |
| gridRowStart    | grs, rowStart    |
| gridRowEnd      | gre, rowEnd      |
| gridColumnStart | gcs, columnStart |
| gridColumnEnd   | gce, columnEnd   |
| gridRow         | gr, row          |
| gridColumn      | gc, column       |
| gridArea        | ga, area         |
| justifySelf     | js               |
| alignSelf       | as               |
| placeSelf       | ps               |

## Caveats

React 16 only for now.

Only flexbox container properties have been exposed, all flexbox child properties will still have to be added to the child elements directly.

Due to how CSS Grid works all children of the Grid component are technically 'grid items' so you aren't limited to using the `GridItem` component to style `Grid` children.

Refs will be forwarded to the inner element using the `forwardRef` API so the ref will return a reference to the underlying DOM node rather than the instance of the component.

## Authors

- **Aaron Williams** - [aaronnuu](https://github.com/aaronnuu)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
