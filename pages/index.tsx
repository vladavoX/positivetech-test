import { useEffect, useState } from 'react'
import Head from 'next/head'
import { TailSpin } from 'react-loader-spinner'

import styles from '../styles/Home.module.css'
import Input from '../components/Input'
import Temperatures from '../components/Temperatures'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState(null)
  const [dailyTemps, setDailyTemps] = useState<number[]>([])
  const [tempsMinMax, setTempsMinMax] = useState<number[]>([])
  const [location, setLocation] = useState({
    city: '',
    country: 'GB',
  })

  const leftColor = [15, 75, 148]
  const midColor = [155, 220, 254]
  const rightColor = [254, 148, 88]

  let propotion: number = 0
  let interpolatedColor: number[] = []
  let hexColors: string[] = []
  
  const fetchWeather = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.city},${location.country}&appid=${process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}`)
    const data = await res.json()
    if (data.cod === '404') {
      setLoading(false)
      setError(true)
      return
    }
    setData(data)
    setError(false)
  }

  const dailyAverageTemp = (data: any) => {
    let temps: number[] = []
    for (let i = 0; i < data.list.length; i++) {
      let date = data.list[i].dt_txt.split(' ')[0]
      if (date === data.list[i + 1]?.dt_txt.split(' ')[0]) {
        temps.push(data.list[i].main.temp)
      } else {
        temps.push(data.list[i].main.temp)
        let average = temps.reduce((a, b) => a + b, 0) / temps.length - 273.15
        setDailyTemps(prevState => [...prevState, Math.trunc(average)])
        temps = []
      }
    }
  }

  useEffect(() => {
    setDailyTemps([])
    if (data) {
      dailyAverageTemp(data)
    }
    setLoading(false)
  }, [data])

  useEffect(() => {
    setTempsMinMax([])
    if (dailyTemps.length > 0) {
      setTempsMinMax([Math.min(...dailyTemps), Math.max(...dailyTemps)])
    }
  }, [loading])

  useEffect(() => {
    calcPropotion(tempsMinMax)
  }, [tempsMinMax])

  const calcPropotion = (temps: number[]) => { 
    for(let i=0; i<temps.length; i++) {
      if (temps[i] <= 0) {
        propotion = (temps[i] - (-40)) / (0 - (-40))
        interpolatedColor = [
          Math.trunc(lerp(leftColor[0], midColor[0], propotion)),
          Math.trunc(lerp(leftColor[1], midColor[1], propotion)),
          Math.trunc(lerp(leftColor[2], midColor[2], propotion))
        ]
        hexColors.push('#' + ((1 << 24) + (interpolatedColor[0] << 16) + (interpolatedColor[1] << 8) + interpolatedColor[2]).toString(16).slice(1))
      } else {
        propotion = (temps[i] - 0) / (40 - 0)
        interpolatedColor = [
          Math.trunc(lerp(midColor[0], rightColor[0], propotion)),
          Math.trunc(lerp(midColor[1], rightColor[1], propotion)),
          Math.trunc(lerp(midColor[2], rightColor[2], propotion))
        ]
        hexColors.push('#' + ((1 << 24) + (interpolatedColor[0] << 16) + (interpolatedColor[1] << 8) + interpolatedColor[2]).toString(16).slice(1))
      }
    }
    const bg = document.querySelector('.bg') as HTMLElement
    bg.style.background = `linear-gradient(to right, ${hexColors[0]}, ${hexColors[1]})`
  }
  
  const lerp = (a: number, b: number, p: number) => {
    return a + (b - a) * p
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} bg`}>
        <Input fetchWeather={fetchWeather} setLoading={setLoading} setLocation={setLocation} />
        {loading && (
          <TailSpin color='#000' />
        )}
        {!loading && data && (
          <Temperatures data={data} dailyTemps={dailyTemps} />
        )}
        {error && (
          <p className={styles.error}>Requested city does not exist in requested country!</p>
        )}
      </main>
    </>
  )
}
