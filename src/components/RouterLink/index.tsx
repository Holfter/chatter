import {Link, LinkProps} from 'react-router-dom'
interface RouterLinkProps extends LinkProps {}

const RouterLink = (props: RouterLinkProps) => {
  return <Link {...props} style={{textDecoration: 'none', color: 'inherit'}} />
}

export default RouterLink
