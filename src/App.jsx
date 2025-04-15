import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import GrowthEngineers from './components/GrowthEngineers'
import Navbar from './components/Navbar'
import ProblemStatement from './components/ProblemStatement'
import WhatWeDo from './components/whatWeDo/WhatWeDo'

function App() {

  return (
    <>
      <div className='progressys'>
        <Navbar/>
        <Banner/>
        <ProblemStatement/>
        <GrowthEngineers/>
        <WhatWeDo/>
        <Footer/>
      </div>
    </>
  )
}

export default App
