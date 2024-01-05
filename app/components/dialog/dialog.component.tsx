import React from 'react'
import dialogStyles from './dialog.css'
import type { LinksFunction } from "@remix-run/node";
import * as RadixDialog from '@radix-ui/react-dialog';
import { Link } from '@remix-run/react';

export const links: LinksFunction = () => [{ rel: "stylesheet", href: dialogStyles }];


interface Props {
  open: boolean;
  title: string;
  description: string | null;
  children: React.ReactNode
}

export function Dialog({open,title,description, children }:Props) {
  return (
    <RadixDialog.Root open={open} modal>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dialog__overlay" />
        <RadixDialog.Content className="dialog__content">
          <RadixDialog.Title className="dialog__title">{title}</RadixDialog.Title>
          <RadixDialog.Description className="dialog__description">
            {description}
          </RadixDialog.Description>
          {children}
          <RadixDialog.Close asChild>
            <Link to=".." className="dialog__icon-buton" aria-label="Close">
              CLOSE
            </Link>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

