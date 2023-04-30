import Sidebar from '../components/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return <Sidebar>{children}</Sidebar>
}

export default Layout
