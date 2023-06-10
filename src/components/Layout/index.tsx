import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import DesktopSidebar from '../Sidebar/Desktop'
import MobileSidebar from '../Sidebar/Mobile'

interface Layout {
  children: React.ReactNode
}

export default function Layout({children}: Layout) {
  const [open, setOpen] = React.useState({desktop: false, mobile: false})

  const toggleDrawer = (name: 'mobile' | 'desktop') => () => {
    setOpen(prev => ({...prev, [name]: !prev[name]}))
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <MobileSidebar toggleDrawer={toggleDrawer} open={open.mobile} />
      <DesktopSidebar toggleDrawer={toggleDrawer} open={open.desktop} />

      {/* Page Content */}
      <Box component="main" sx={{flexGrow: 1}}>
        {children}
      </Box>
    </Box>
  )
}
