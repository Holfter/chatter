export interface SidebarProps {
  toggleDrawer: (name: 'mobile' | 'desktop') => () => void
  open: boolean
}
