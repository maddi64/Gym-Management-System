import { Button } from '@/components/ui';
import { log } from 'console';
import * as Bluetooth from 'react-web-bluetooth'

function Testing() {
  
    /*const isAvailable = Bluetooth.useGetDevices();
        if (!isAvailable) {
          return;
        }
        try {
          const device = Bluetooth.useGetDevices();
          console.log('Success: Got any device: ', device);
        } catch (error) {
          console.log(`Error: Couldn't get any device`, error);
          console.error(`Error: Couldn't get any device`, error);
        }*/

    return (
        <div>
            <Button onClick={Testing}>Connect</Button>
        </div>

        /*<>
        <button className="bluetooth" onClick={connectToDevice}>CONNECT</button>
        </>*/
        
    );
}

export default Testing


