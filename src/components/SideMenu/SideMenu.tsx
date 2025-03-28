import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MenuItem from "./MenuItem/MenuItem";
import {SvgIconProps} from "@mui/material";
import React, {useState} from "react";
import "./SideMenu.scss";
import Logo from "../../assets/Hershey-bg-logo.png";
import {useLocation, useNavigate} from "react-router-dom";
import { ROUTES } from '../../lib/consts';


type MenuItemProp = {
    icon: React.ReactElement<SvgIconProps>;
    title: string;
    route: string | null;
    onClick?: () => void;
};


const SideMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const {pathname} = useLocation();
    const navigate = useNavigate();


    const mainMenu: MenuItemProp[] = [
        {
            title: "Pending",
            route: ROUTES.PENDING,
            icon: <UpdateOutlinedIcon/>,
        },

        {
            title: "Approved",
            route: ROUTES.APPROVED,
            icon: <DoneAllOutlinedIcon/>,
        },


        {
            title: "Rejected",
            route: ROUTES.REJECTED,
            icon: <CancelOutlinedIcon/>,
        },
        // {
        //     title: "Winners",
        //     route: ROUTES.WINNER,
        //     icon: <EmojiEventsOutlinedIcon/>,
        // },

    ];
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div
            // className={`side-menu ${isExpanded ? "expanded" : ""}`}
            className={`side-menu ${!isExpanded ? "expanded" : ""}`}

            onMouseLeave={() => {
                setIsExpanded(false);
            }}
        >
            <div className="head">
                {!isExpanded ? (
                   <img src={Logo} alt="Logo" className="logo"/>
                ) : (
                    < MenuOutlinedIcon fontSize="large" onClick={() => setIsExpanded(true)}/>
                )}
            </div>
            <div className="content">
                {mainMenu.map((item) => (

                    <MenuItem
                        key={`main-menu-${item.title}`}
                        title={item.title}
                        icon={item.icon}
                        isActive={pathname === item.route}
                        isExpanded={isExpanded}
                        onClick={() => {
                            if (item.route) navigate(item.route);
                        }}
                    />
                ))}
            </div>
            <div className="footer">
               <button type="button" onClick={handleLogout}>Log Out <LogoutOutlinedIcon/></button>

            </div>
        </div>
    );
};

export default SideMenu;
