import { useState } from 'react'
// import AsyncComponent from './components/AsyncComponent.tsx'
import {Box} from "@chakra-ui/react";
import {TableDemo} from "./components/TableDemo.tsx";
// import Chakra from './Chakra'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Chakra/> */}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/*<AsyncComponent/>*/}
      <Box w='100%'>
        <TableDemo/>
      </Box>
    </>
  )
}

export default App
