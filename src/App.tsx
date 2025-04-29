import { LiFiWidget } from '@lifi/widget'

export function App() {
  return (
    <LiFiWidget
      integrator="vite-example"
      config={{
        theme: {
          container: {
            border: '0px solid #00b3d2',
            marginBottom: '-10px',
            borderRadius: '18px',


          },
        },
      }}
    />
  )
}
