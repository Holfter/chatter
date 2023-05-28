import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {Icon} from '@mui/material'
import {topSidebarList, bottomSidebarList} from '../Sidebarlist'
import ListItemLinkWrapper from '../../Wrappers/ListItemLinkWrapper'

interface DesktopListProps {
  open: boolean
}

const DesktopList = ({open}: DesktopListProps) => {
  return (
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
          <ListItemLinkWrapper path={item?.path}>
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
          </ListItemLinkWrapper>
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
              <ListItemText primary={item.name} sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
          </ListItem>
        ))}
      </Box>
    </List>
  )
}

export default DesktopList
