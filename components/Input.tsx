import { AiOutlineSearch } from 'react-icons/ai'
import Image from 'next/image'

import styles from '../styles/Input.module.css'
import weatherIcon from '../public/weather.svg'
import rs from '../public/rs.svg'
import gb from '../public/uk.svg'
import nl from '../public/nl.svg'

interface Props {
  fetchWeather: () => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setLocation: React.Dispatch<React.SetStateAction<{
    city: string;
    country: string;
  }>>
}

const Input = ({ fetchWeather, setLoading, setLocation }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    fetchWeather()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    setLocation(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Image src={weatherIcon} width={25} height={25} alt='weather icon' />
      <div className={styles.custom_select}>
        <select name='country' onChange={handleChange}>
          <option value="GB">GB</option>
          <option value="RS">RS</option>
          <option value="NL">NL</option>
        </select>
      </div>
      <div className={styles.input_container}>
        <input type="text" name='city' placeholder='Please enter your location...' onChange={handleChange} />
        <AiOutlineSearch className={styles.icon} />
      </div>
    </form>
  )
}

export default Input