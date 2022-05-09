import { NAV_BAR_HEIGHT, NAV_BAR_PAGES } from "@/constants"
import { NavLink } from "react-router-dom"

const LinkList = () => {
  return (
    <ul 
      style={{
        display: 'flex',
        alignItems: 'center',
        height: NAV_BAR_HEIGHT,
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      }}
    >
      {NAV_BAR_PAGES.map((page) => (
        <li 
          key={page.label} 
          style={{
            float: "left",
            marginLeft: 18,
            fontSize: '0.85rem'
          }}
        >
          <NavLink 
            to={page.path} 
            style={({isActive}) => (
              {
                textDecoration: 'none', 
                color: isActive ? 'white' : '#e5e5e5', 
                ...isActive && {fontWeight: 700}
              }
            )}
          >
            {page.label}
          </NavLink>
        </li>
      ))}
    </ul>)
}

export default LinkList