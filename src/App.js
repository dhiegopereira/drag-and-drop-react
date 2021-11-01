import React from 'react'
import Table from './components/Table';
import { MockTableProvider } from './contexts/MockTableContext';

const App = () => {
  return (
    <MockTableProvider>
      <Table />
    </MockTableProvider>
  )
}

export default App
