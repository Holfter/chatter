import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MobileList from './MobileList'
import {SidebarProps} from '../../../types/SidebarProps'
import {Box, Paper} from '@mui/material'

const MobileSidebar = ({toggleDrawer, open}: SidebarProps) => {
  return (
    <Box position="fixed" width="100%" top={0} zIndex={2} component={Paper}>
      <IconButton
        sx={{display: {sm: 'none', xs: 'block'}}}
        onClick={toggleDrawer('mobile')}
      >
        <MenuIcon />
      </IconButton>
      <MuiDrawer anchor="left" open={open} onClose={toggleDrawer('mobile')}>
        <MobileList />
      </MuiDrawer>
    </Box>
  )
}

export default MobileSidebar
