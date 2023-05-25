var contract
var accounts
var web3

function network(){
const web = new Web3(window.ethereum);
// Cambiar a la red de Polygon (Matic)
web.eth.net.getId()
  .then((networkId) => {
    if (networkId !== 11155111 ) {// Cambiar por Testnet 1313161555, Mainnet 1313161554 
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],// Cambiar por Testnet 0x4e454153, Mainnet 0x4e454152 
      })
      .then(() => {
        // Cambio de red exitoso
        console.log('Se cambió a la red de Polygon');
      })
      .catch((error) => {
        // Error al cambiar de red
        console.error('Error al cambiar a la red de Polygon:', error);
      });
    }
  })
  .catch((error) => {
    // Error al obtener el ID de la red actual
    console.error('Error al obtener el ID de la red:', error);
  })
}

network()


function metamaskReloadCallback()
{
  window.ethereum.on('accountsChanged', (accounts) => {
    document.getElementById("web3_message").textContent="Accounts changed, realoading...";
    window.location.reload()
  })
  window.ethereum.on('networkChanged', (accounts) => {
    document.getElementById("web3_message").textContent="Network changed, realoading...";
    window.location.reload()
  })
}

const getAccounts = async () => {
  metamaskReloadCallback()
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    resolve(web3)
  } catch (error) {
    console.log(error)
  }
}

async function connectWallet() {
  getAccounts()
  const getWeb3 = async () => {
    return new Promise((resolve, reject) => {
      if(document.readyState=="complete")
      {
        if (window.ethereum) {
          const web = new Web3(window.ethereum)
        resolve(web)
        } else {
          reject("must install MetaMask")
          document.getElementById("web3_message").textContent="Error: Please install Metamask";
        }
      }else
      {
        window.addEventListener("load", async () => {
          if (window.ethereum) {
            const web = new Web3(window.ethereum)
            resolve(web)
          } else {
            reject("must install MetaMask")
            document.getElementById("web3_message").textContent="Error: Please install Metamask";
          }
        });
      }
    });
  };
  
  var awaitWeb3 = async function () {
    web3 = await getWeb3()
  }
}



connectWallet()




async function getPersona() {
  var indice = document.getElementById('input_indice').value
  if(indice!=""){
     try {
    
    const persona = await contract.methods.getPersona(indice).call();
    document.getElementById("p_hello").innerHTML="Nombre: "+ persona[0]+"<br>Correo: "+ persona[1]+"<br>Institucion: "+ persona[2]+"<br>Enfoque: "+ persona[3]+"<br>Wallet: "+ persona[4]
    console.log('Detalles de la persona:');
    console.log('Nombre:', persona[0]);
    console.log('Correo:', persona[1]);
    console.log('Institución:', persona[2]);
    console.log('Enfoque:', persona[3]);
    console.log('Dirección:', persona[4]);
  } catch (error) {
    console.error('Error al obtener persona:', error);
  }
  }
}

var wallet=getWallet()
function getWallet(){
  
  if (typeof window.ethereum !== 'undefined') {
    const provider = window.ethereum;
  
    // Obtener la dirección de la billetera activa en Metamask
    provider.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        
        wallet= accounts[0];
        wallet
      })
      .catch((error) => {
        console.error('Error al obtener la dirección de la billetera:', error);
      });
     
  } else {
    console.error('Metamask no está instalado o no está disponible');
}
return wallet
}

const setLog = async () => {
  console.log("wallet: "+wallet)
    var nombre = document.getElementById('input_nombre').value
  var correo = document.getElementById('input_correo').value
  var institucion = document.getElementById('input_institucion').value
  var enfoque = document.getElementById('input_enfoque').value
  
  if(nombre!=""&&correo!=""&&institucion!=""&&enfoque!=""){

     const result = await contract.methods.setPersona(nombre,correo,institucion,enfoque,wallet)
            .send({ from: accounts[0], gas: 400000 })
  }
  
}