/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { QuickUserToggler } from "../../extras/QuiclUserToggler";
import { shallowEqual, useSelector } from 'react-redux';

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth, shallowEqual);
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ml-auto ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/* begin::1 Level */}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/chat')}`}>
                <NavLink className="menu-link" to="/chat">
                    <span className="menu-text">SURFACE</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/personList')}`}>
                <NavLink className="menu-link" to="/personList">
                    <span className="menu-text">RÉPERTOIRE</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/user-profile')}`}>
                <NavLink className="menu-link" to={{
                    pathname:'/user-profile',
                    state: {title:'from home page'}
                    }}>
                    <span className="menu-text">INFORMATIONS</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/contact')}`}>
                <NavLink className="menu-link" to="/contact">
                    <span className="menu-text">CONTACT</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {user && <li className={`menu-item menu-item-rel`}>
                <NavLink className="menu-link" to="/logout">
                    <span className="menu-text">SE DÉCONNECTER</span>
                </NavLink>
            </li>}
            {user && <li className={`menu-item menu-item-rel`}>
                <QuickUserToggler />
            </li>}
            {/*end::1 Level*/}
        </ul>
        {/*end::Header Nav*/}
    </div>;
}
