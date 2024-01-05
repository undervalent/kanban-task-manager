
import React from 'react'
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, DataFunctionArgs } from "@remix-run/node";
import prisma from 'prisma/client';
import { json } from "@remix-run/node";
import { useLoaderData , Form } from '@remix-run/react';
import { invariantResponse } from '~/utils';
import { prefs } from '~/components/kanban-board/cookie';
import { Checkbox } from '~/components/checkbox';
import { getCompletedSubTaskCount } from '~/lib/utils';
import { DropDown } from '~/components/drop-down';
import { Button } from '~/components/button';
import { Dialog, links as dialogLinks } from '~/components/dialog/dialog.component';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...dialogLinks()
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
    <Dialog open={Boolean(task.id)} title={task.title} description={task.description}>
      <span>
        SubTask ({completedCount} of {task?.subTask?.length || 0})
      </span>
      <Form>
        <fieldset className="dialog__fieldset">
          {task.subTask.map(subtask => <Checkbox key={subtask.id} subTask={subtask} />)}
        </fieldset>

        <h3>Current Status</h3>
        <DropDown values={columnNames} label="Current Status" />
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Button>Save changes</Button>
        </div>
      </Form>
    </Dialog>
  )
}
