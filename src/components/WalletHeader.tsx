// WalletHeader.tsx
import React from 'react'
import { Box, Button as MuiButton, Typography } from '@mui/material'
import { styled, keyframes } from '@mui/system'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

// 1. Define the keyframes
const spin = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`
const fade = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(0); opacity: 0; }
`

// 2. Create a styled wrapper
const ButtonWrapper = styled('div')({
  display: 'inline-block',
  padding: '1.5px',
  background: 'linear-gradient(90deg, #5cb0ff, #ff5079, #5cb0ff, #ff5079)',
  backgroundSize: '400%',
  color: 'black',
  borderRadius: '200px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 0 6px rgba(138, 132, 226, 0.6), 0 0 6px rgba(138, 132, 226, 0.4), 0 0 6px rgba(105, 250, 221, 0.3)',
  animation: `${spin} 4s linear infinite`,
  // optional: if you want particles inside, you can position them here
})

// 3. Optionally wrap your actual MUI Button text so it stays styled
const StyledButton = styled(MuiButton)({
  display: 'block',
  // ensure it fills the wrapper’s shape
  borderRadius: '200px',
  overflow: 'hidden',
  // to ensure the gradient shows
  background: 'transparent',
  color: '#fff',
  fontWeight: 600,
  // remove default MUI shadow so only your glow appears
  boxShadow: 'none',
  // preserve your hover/focus states if needed
  '&:hover': {
    boxShadow: 'none'
  }
})

export function WalletHeader() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connectAsync } = useConnect()

  return (
    <Box
      p={2}
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid rgba(0, 0, 0, 0)"
    >
      <Typography px={2} fontWeight={600} fontSize={24}>
        <a href="https://slushiswap.vercel.app/">
          <img src="/textlogo.png" alt="logo" />
        </a>
      </Typography>

      <Box display="flex" alignItems="center">
        <Typography px={2}>{address}</Typography>

        {/* Wrap your connect/disconnect button in ButtonWrapper */}
        <ButtonWrapper>
          <StyledButton
            variant="contained"
            disableElevation
            onClick={() =>
              isConnected
                ? disconnect()
                : connectAsync({ connector: connectors[0] })
            }
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </StyledButton>
        </ButtonWrapper>
      </Box>
    </Box>
  )
}
