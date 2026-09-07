declare module "react-syntax-highlighter" {
  import { ComponentType, CSSProperties } from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: Record<string, CSSProperties>;
    customStyle?: CSSProperties;
    codeTagProps?: React.HTMLProps<HTMLElement>;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: CSSProperties | ((lineNumber: number) => CSSProperties);
    wrapLines?: boolean;
    wrapLongLines?: boolean;
    lineProps?: Record<string, unknown> | ((lineNumber: number) => Record<string, unknown>);
    renderer?: (props: unknown) => React.ReactNode;
    PreTag?: string | ComponentType<React.HTMLProps<HTMLElement>>;
    CodeTag?: string | ComponentType<React.HTMLProps<HTMLElement>>;
    children?: string | string[];
    [key: string]: unknown;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const Light: ComponentType<SyntaxHighlighterProps>;
  export const Dark: ComponentType<SyntaxHighlighterProps>;
  export const PrismLight: ComponentType<SyntaxHighlighterProps>;
  export const PrismAsync: ComponentType<SyntaxHighlighterProps>;
  export const PrismAsyncLight: ComponentType<SyntaxHighlighterProps>;
  export const LightAsync: ComponentType<SyntaxHighlighterProps>;
  export const DarkAsync: ComponentType<SyntaxHighlighterProps>;
  export const registerLanguage: (name: string, language: unknown) => void;
  export const createElement: (props: unknown) => React.ReactNode;
  export const checkForListedLanguage: (language: string) => boolean;
  export const supportedLanguages: string[];
}

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  import { CSSProperties } from "react";
  export const vscDarkPlus: Record<string, CSSProperties>;
  export const oneDark: Record<string, CSSProperties>;
  export const oneLight: Record<string, CSSProperties>;
  export const dracula: Record<string, CSSProperties>;
  export const nord: Record<string, CSSProperties>;
  export const okaidia: Record<string, CSSProperties>;
  export const tomorrow: Record<string, CSSProperties>;
  export const twilight: Record<string, CSSProperties>;
  export const prism: Record<string, CSSProperties>;
  export const coy: Record<string, CSSProperties>;
  export const dark: Record<string, CSSProperties>;
  export const funky: Record<string, CSSProperties>;
  export const solarizedlight: Record<string, CSSProperties>;
  export const ghcolors: Record<string, CSSProperties>;
  export const hopscotch: Record<string, CSSProperties>;
  export const pojoaque: Record<string, CSSProperties>;
  export const vs: Record<string, CSSProperties>;
  export const xonokai: Record<string, CSSProperties>;
  export const atomDark: Record<string, CSSProperties>;
  export const base16AteliersulphurpoolLight: Record<string, CSSProperties>;
  export const cb: Record<string, CSSProperties>;
  export const coldarkCold: Record<string, CSSProperties>;
  export const coldarkDark: Record<string, CSSProperties>;
  export const coyWithoutShadows: Record<string, CSSProperties>;
  export const darcula: Record<string, CSSProperties>;
  export const duotoneDark: Record<string, CSSProperties>;
  export const duotoneEarth: Record<string, CSSProperties>;
  export const duotoneForest: Record<string, CSSProperties>;
  export const duotoneLight: Record<string, CSSProperties>;
  export const duotoneSea: Record<string, CSSProperties>;
  export const duotoneSpace: Record<string, CSSProperties>;
  export const gruvboxDark: Record<string, CSSProperties>;
  export const gruvboxLight: Record<string, CSSProperties>;
  export const lucario: Record<string, CSSProperties>;
  export const materialDark: Record<string, CSSProperties>;
  export const materialLight: Record<string, CSSProperties>;
  export const materialOceanic: Record<string, CSSProperties>;
  export const nightOwl: Record<string, CSSProperties>;
  export const shadesOfPurple: Record<string, CSSProperties>;
  export const synthwave84: Record<string, CSSProperties>;
  export const zTouch: Record<string, CSSProperties>;
}
