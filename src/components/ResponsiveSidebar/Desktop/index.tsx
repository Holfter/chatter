import {styled, Theme, CSSObject} from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import MenuIcon from '@mui/icons-material/Menu'
import DesktopList from './DesktopList'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: '10px',
  ...theme.mixins.toolbar,
}))

const DesktopDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

interface DesktopSidebarProps {
  toggleDrawer: (name: 'mobile' | 'desktop') => () => void
  open: boolean
}

const DesktopSidebar = ({toggleDrawer, open}: DesktopSidebarProps) => {
  return (
    <DesktopDrawer
      sx={{display: {sm: 'block', xs: 'none'}}}
      variant="permanent"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={toggleDrawer('desktop')}>
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <DesktopList open={open} />
    </DesktopDrawer>
  )
}

export default DesktopSidebar
