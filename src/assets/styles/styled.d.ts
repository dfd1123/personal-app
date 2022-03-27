import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text:{
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      body1: string;
      body2: string;
      body3: string;
      capton1: string;
      capton2: string;
    },
    br:{
      sm: string;
      md: string;
      lg: string;
    }
  }
}