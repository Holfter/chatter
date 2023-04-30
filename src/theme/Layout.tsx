import Sidebar from '../components/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  )
}

export default Layout
