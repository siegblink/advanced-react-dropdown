import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

export default function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />}>
        <Dropdown />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <li className="nav-item">
      <button className="icon-button" onClick={handleClick}>
        {props.icon}
      </button>
      {open && props.children}
    </li>
  );
}

function Dropdown() {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(
    function() {
      setMenuHeight(dropdownRef?.current?.firstChild?.offsetHeight)
    }, []
  )

  function calculateHeight(element) {
    const height = element.offsetHeight
    setMenuHeight(height)
  }

  function goToMenu(menuName) {
    return function() {
      setActiveMenu(menuName)
    }
  }

  return (
    <div className='dropdown' style={{height: menuHeight}} ref={dropdownRef}>
      <CSSTransition in={activeMenu === 'main'} onEnter={calculateHeight} timeout={500} classNames='menu-primary' unmountOnExit>
        <div className='menu'>
          <DropdownItem goToMenu={goToMenu('profile')} leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Profile</DropdownItem>
          <DropdownItem goToMenu={goToMenu('tutorials')} leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Tutorials</DropdownItem>
          <DropdownItem goToMenu={goToMenu('settings')} leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>Settings</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'profile'} onEnter={calculateHeight} timeout={500} classNames='menu-secondary' unmountOnExit>
        <div className='menu'>
          <DropdownItem goToMenu={goToMenu('main')} leftIcon={<ArrowIcon />}>Back to menu</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Log out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'tutorials'} onEnter={calculateHeight} timeout={500} classNames='menu-secondary' unmountOnExit>
        <div className='menu'>
          <DropdownItem goToMenu={goToMenu('main')} leftIcon={<ArrowIcon />}>Back to menu</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Javascript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Node</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Deno</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} onEnter={calculateHeight} timeout={500} classNames='menu-secondary' unmountOnExit>
        <div className='menu'>
          <DropdownItem goToMenu={goToMenu('main')} leftIcon={<ArrowIcon />}>Back to menu</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />} rightIcon={<ChevronIcon />}>Update profile</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

function DropdownItem(props) {
  function handleClick() {
    typeof(props.goToMenu) === 'function' && props.goToMenu()
  }

  return (
    <button className='menu-item' onClick={handleClick}>
      <span className='icon-button'>{props.leftIcon}</span>
      {props.children}
      <span className='icon-right'>{props.rightIcon}</span>
    </button>
  )
}
