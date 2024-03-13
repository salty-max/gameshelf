import styled, { css } from "styled-components";
import { FC } from "react";

type TextVariant = "title" | "subtitle" | "body" | "label" | "caption";
type TextColor =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: TextColor;
}

export const Text: FC<TextProps> = ({
  variant = "body",
  color = "default",
  children,
}) => {
  let Component: keyof JSX.IntrinsicElements = "span";

  switch (variant) {
    case "title":
      Component = "h1";
      break;
    case "subtitle":
      Component = "h2";
      break;
    case "body":
      Component = "p";
      break;
    case "label":
      Component = "span";
      break;
    case "caption":
      Component = "small";
      break;
    default:
      Component = "span";
  }

  const TextComponent = styled(Component)<{
    variant: TextVariant;
    color: TextColor;
  }>`
    font-family: sans-serif;
    margin: 0;
    padding: 0;

    ${({ theme }) => {
      switch (variant) {
        case "title":
          return css`
            font-size: ${theme.fontSizes.xl};
            font-weight: bold;
          `;
        case "subtitle":
          return css`
            font-size: ${theme.fontSizes.lg};
            font-weight: bold;
          `;
        case "body":
          return css`
            font-size: ${theme.fontSizes.md};
          `;
        case "label":
          return css`
            font-size: ${theme.fontSizes.md};
            font-weight: bold;
          `;
        case "caption":
          return css`
            font-size: ${theme.fontSizes.sm};
          `;
      }
    }}

    ${({ theme }) => {
      switch (color) {
        case "default":
          return css`
            color: ${theme.colors.text};
          `;
        case "primary":
          return css`
            color: ${theme.colors.primary.default};
          `;
        case "secondary":
          return css`
            color: ${theme.colors.secondary.default};
          `;
        case "info":
          return css`
            color: ${theme.colors.info.default};
          `;
        case "success":
          return css`
            color: ${theme.colors.success.default};
          `;
        case "warning":
          return css`
            color: ${theme.colors.warning.default};
          `;
        case "error":
          return css`
            color: ${theme.colors.error.default};
          `;
      }
    }}
  `;

  return (
    <TextComponent variant={variant} color={color}>
      {children}
    </TextComponent>
  );
};
