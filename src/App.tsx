
import Form from './components/Form/Form';
import { Routes, Route } from 'react-router-dom';
import Projects from './components/Projects/Projects';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Form />}/>
      <Route path='/projects' element={<Projects />}/>
    </Routes>
  )
}

export default App
