import "./doc.css";
import { CardWithCode, SideBar } from "../../index";
import React, { useState, useEffect } from "react";
import "../../../components.css";
import { capitalize } from "../../utils";
import { NavBar } from "../../basicComponents/navbar/navbar";
import { NavLink } from "react-router-dom";
function DocSideBar({ dataKeysList, activeComponent, setActiveComponent }) {
    const [list1, setList1] = useState(false);

    return (
        <div className={"side-bar open sidebar-static"}>
            <ul className="list">
                <br />
                <br />
                <br />
                <br />
                <li className={"list-item"}>
                    <NavLink to="/">
                        <button>Home</button>
                    </NavLink>
                </li>
                <li className={"list-item drop"}>
                    <button
                        onClick={() => {
                            setList1(!list1);
                        }}
                    >
                        Docs
                        <a
                            className={
                                list1
                                    ? "fas fa-chevron-up down"
                                    : "fas fa-chevron-down down"
                            }
                            onClick={() => {
                                setList1(!list1);
                            }}
                        ></a>
                    </button>

                    <ul
                        className="list"
                        style={
                            list1 ? { display: "block" } : { display: "none" }
                        }
                    >
                        {dataKeysList.map((componentName) => {
                            return (
                                <li
                                    className={
                                        activeComponent === componentName
                                            ? "list-item active"
                                            : "list-item"
                                    }
                                >
                                    <button
                                        onClick={() =>
                                            setActiveComponent(componentName)
                                        }
                                    >
                                        {capitalize(componentName)}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </li>
                <li className="list-item">
                    <button>Examples</button>
                </li>
            </ul>
        </div>
    );
}

function ScrollSpyItem({ id, subTitle, activeSec, setActiveSec }) {
    return (
        <li className={activeSec === id ? "list-item active" : "list-item"}>
            <a href={"#" + id} onClick={() => setActiveSec(() => id)}>
                {subTitle}
            </a>
        </li>
    );
}

function DocScrollSpy({ scrollSpyData }) {
    const [activeSec, setActiveSec] = useState(scrollSpyData[0].id);
    useEffect(() => {
        setActiveSec(scrollSpyData[0].id);
    }, [scrollSpyData[0].id]);
    // console.log(scrollSpyData,"focus spy");
    return (
        <div className={"side-bar open sidebar-static"}>
            <ul className="list">
                <br />
                <li className="list-item active">
                    <a>
                        <br />
                        <br />
                    </a>
                </li>
                <li className="list-item active">
                    <a className="title">Contents</a>
                </li>

                {scrollSpyData.map(({ id, subTitle }) => {
                    return (
                        <ScrollSpyItem
                            key={id}
                            id={id}
                            subTitle={subTitle}
                            activeSec={activeSec}
                            setActiveSec={setActiveSec}
                        />
                    );
                })}
            </ul>
        </div>
    );
}
export function Doc({ data, theme, setTheme }) {
    const [staticSideBar, setStaticSidebar] = useState(true);
    const dataKeysList = Object.keys(data);
    const [activeComponent, setActiveComponent] = useState(dataKeysList[0]);

    useEffect(() => {
        function handleResize() {
            setStaticSidebar((staticSideBar) => {
                if (window.innerWidth < 1400) {
                    // console.log("asdas false");
                    return false;
                }
                // console.log("asdas true");
                return true;
            });
        }
        handleResize();
    });
    useEffect(() => {
        function handleResize() {
            setStaticSidebar((staticSideBar) => {
                if (window.innerWidth < 1400) {
                    return false;
                }
                return true;
            });
        }

        window.addEventListener("resize", handleResize);

        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    });
    return (
        <>
            <div className="nav-fixed">
                <NavBar
                    lightNavColor={true}
                    theme={theme}
                    setTheme={setTheme}
                />
            </div>
            <div className="doc-container">
                {!staticSideBar ? (
                    <SideBar
                        dataKeysList={dataKeysList}
                        activeComponent={activeComponent}
                    />
                ) : (
                    <div className="doc-left-side">
                        <DocSideBar
                            dataKeysList={dataKeysList}
                            activeComponent={activeComponent}
                            setActiveComponent={setActiveComponent}
                        />
                    </div>
                )}
                <div className="doc-body">
                    <CardWithCode
                        data={data[activeComponent]}
                        activeComponent={activeComponent}
                    />
                    <br />
                    <br />
                    <br />
                </div>
                <div className="doc-right-side">
                    <DocScrollSpy scrollSpyData={data[activeComponent]} />
                </div>
            </div>
        </>
    );
}