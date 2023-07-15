import MenuIcon from '@mui/icons-material/Menu'
import {Box, Divider} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import {SidebarProps} from '../../../types/SidebarProps'
import MobileList from './MobileList'

const MobileSidebar = ({toggleDrawer, open}: SidebarProps) => {
  return (
    <Box position="fixed" width="100%" top={0} zIndex={2}>
      <IconButton
        sx={{display: {sm: 'none', xs: 'block'}}}
        onClick={toggleDrawer('mobile')}
      >
        <MenuIcon />
      </IconButton>
      <MuiDrawer anchor="left" open={open} onClose={toggleDrawer('mobile')}>
        <MobileList />
      </MuiDrawer>
      <Divider />
    </Box>
  )
}

export default MobileSidebar
