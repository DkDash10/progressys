import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import GrowthEngineers from './components/GrowthEngineers'
import Model5D from './components/Model5D'
import Navbar from './components/Navbar'
import OurSpecialization from './components/specialization/OurSpecialization'
import ProblemStatement from './components/ProblemStatement'
import ProgressysBlog from './components/ProgressysBlog'
import WhatWeDo from './components/whatWeDo/WhatWeDo'
import { ModalProvider } from './ModalContext'


function App() {

  return (
    <>
      <div className='progressys'>
        <ModalProvider>
          <Navbar/>
          <Banner/>
          <ProblemStatement/>
          <div id="aboutUs">
            <GrowthEngineers/>
          </div>
          <WhatWeDo/>
          <Model5D/>
          <div id="ourSpecialization">
            <OurSpecialization/>
          </div>
          <div id="progressysBlog">
            <ProgressysBlog/>
          </div>
          <div id="contactUs">
            <Footer/>
          </div>
        </ModalProvider>
      </div>
    </>
  )
}

export default App
