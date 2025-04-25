import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { HiOutlineDeviceMobile } from 'react-icons/hi'
import AdaptableCard from '@/components/shared/AdaptableCard'

const Testing = () => {
    const [isConnecting, setIsConnecting] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [deviceInfo, setDeviceInfo] = useState<string | null>(null)

    const connectToDevice = async () => {
        setIsConnecting(true)
        try {
            if (!navigator.bluetooth) {
                setDeviceInfo('Web Bluetooth API is not available in your browser')
                setIsConnecting(false)
                return
            }

            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            })

            setIsConnected(true)
            setDeviceInfo(`Connected to: ${device.name || 'Unknown Device'}`)
        } catch (error) {
            console.error('Error connecting to device:', error)
            setDeviceInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setIsConnecting(false)
        }
    }

    return (
        <div className="container mx-auto">
            <AdaptableCard>
                <div className="flex flex-col items-center p-6">
                    <h4 className="mb-4">Bluetooth Testing</h4>
                    <div className="text-center mb-6">
                        <HiOutlineDeviceMobile className="text-6xl mx-auto mb-4 text-indigo-600" />
                        <p className="mb-4">Connect to a Bluetooth device to test functionality</p>
                    </div>
                    
                    <Button 
                        variant="solid" 
                        className="mb-4" 
                        onClick={connectToDevice}
                        loading={isConnecting}
                        disabled={isConnected}
                    >
                        {isConnected ? 'Connected' : 'Connect to Device'}
                    </Button>
                    
                    {deviceInfo && (
                        <Card className="w-full mt-4">
                            <h6 className="mb-2">Device Information</h6>
                            <p>{deviceInfo}</p>
                        </Card>
                    )}
                </div>
            </AdaptableCard>
        </div>
    )
}

export default Testing