import React from 'react'
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, DataFunctionArgs } from "@remix-run/node";
import prisma from 'prisma/client';
import { json } from "@remix-run/node";
import { Link , useLoaderData , Form } from '@remix-run/react';
import { invariantResponse } from '~/utils';
import { prefs } from '../board.$boardId/components/kanban-board/cookie';
import { Checkbox } from '~/components/checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import dialogStylesUrl from './dialog.css'
import { getCompletedSubTaskCount } from '~/lib/utils';
import { DropDown } from '~/components/drop-down';
import { Button } from '~/components/button';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: dialogStylesUrl }
]

export async function loader({ params, request }: DataFunctionArgs) {
  const { taskId } = params;
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      subTask: true
    }
  });

  invariantResponse(task, `task ${taskId} not found`)

  const cookieHeader = request.headers.get('Cookie');
  const { columnNames } = (await prefs.parse(cookieHeader)) || {};
 const completedCount = getCompletedSubTaskCount(task.subTask)
  return json({
    task,
    columnNames,
    completedCount,
  })
}

export default function Task() {
  const { task, columnNames, completedCount  } = useLoaderData<typeof loader>();

  return (
    <Dialog.Root open={Boolean(task.id)}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog__overlay" />
        <Dialog.Content className="dialog__content">
          <Dialog.Title className="dialog__title">{task.title}</Dialog.Title>
          <Dialog.Description className="dialog__description">
            {task.description}
          </Dialog.Description>
          <span>
            SubTask ({completedCount} of {task?.subTask?.length || 0})
          </span>
          <Form>
          <fieldset className="dialog__fieldset">
            {task.subTask.map(subtask=> <Checkbox key={subtask.id} subTask={subtask} />)}
            </fieldset>

            <h3>Current Status</h3>
          <DropDown values={columnNames} label="Current Status" />
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <Button>Save changes</Button>
            </Dialog.Close>
            </div>
          </Form>
          <Dialog.Close asChild>
            <Link to=".." className="dialog__icon-buton" aria-label="Close">
              CLOSE
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
