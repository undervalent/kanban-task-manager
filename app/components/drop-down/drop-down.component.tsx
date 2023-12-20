import React from 'react'
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import clsx from 'clsx'
import type { LinksFunction } from '@remix-run/node';
import dropDownStyles from './drop-down.css';

export const links: LinksFunction = () => [
{rel: "stylesheet", href:dropDownStyles},
]

const SelectItem = React.forwardRef(({ children, className, ...props }:any, forwardedRef:any) => {
  return (
    <Select.Item className={clsx('select__item', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="select__item-indicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});


interface Values {
  label: string;
  value: string;
}
interface Props {
  values: Values[]
  label: string
}

export function DropDown({values, label}: Props) {
  return (
    <Select.Root >
    <Select.Trigger className="select__trigger" aria-label="current status">
      <Select.Value placeholder={label} />
      <Select.Icon className="select__icon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="select__content">
        <Select.ScrollUpButton className="select__scroll-button">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="select__viewport">
            <Select.Group>
              {values.map(value => <SelectItem key={value.label} value={value.value}>{value.label}</SelectItem>)}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="select__scroll-button">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  )
}
