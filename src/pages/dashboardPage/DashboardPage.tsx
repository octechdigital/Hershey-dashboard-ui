import './style.scss'
import {Outlet, useLocation} from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



export default function DashboardPage() {
    
    return(
        <div className={'dashboard-layout'}>
            <section className={'dashboard-layout-sidebar'}>
                <SideMenu/>
            </section>
            <section className={'dashboard-layout-card'}>
                <Outlet />
            </section>

        </div>
    )
}