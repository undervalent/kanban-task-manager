import React from 'react'
import clsx from 'clsx'
import buttonStyles from './button.css'
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
{rel: "stylesheet", href:buttonStyles},
]

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | "desctructive";
  size?: 'sm' | 'lg';
  children: React.ReactNode;
};

export function Button({ children, variant = "primary", size = "lg", ...rest }: IProps) {
  return (
    <button className={clsx("button", {
      "secondary": variant === 'secondary',
      "destructive": variant === 'desctructive',
      "primary": variant === 'primary',
      "sm": size === 'sm',
      "lg": size === 'lg',
    })}
      {...rest}
    >
      {children}
    </button>)
}
