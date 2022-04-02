import { Button, Input, InputGroup, InputPicker, Dropdown, Pagination, Tag, toaster, Notification } from "rsuite";
import React, { useEffect, useState } from "react";
import CardTeammerProfile from "../../src/components/Profile/CardTeammerProfile";
import axios from "axios";
import config from "../../src/configuration";
import getAuth, { getId, getToken } from "../../lib/session";
import { getFetchData } from "../../lib/fetchData";
import { Modal } from 'rsuite';
import { useCookie, withCookie } from "next-cookie";
import SearchHome from "../../src/components/SearchHome";

const Home = (props) => {

    const {
        project_types,
        experience_levels,
        skills,
        locations,
        items,
        projects,
        id,
        cookie
    } = props;

    const project = projects.data.items.map(item => {
        return {
            label: item.title,
            value: item.id
        }
    });

    const cookies = useCookie(cookie)
    const [open, setOpen] = useState(false);
    const [teammerId , setTeammerId] = useState('')
    const [teammerName, setTeammerName] = useState('')
    const [firstRender, setFirstRender] = useState(false)
    const [activePage, setActivePage] = useState(1);
    const [dropdown, setDropdown] = useState('8');
    const [jobName, setJobName] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [startupName, setStartUpName] = useState('')
    const [filter, setFilter] = useState({
        project_types: [],
        experience_levels: [],
        skills: [],
        locations: []
    });

    const [data, setData] = useState(items)
    const filterFuncation = (key, e, type) => {
        let array = filter[key];
        if (type === "add") {
            if (!array.some(item => item === e))
                array = [...array, e];
        } else {
            array = array.filter(item => item !== e)
        }
        setFilter({
            ...filter,
            [key]: array
        })
    };

    const getJobs = async (e) => {
        if (e) {
            let res = await getFetchData("users/projects?include=jobs.position", cookies.get('teammers-access-token'));
            setJobs(res.data.items.find(item => item.id === e).jobs.map(item => {
                return {
                    label: item.position.name,
                    value: item.id
                }
            }))
            setStartUpName(e)
        } else {
            setJobs([]);
            setStartUpName('')
        }
    };

    const submitAddToTeam = async () => {
        if (id) {
            axios.post(config.BASE_URL + "jobs/" + jobName + "/add-to-team", {
                id: teammerId
            }).then(res => {
                console.log('adks')
                toaster.push(
                    <Notification type={"success"} header="Success!" closable>
                        New Teammer added!
                    </Notification>, 'topEnd'
                );
                setOpen(!open);
                setJobName(0);
                setJobs([]);
                setTeammerId('');
                setStartUpName('');
            }).catch(error => {
                toaster.push(
                    <Notification type={"error"} header="Warning!" closable>
                        {error.response.data.message}
                    </Notification>, 'topEnd'
                );
            })
        }
    }
    const getData = () => {
        let link = '';
        if (filter.project_types.length > 0) link = link + "&filter[position]=" + filter.project_types.toString();
        if (filter.skills.length > 0) link = link + "&filter[skill]=" + filter.skills.toString();
        if (filter.experience_levels.length > 0) link = link + "&filter[experience]=" + filter.experience_levels.toString();
        if (filter.locations.length > 0) link = link + "&filter[location]=" + filter.locations.toString();
        axios.get(config.BASE_URL +
            'teammers?include=detail,skills,positions,experiences,detail.location&per_page=' + dropdown + '&page=' + activePage + link)
            .then(res => {
                setData(res.data.data.items)
            });
    };

    useEffect(async () => {
        if (firstRender) {
            getData();
        }
        setFirstRender(true)
    }, [activePage, dropdown, filter]);

    const addToTeam = (data , id) => {
        setTeammerId(id)
        setTeammerName(data);
        setOpen(!open);
    };

    return (
        <div className="owner-home">
            <div className="owner-banner">
                <h2>The best future <br />
                    Teammers are here 💫</h2>
            </div>
            <div className="home-search">
                <div className="wrapper">
                    {/*<CustomInputGroupWidthButton*/}
                    {/*    size="lg"*/}
                    {/*    placeholder="Search"*/}
                    {/*    className="search-input"*/}
                    {/*/>*/}
                    <SearchHome getData={setData} />
                </div>
            </div>
            <div className="row">
                {/* filters */}
                <div className="col-md-4">
                    <InputPicker
                        size="lg"
                        data={project_types}
                        value={filter.project_types}
                        onChange={(e) => filterFuncation('project_types', e, 'add')}
                        placeholder="Fields"
                        className="w-100"
                    />
                    {
                        filter.project_types.length > 0 && filter.project_types.map((item, index) => {
                            return <Tag key={index}
                                onClose={() => {
                                    filterFuncation('project_types', item, 'remove')
                                }
                                } closable
                                className="close-tag my-2">{project_types.find(i => i.value === item)?.label}</Tag>
                        })
                    }
                    <InputPicker
                        size="lg"
                        data={experience_levels}
                        value={filter.experience_levels}
                        onChange={(e) => filterFuncation('experience_levels', e, 'add')}
                        placeholder="Experience"
                        className="w-100 mt-2"
                    />
                    {
                        filter.experience_levels.length > 0 && filter.experience_levels.map((item, index) => {
                            return <Tag key={index}
                                onClose={() => {
                                    filterFuncation('experience_levels', item, 'remove')
                                }
                                } closable
                                className="close-tag my-2">{experience_levels.find(i => i.value === item)?.label}</Tag>
                        })
                    }
                    <InputPicker
                        size="lg"
                        data={skills}
                        value={filter.skills}
                        onChange={(e) => filterFuncation('skills', e, 'add')}
                        placeholder="Skilss"
                        className="w-100 mt-2"
                    />
                    {
                        filter.skills.length > 0 && filter.skills.map((item, index) => {
                            return <Tag key={index}
                                onClose={() => {
                                    filterFuncation('skills', item, 'remove')
                                }
                                } closable
                                className="close-tag my-2">{skills.find(i => i.value === item)?.label}</Tag>
                        })
                    }
                    <InputPicker
                        size="lg"
                        data={locations}
                        value={filter.locations}
                        onChange={(e) => filterFuncation('locations', e, 'add')}
                        placeholder="Location"
                        className="w-100 mt-2"
                    />
                    {
                        filter.locations.length > 0 && filter.locations.map((item, index) => {
                            return <Tag key={index}
                                onClose={() => {
                                    filterFuncation('locations', item, 'remove')
                                }
                                } closable
                                className="close-tag my-2">{locations.find(i => i.value === item)?.label}</Tag>
                        })
                    }
                </div>
                {/* content */}
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <h5>🤖 Find your teammates</h5>
                            <Dropdown placement="bottomEnd" title={"Show users : " + dropdown}>
                                <Dropdown.Item onClick={() => setDropdown('8')}>8</Dropdown.Item>
                                <Dropdown.Item onClick={() => setDropdown('16')}>16</Dropdown.Item>
                                <Dropdown.Item onClick={() => setDropdown('24')}>24</Dropdown.Item>
                                <Dropdown.Item onClick={() => setDropdown('32')}>32</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {data.length > 0 ?
                            data.map(item => {
                                return <div className="col-md-12 col-lg-6 mb-5">
                                    <CardTeammerProfile
                                        isProfile={false}
                                        props={
                                            {
                                                viewProfileLink: true,
                                                id: item.id,
                                                full_name: item.full_name,
                                                photo: item.detail.photo,
                                                location: item.detail.location.name + " , " + item.detail.location.country_code,
                                                skills: item.skills,
                                                positions: item.positions,
                                                year_of_experience: item.detail.years_of_experience,
                                                bio_position: item.bio_position,
                                                isProfile: false,
                                                isTop: true,
                                                addToTeam: addToTeam
                                            }
                                        }
                                    />
                                </div>
                            }) :
                            <div className="col-md-12 text-center">
                                <h4>No results found 😐</h4>
                            </div>
                        }
                    </div>
                    <Pagination
                        prev
                        last
                        next
                        first
                        size="xs"
                        total={data.total}
                        limit={1}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </div>
            </div>
            <Modal open={open} onClose={() => {
                setOpen(!open);
                setTeammerId('')
            }}>
                <Modal.Header>
                    <Modal.Title>Add to team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to add <strong>{teammerName}</strong> to your Team?</p>
                    <InputPicker
                        size="lg"
                        data={project}
                        onChange={(e) => getJobs(e)}
                        placeholder="Name of Startup"
                        className="w-100"
                    />
                    <InputPicker
                        size="lg"
                        disabled={jobs.length === 0}
                        data={jobs}
                        value={jobName}
                        onChange={(e) => setJobName(e)}
                        placeholder="Position"
                        className="w-100 mt-3"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setOpen(!open);
                        setTeammerId('')
                    }} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={() => submitAddToTeam()} appearance="primary" disabled={!jobName}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

Home.layout = true;

export default Home;

export const getServerSideProps = async (context) => {
    // const auth = getAuth(context);
    const id = getId(context);
    // if (auth !== "1") {
    //     return {
    //         redirect: {
    //             destination: "/login",
    //             permanent: false,
    //         },
    //     };
    // }
    const project_types = await getFetchData("project/types", getToken(context));
    const experience_levels = await getFetchData("experience-levels", getToken(context));
    const skills = await getFetchData("skills", getToken(context));
    const locations = await getFetchData("locations", getToken(context));
    const projects = await getFetchData("users/projects", getToken(context));

    const item = await getFetchData('teammers?include=detail,skills,positions,experiences,detail.location', getToken(context))
    return {
        props: {
            project_types: project_types.data.map(item => {
                return { label: item.name, value: item.id }
            }),
            experience_levels: experience_levels.data.map(item => {
                return { label: item.name, value: item.id }
            }),
            skills: skills.data.items.map(item => {
                return { label: item.name, value: item.id }
            }),
            locations: locations.data.items.map(item => {
                return { label: item.name, value: item.id }
            }),
            projects: projects,
            items: item.data.items,
            id: id ? id : null,
            token: getToken(context),
            cookie: context.req.headers.cookie || ''
        }
    }
}