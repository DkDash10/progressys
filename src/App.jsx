import './App.css'
import Banner from './components/Banner'
import GrowthEngineers from './components/GrowthEngineers'
import Navbar from './components/Navbar'
import ProblemStatement from './components/ProblemStatement'
import WhatWeDo from './components/WhatWeDo'

function App() {

  return (
    <>
      <div className='progressys'>
        <Navbar/>
        <Banner/>
        <ProblemStatement/>
        <GrowthEngineers/>
        <WhatWeDo/>
      </div>
    </>
  )
}

export default App
