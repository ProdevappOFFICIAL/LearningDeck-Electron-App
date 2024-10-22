import { FiMinus } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { VscChromeMaximize } from "react-icons/vsc";
import LearningDeck from '../ui/assets/lds.png'
import Server_down from './assets/server_down.png'
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Bolt, ChevronRight, House, LockOpen, RefreshCcw, RotateCwSquare } from "lucide-react";
import './drag.css'
function App() {
  const [error, setError] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);
  const [low , setLow] = useState(true)
  const [iframeKey, setIframeKey] = useState(0);
  const iframeUrl = "http://192.168.137.1:3000"; // Change this to your desired URL
  const [lockModeStatus, setLockModeStatus] = useState([]);




  useEffect(() => {
      // Function to check if the URL is reachable
   
      const checkUrl = async () => {
          try {
            setErr('Checking Server')
              const response = await fetch(iframeUrl, { method: 'HEAD' });
              if (!response.ok) {
                  throw new Error("Failed to fetch");
                  
              }
            setLow(true)
            setErr('Server is Online'); // Clear error if URL is reachable
            
          } catch (err) {
              setError(" Status: Server is Offline");
              setLow(true)
          
          } finally {
              setLoading(false); // Stop loading regardless of the outcome
             setErr('Server Down')
             setLow(true)
          }
      };

      // Check the URL immediately and then at intervals
      checkUrl();
    
    const intervalId = setInterval(checkUrl, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
     
  }, [iframeUrl]);

  const handleLoad = () => {
      setLoading(false);
      setErr('Checking Server')
      setError(''); // Clear error if loaded successfully
  };

  const handleReload = () => {
      setError(''); // Clear any existing error
    setErr('Checking Server')
      setLoading(true); // Show loading message
      setIframeKey(prevKey => prevKey + 1); // Change the key to reload iframe
  }; 

  const navihome = () => {
    handleReload()
  }
  
   
  return (
    <div className="flex flex-col w-screen h-screen">
      
      <div  className='flex w-full gap-x-2 bg-green-600 text-white p-2 items-center drag-region' >
    <House width={50} height={50}/>
   <p className=" font-bold ">LearningDeck</p>


     <div className='w-full'/>

    <div className="text-sm w-[300px] p-2">
     {error} 
    </div>
    <div className="flex  gap-x-3 pr-0 p-[-90px] mr-0"    >
    <House width={21} height={21} onClick={navihome} />
    <LockOpen width={21} height={21}/></div>
    <div className="ml-2 p-1 hover:bg-green-200/20 hover:rounded-full rounded-full "    >
                <Bolt width={20} height={20}/>
     
    </div>
     <Header />
      </div>  
      
      
      <div className=" flex flex-col h-full w-full items-center justify-center bg-green-600">
     {loading && <p className="items-center px-2 py-1"> <MoonLoader color="white" /></p>}
          
            <iframe
                key={iframeKey}
                id="my-iframe"
                src={iframeUrl}
                onLoad={handleLoad}
                style={{ display: loading ? 'none' : 'block' }}
                className="  h-full w-full border-none"
            ></iframe> 
       
     
         

          
        
      </div>
 
          
    </div>
  );
}

function Header() {
  return (
    <header className='bg-green-200/20 rounded-full px-2 flex gap-x-3 py-1 text-white no-drag-gion'>
   
    <button
      onClick={() => window.electron.sendFrameAction('MINIMIZE')}
      className=" hover:bg-green-600 p-1 hover:rounded-full"
       id="no-drag-gion"
    >
      <FiMinus />
    </button>
    <button
        className=" hover:bg-green-600 p-1 hover:rounded-full"
      onClick={() => window.electron.sendFrameAction('MAXIMIZE')}
      
    >
      <VscChromeMaximize />
    </button>
     <button
       className=" hover:bg-green-600 p-1 hover:rounded-full"
      onClick={() => window.electron.sendFrameAction('CLOSE')}
     
    >
      <VscClose />
    </button>
  </header>
  );
}


export default App;
