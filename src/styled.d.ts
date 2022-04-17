import "styled-components";
// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    btn: {
      borderRadius: string;
      bgColor: string;
    };
  }
}
