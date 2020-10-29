import { css, Global } from '@emotion/core';

const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 20px;
      }

      a {
        color: inherit;
      }

      button {
        cursor: pointer;
      }

      * {
        box-sizing: border-box;
      }
    `}
  />
);

export default globalStyles;
