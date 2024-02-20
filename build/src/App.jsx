import { useState, useEffect } from 'react'
import Web3 from 'web3';
import ABI from '../contracts/VotingSystem.json'
const App = () => {
  const [wallet, setWallet] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)
  const [account, setaccount] = useState(null)
  const [contender, setcontender] = useState(``)
  const [contenders, setcontenders] = useState(``)
  const [owner, setowner] = useState(``)
  const [selectedValue, setSelectedValue] = useState('');
  const [isVoted, setVoted] = useState(false);
  const [votes, setvotes] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      setWallet(`Metamask Detected`)

      //request prompt metamask to establish connection with our browser
      await window.ethereum.request({ method: 'eth_requestAccounts' });


      const web3 = new Web3(window.ethereum);

      //saving instance on state variable for futher usage
      setWeb3(web3);



      //fetching accounts
      const acc = await web3.eth.getAccounts()

      setaccount(acc[0]);
      console.log(account)

      const contract = new web3.eth.Contract(ABI.abi, `0x12FAe32893bCcf04bb22160Fae7E8EFF2263804c`);
      setContract(contract)
      console.log(contract)
      console.log(await contract.methods.owner().call())
      const own = await contract.methods.owner().call();
      setowner(own);
      setTimeout(() => {
        
        checkVoted();
        getContender();
      }, 2000);

    }
    else {
      setWallet(`Metamask not Detected please install`)

    }
  }
  useEffect(() => {
    connectWallet()
    
  }, [])


  const checkVoted = async () => {
    // console.log(account)
    const res = await contract.methods.hasVoted(account).call();
    console.log(res)
    setVoted(res)
  }

  const addContender = async () => {
    console.log(contract)

    const res = await contract.methods.addContender(contender).send({ from: account });
    console.log(res)
  }
  const getContender = async () => {
    // console.log(contract)
    checkVoted()
    const contenders = await contract.methods.getContenders().call();
    console.log(contenders)
    setcontenders(contenders)
  }
  const vote = async () => {
    // console.log(contract)

    const vote = await contract.methods.vote(selectedValue).send({ from: account });
    console.log(vote);

  }

  const getVotes = async () => {
    // console.log(contract)

    const vote = await contract.methods.contenderVotes(selectedValue).call();
    console.log(web3.utils.toNumber(vote));
    setvotes(web3.utils.toNumber(vote));

  }


  return (
    <div className='w-screen h-screen bg-gray-950 text-white flex flex-col justify-center items-center'>

      <h1 className='text-4xl mb-6' >{wallet}</h1>
      <h1 className='text-2xl' >{account}</h1>
      {
        (account == owner) &&

        <div className='w-1/3 h-20 rounded-md my-2 flex justify-center items-center bg-slate-800 '>
          <p className='mr-3'>Add Contenders</p>
          <input className=' p-2 outline-none text-black' value={contender} onChange={(e) => setcontender(e.target.value)} type="text" placeholder='enter contender name' />
          <button onClick={addContender} className='bg-blue-700 p-2 hover:bg-blue-900 px-4'>Add Contender</button>
        </div>
      }
      <div className='w-1/3 h-20 rounded-md text-black my-2 flex justify-center items-center bg-slate-800 '>


        {(isVoted == false) && (contenders) && contenders.length > 0 ? (
          <>
            <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="">Select an option</option>
              {contenders.map((contender, index) => (
                <option key={index} value={contender}>
                  {contender}
                </option>
              ))}
            </select>

            <button onClick={vote} className='bg-blue-700 text-white p-2 px-8'>Vote</button>



          </>

        ) : (

          <p className='bg-red-500 p-2 px-3 ml-2 rounded-md'>You already Voted!!!!</p>

        )}



      </div>
      <div className='w-1/3  rounded-md text-white my-2 p-5 flex flex-col justify-center items-center bg-slate-800 '>
          <div>


        {(contenders) && contenders.length > 0 ? (
          <>
            <select className='text-black  p-2' value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
              <option value="">Select an option</option>
              {contenders.map((contender, index) => (
                <option key={index} value={contender}>
                  {contender}
                </option>
              ))}
            </select>
            
            <button onClick={getVotes} className='bg-blue-700 text-white p-2 px-8'>get votes count</button>



          </>

        ) : (
          <>
            <p>No contenders available</p>
            <button onClick={getContender} className='bg-blue-700 text-white p-2 px-8'>get Contenders</button>
          </>

        )} <br />
          </div>

        <h1 className='text-2xl mt-4 capitalize'>{selectedValue} has {votes} Votes</h1>
      </div>
          <button onClick={checkVoted}>Check voted</button>
    </div>
  )
}

export default App