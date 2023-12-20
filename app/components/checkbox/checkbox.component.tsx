import React from 'react'
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import checkboxStyles from './checkbox.css'
import type { LinksFunction } from "@remix-run/node";
import type { SubTask } from '@prisma/client';


export const links: LinksFunction = () => [{ rel: "stylesheet", href: checkboxStyles }];

export function Checkbox({ subTask }: { subTask: SubTask }) {
  return (
<div className="checkbox__container">
      <RadixCheckbox.Root className="checkbox" defaultChecked={subTask.isCompleted} id={subTask.title}>
        <RadixCheckbox.Indicator className="checkbox__indicator">
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className="checkbox__label" htmlFor={subTask.title}>
        {subTask.title}
      </label>
    </div>     )
}
