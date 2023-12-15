import React from 'react'
import data from './data.json'
import _ from 'lodash'

export default function useServer() {
  const [db, setDb] = React.useState(data)

  const handlers = {
    addColumn: (boardId: string) => { },
    addTask: (columnId: string) => { },
    addSubTask: (taskId: string) => { },
  }
  return [
    { db },
    { handlers },
  ]
}
