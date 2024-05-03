import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [search,setSearch] = useState("")
  const [data,setData] = useState({})
  const clouds = [
    {weather :"few clouds",image :"./few.gif"},
    {weather :"scattered clouds",image :"./scattered.webp"},
    {weather :"broken clouds",image :"./broken.gif"},
    {weather :"overcast clouds",image :"./overcast.gif"},
  ]

  async function getWeather(){
    if(search!=""){
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e88cdb46830b14b1806bf31a738563d6`)
      //console.log(res.data);
      setData(res.data)
   }
   else{
    alert("Enter Location")
   }
  }
  async function getKochi(){
    const kochiRes = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=e88cdb46830b14b1806bf31a738563d6')
    setData(kochiRes.data)
  }
  useEffect(()=>{
    getKochi()
    // clouds.map((item)=>{item.weather=="broken clouds"?console.log(item.weather):console.log("empty");})
  },[])
  // console.log(` dat is${data.weather&&data.weather[0].description}`);
  //console.log(clouds.find((item)=>item.weather===(data.weather&&data.weather[0].description))?.image);
  
  // console.log(data);
  return (
  <>
      <div className="container-fluid" >

        
      <section className="vh-100" style={{backgroundImage: data? `url(${clouds.find((item)=>item.weather===(data.weather&&data.weather[0].description))?.image})`:"",backgroundSize : 'cover',backgroundPosition :'center',filter :'brightness(100%)'}}>
    
          <div className="container py-5 h-100">
            
            <div className="row d-flex justify-content-center  h-100">
              
              <div className="col-md-10 col-lg-8 col-xl-6">
            
                <div className="container-fluid m-3">
                  <div className="d-flex opacity-75" role="search">
                    <input className="form-control me-2" id='input' onChange={(e)=>{setSearch(e.target.value)}} type="search" placeholder="Search"  aria-label="Search"/>
                    <button className="btn btn-outline-primary" onClick={getWeather} type="submit">Search</button>
                  </div>
                </div>

                <div className="card bg-light text-dark" style={{borderRadius: "40px"}}>
                  <div className="bg-image position-relative" style={{borderRadius: "35px"}}>
                    <div className=" podition-absolute top-0 start-0" >
                    </div>
                    <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
                  </div>
                  <div className="card-img-overlay text-light p-5">
                    <h4 className="mb-0">{data.name}, {data.sys && data.sys.country}</h4>
                    <p className="display-2 my-3">{Math.round(((data.main && data.main.temp)-273.15)*100)/100}°C</p>
                    <p className="mb-2">Feels Like: <strong>{Math.round(((data.main && data.main.feels_like)-273.15)*100)/100}°C</strong></p>
                    <h5>{data.weather && data.weather[0].description}</h5>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default App
