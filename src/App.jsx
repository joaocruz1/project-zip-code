import {FiSearch} from 'react-icons/fi';
import './App.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const[input, setInput]= useState('')
  const [cep,setCep] = useState({})

  async function handleSearch(){
    if (input === ''){
      alert("Preencha o campo com algum cep")

      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')


    }catch{
      alert("Ocorreu um erro")
      setInput('')
    }
    
  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className= "containerInput">
        <input type="text"
        placeholder="Digite o CEP"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />
      <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size = {25} color="#fff" />
      </button>
      </div>

      {Object.keys(cep).length >1 && (

           <main className='main'>
           <h2>CEP: {cep.cep}</h2>
   
           <span>{cep.logradouro} </span>
           <span>{cep.bairro} </span>
           <span>{cep.localidade} - {cep.uf} </span>
         </main>
      )}
   

    </div>
  )
}

export default App;
