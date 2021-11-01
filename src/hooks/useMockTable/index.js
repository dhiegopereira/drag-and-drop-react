import React from "react"
import namor from 'namor'
import MockTableContext from "../../contexts/MockTableContext"

export const useMockTable = () => {
  return React.useContext(MockTableContext)
}

export const useMockTableProvider = () => {

  const range = len => {
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }

  const newPerson = id => {
    const statusChance = Math.random()
    return {
      id,
      firstName: namor.generate({ words: 1, numbers: 0 }),
      lastName: namor.generate({ words: 1, numbers: 0 }),
      age: Math.floor(Math.random() * 30),
      visits: Math.floor(Math.random() * 100),
      progress: Math.floor(Math.random() * 100),
      status:
        statusChance > 0.66
          ? 'relationship'
          : statusChance > 0.33
            ? 'complicated'
            : 'single',
    }
  }

  const makeData = (...lens) => {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth]
      return range(len).map(i => {
        return {
          ...newPerson(i),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
      })
    }

    return makeDataLevel()
  }



  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return {
    columns,
    data
  }
}
