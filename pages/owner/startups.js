import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../src/configuration";
import Image from "next/image";
import Banner from "../../src/components/Lib/Banner";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { IconButton, Pagination } from "rsuite";
import { HiArrowLeft } from "react-icons/hi";
import { AiOutlineRight } from "react-icons/ai";
import BreadCrumb from "../../src/components/Lib/BreadCrumb";


const Startups = () => {
    const [startups, setStartups] = useState([]);
    const [types, setTypes] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [firstRender, setFirstRender] = useState(false)
    const getStartups = (page) => {
        axios.get(config.BASE_URL + "projects" + (page ? ('?page=' + page) : ''))
            .then(res => {
                if (res.data.success) {
                    setStartups(res.data.data)
                }
            })
    }
    const getProjectTypes = () => {
        axios.get(config.BASE_URL + "project/types?noPagination=1")
            .then(res => {
                if (res.data.success) {
                    setTypes(res.data.data)
                }
            })
    }
    useEffect(() => {
        getStartups();
        getProjectTypes()
    }, []);
    useEffect(async () => {
        if (firstRender) {
            getStartups(activePage);
        }
        setFirstRender(true)
    }, [activePage]);
    return <div className="startups">
        <Banner
            styles={{ marginBottom: '2.5rem' }}
        />
        <BreadCrumb />
        <h2>My Startups</h2>
        <div className="row mb-3">
            {
                startups.items && startups.items.map(item => {
                    return <div className="col-md-4 py-md-3">
                        <div className="startup-div">
                            <h3>{item.title}</h3>
                            <p>{types.find(i => i.id === item.id) ? types.find(i => i.id === item.id).name : ''}</p>
                            <div className="startup-image">
                                {
                                    item.logo ? <Image
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                        alt='icon'
                                        src={item.logo}
                                    /> : <h3>LOGO</h3>
                                }
                            </div>
                            <div className="choose-startup">
                                <Link href={"/startup/" + item.id} className="showAll">
                                    <a>
                                        Choose startup <button><RiArrowRightLine /></button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
        <Pagination
            prev
            last
            next
            first
            size="xs"
            total={startups.total ? startups.total : 0}
            limit={startups.per_page ? startups.per_page : 1}
            activePage={activePage}
            onChangePage={setActivePage}
        />
    </div>
}
Startups.layout = true;
export default Startups;