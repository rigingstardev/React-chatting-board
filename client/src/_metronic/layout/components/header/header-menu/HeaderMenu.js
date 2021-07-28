/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
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
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">SURFACE</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">RÉPERTOIRE</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">INFORMATIONS</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">CONTACT</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {user && <li className={`menu-item menu-item-rel`}>
                <NavLink className="menu-link" to="/logout">
                    <span className="menu-text">LOGOUT</span>
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
