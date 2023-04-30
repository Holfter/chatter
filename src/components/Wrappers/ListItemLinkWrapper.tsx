import RouterLink from '../RouterLink'

interface ListItemLinkWrapperProps {
  children: React.ReactNode
  path?: string
}

const ListItemLinkWrapper = ({children, path}: ListItemLinkWrapperProps) => {
  if (!path) return <>{children}</>
  return <RouterLink to={path}>{children}</RouterLink>
}

export default ListItemLinkWrapper
