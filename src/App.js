import {useEffect,useState} from 'react';
import {Log, ethers} from 'ethers';
import Web3, { providers } from 'web3modal';

import Logo from './images/Logo.png';
import Icon from './images/Icon.png';
import './Style/Appcss.css';


const App = () => {
  const[currentAccount,setAccount] = useState(false);
  const[connect,setConnect]=useState();
  const[balance, setBalance] = useState(0);
  const failMsg = 'Please install metamask & connect your metamask';
  const successMsg = 'Your account is successfully connet to metamask';
  
  async function MetaConnect(){
      if(!window.ethereum){
         setAccount(false);
         window.alert(failMsg);
      }  
      else{  
        try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const con = await window.ethereum.request({method : "eth_requestAccounts"});
      setConnect({con,provider});
        }catch{
           window.location.reload();
        }
      }
  }

   useEffect(()=>{
    window.ethereum.on('accountsChanged', async function(){
    MetaConnect();
   
  })
   },[])
  useEffect(()=>{
     
     async function getInfo(){
        setAccount(connect.con[0]);
       const bal = await (connect.provider).getBalance(connect.con[0]);
       const balTOEth = ethers.formatEther(bal)
        setBalance(`${balTOEth} eth`);
       console.log(balTOEth,"  ",connect.con[0]);
     }
     if(connect){
       getInfo();
     }
  },[connect]);
    
  return (
      <div className='card-container'>
        <div className='box'>
          {!currentAccount ? "" : <span className='pro'>PRO</span>}
           <img src={Icon} alt='profile' width={80} height={80} className='icon'></img>
           <h3>Check Ether Balance</h3>

           {!currentAccount ? (
              <>
              <div className='msg'>
          <p>{failMsg}</p>
        </div>
        <img src={Logo} alt='ethers' width={100} height={100}></img>
           <p>Welcome to ether account balance checker</p>
          
        </>
           ) : (
              <div>
                <h6>Verified<span className='tick'>&#10004;</span></h6>
              </div>
           )}
         {(!currentAccount && !connect) ? 
           
           <div className='button'>
             <button onClick={MetaConnect}>connect</button>
              </div>
            
            :
             <div className='skills'>
               <h6>your ether</h6>
               <ul>
                 <li>Account</li>
                 <li>{currentAccount}</li>
                 <li>Balance</li>
                 <li>{balance}</li>
               </ul>
              </div>  
        }
        </div>
      </div>
    

  )
}

export default App