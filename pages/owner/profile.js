import React, {useEffect, useState} from 'react';
import {Pagination, Panel} from 'rsuite';
import BreadCrumb from '../../src/components/Lib/BreadCrumb';
import Banner from '../../src/components/Lib/Banner';
import CardOwnerProfile from '../../src/components/Owner/CardOwnerProfile';
import CardTeammerWorkExperience from '../../src/components/Profile/CardTeammerWorkExperience';
import CardStartUp from '../../src/components/Cards/CardStartUp';
import CardTeammerPortfolio from '../../src/components/Profile/CardTeammerPortfolio';
import config from '../../src/configuration';
import {getFetchData} from '../../lib/fetchData';
import getAuth, {getToken} from "../../lib/session";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {RiArrowRightLine} from "react-icons/ri";

const ProfileOwner = (props) => {
    const [startups, setStartups] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [firstRender, setFirstRender] = useState(false);
    const [types, setTypes] = useState([]);
    useEffect(() => {
        // console.clear();
        getStartups();
        getProjectTypes()
    }, [])
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

    const toggleCreateModal = () => {
        setIsOpenCreateModal(!isOpenCreateModal);
    };
    useEffect(async () => {
        if (firstRender) {
            getStartups(activePage);
        }
        setFirstRender(true)
    }, [activePage]);
    const getProjectTypes = () => {
        axios.get(config.BASE_URL + "project/types?noPagination=1")
            .then(res => {
                if (res.data.success) {
                    setTypes(res.data.data)
                }
            })
    }
    const getStartups = (page) => {
        axios.get(config.BASE_URL + "users/projects" + (page ? ('?page=' + page) : ''))
            .then(res => {
                console.log('res', res)
                if (res.data.success) {
                    setStartups(res.data.data)
                }
            })
    }
    return (
        <div className='profile-teammer'>
            <BreadCrumb/>
            <Banner/>
            <div className="profile-wrapper">
                <div className="left-side">
                    <CardOwnerProfile
                        props={
                            {
                                isProfile: true,
                                full_name: props.userData?.full_name,
                                photo: props.userData.detail?.photo,
                                location: props.userData.detail?.location,
                                skills: props.userData?.skills,
                                positions: props.userData.positions,
                                year_of_experience: props.userData.detail?.years_of_experience,
                                about: props.userData?.detail?.about,
                            }
                        }
                    />
                    {/* <CardTeammerWorkExperience
                        workExperienceList={props.userData?.experiences}
                        editMode={true}
                        createModal={{
                            isOpen: isOpenCreateModal,
                            toggleFunc: toggleCreateModal,
                            title: "Add Work Experience"
                        }}
                    /> */}
                </div>
            </div>
            <h3 className="text-center my-4">My Startups</h3>
            <div className="startups">
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
                                                Choose startup <button><RiArrowRightLine/></button>
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
        </div>
    )
}

ProfileOwner.layout = true;

export default ProfileOwner;

export const getServerSideProps = async (context) => {
    const auth = getAuth(context);
    if (auth !== "1") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const fetchUserInfo =
        await getFetchData("auth/user?include=skills,positions,experiences,experiences.location,detail.location", getToken(context));

    const joinedProjectList = await getFetchData("users/projects?include=jobs", getToken(context));

    return {
        props: {
            userData: fetchUserInfo?.data,
            joinedProjectList: joinedProjectList,
        }
    }
}
