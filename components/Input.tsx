import styles from '../styles/Input.module.css'

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
      <select name='country' onChange={handleChange}>
        <option value="GB">GB</option>
        <option value="RS">RS</option>
        <option value="NL">NL</option>
      </select>
      <input type="text" name='city' placeholder='Please enter your location...' onChange={handleChange} />
    </form>
  )
}

export default Input