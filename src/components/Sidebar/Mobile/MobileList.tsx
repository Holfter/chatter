import {Icon} from '@mui/material'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemLinkWrapper from '../../Wrappers/ListItemLinkWrapper'
import {bottomSidebarList, topSidebarList} from '../Sidebarlist'

const MobileList = () => {
  return (
    <Box width={240} height="100%">
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
            <ListItemLinkWrapper path={item?.path} key={item.name}>
              <ListItem disablePadding sx={{display: 'block'}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
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
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={item.name} /* sx={{opacity: open ? 1 : 0}} */
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Box>
  )
}

export default MobileList
