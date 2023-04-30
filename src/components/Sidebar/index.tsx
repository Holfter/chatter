import * as React from 'react'
import {styled, Theme, CSSObject} from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {Icon} from '@mui/material'
import {topSidebarList, bottomSidebarList} from './list'

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

const Drawer = styled(MuiDrawer, {shouldForwardProp: prop => prop !== 'open'})(
  ({theme, open}) => ({
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
  }),
)

interface SidebarProps {
  children: React.ReactNode
}

export default function Sidebar({children}: SidebarProps) {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = () => {
    setOpen(prev => !prev)
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {topSidebarList.map(item => (
              <ListItem key={item.name} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{opacity: open ? 1 : 0}}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
          <Box>
            {bottomSidebarList.map(item => (
              <ListItem key={item.name} disablePadding sx={{display: 'block'}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{opacity: open ? 1 : 0}}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </List>
      </Drawer>
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        {children}
      </Box>
    </Box>
  )
}
