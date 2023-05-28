import ResponsiveSidebar from '../components/ResponsiveSidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return <ResponsiveSidebar>{children}</ResponsiveSidebar>
}

export default Layout
