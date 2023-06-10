import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MobileList from './MobileList'
import {SidebarProps} from '../../../types/SidebarProps'

const MobileSidebar = ({toggleDrawer, open}: SidebarProps) => {
  return (
    <>
      <IconButton
        sx={{display: {sm: 'none', xs: 'block'}}}
        onClick={toggleDrawer('mobile')}
      >
        <MenuIcon />
      </IconButton>
      <MuiDrawer anchor="left" open={open} onClose={toggleDrawer('mobile')}>
        <MobileList />
      </MuiDrawer>
    </>
  )
}

export default MobileSidebar
