import Web3 from 'web3';
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js';
import LoomClientConfig from '../../json/loom-client-info.json';

function createLoomClient(clientHost) {
  return new Client(
    'default',
    `ws://${clientHost}:46658/websocket`,
    `ws://${clientHost}:9999/queryws`,
  );
}

export default class Contract {
  
  constructor() {
    if (new.target === Contract) {
      throw new TypeError('Contract is an interface and cannot be instantiated directly')
    }
  }
  
  setWeb3Provider(loomClient) {
    this.privateKey = CryptoUtils.generatePrivateKey();
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey);
    this.web3 = new Web3(new LoomProvider(loomClient, this.privateKey));
  }
  
  setContract(address, ABI) {
    // TODO: Use a real logger lib instead of the console logger.
    //       Needs to be able to specify log_level so we can control output
    console.log(ABI);
    const from = LocalAddress.fromPublicKey(this.publicKey).toString(); // The address for the caller of the function
    this.contract = new this.web3.eth.Contract(ABI, address, {from});
    console.log("CONTRACT");
    console.log(this.contract);
  }

  async initialize(name, abi) {
    console.log('INITIALIZING')
    this.client = createLoomClient(LoomClientConfig.clientHost);
    console.log('initialized loom client')
    this.setWeb3Provider(this.client);
    const loomContractAddress = await this.client.getContractAddressAsync(name)
    const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)
    console.log('LOOM CONTRACT ADDRESS: ', loomContractAddress)
    this.setContract(contractAddress, abi)
  }
}
