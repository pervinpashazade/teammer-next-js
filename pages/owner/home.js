import {Button, Input, InputGroup, InputPicker, Dropdown, Pagination, Tag} from "rsuite";
import React, {useEffect, useState} from "react";
import CardTeammerProfile from "../../src/components/Profile/CardTeammerProfile";
import axios from "axios";
import config from "../../src/configuration";
import getAuth, {getToken} from "../../lib/session";
import {getFetchData} from "../../lib/fetchData";

const Home = ({project_types, experience_levels, skills, locations, items}) => {
    console.log(items);
    const [firstRender, setFirstRender] = useState(false)
    const [activePage, setActivePage] = useState(1);
    const [dropdown, setDropdown] = useState('8')
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
    }
    const CustomInputGroupWidthButton = ({placeholder, ...props}) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder}/>
            <InputGroup.Button className="search-input-btn">
                Search
            </InputGroup.Button>
        </InputGroup>
    );

    useEffect(async () => {
        if (firstRender) {
            let link = '';
            if (filter.project_types.length > 0) link = link + "&filter[position]=" + filter.project_types.toString();
            if (filter.skills.length > 0) link = link + "&filter[skill]=" + filter.skills.toString();
            if (filter.experience_levels.length > 0) link = link + "&filter[experience]=" + filter.experience_levels.toString();
            if (filter.locations.length > 0) link = link + "&filter[location]=" + filter.locations.toString();
            axios.get(config.BASE_URL +
                'teammers?include=detail,skills,positions,experiences,detail.location&per_page=' + dropdown + '&page=' + activePage + link)
                .then(res => {
                    setData(res.data.data)
                })
        }
        setFirstRender(true)
    }, [activePage, dropdown, filter]);
    const addToTeam = () => {

    }
    console.log(data)
    return <div className="owner-home">
        <div className="owner-banner">
            <h2>The best future <br/>
                Teammers are here 💫</h2>
        </div>
        <div className="home-search">
            <div className="wrapper">
                <CustomInputGroupWidthButton
                    size="lg"
                    placeholder="Search"
                    className="search-input"
                />
            </div>
        </div>
        <div className="row">
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
                    {

                    }
                    <div className="row">
                        {data.items.length > 0 &&
                        data.items.map(item => <div className="col-md-6"><CardTeammerProfile props={
                            {
                                full_name: item.full_name,
                                photo: item.detail.photo,
                                location: item.detail.location.name + " , " + item.detail.location.country_code,
                                skills: item.skills,
                                positions: item.positions,
                                year_of_experience: item.detail.years_of_experience,
                                bio_position: item.bio_position,
                                isProfile: true,
                                addToTeam : addToTeam()
                            }
                        } isProfile={false}/></div>)
                        }
                    </div>
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {/*<div className="col-6" style={{marginTop: "140px"}}><CardTeammerProfile isProfile={false}/></div>*/}
                    {
                        data.items.length === 0 && <div>
                            <h4 className="text-center">No results found 😐</h4>
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
    </div>


}
Home.layout = true;
export default Home

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
    const project_types = await axios.get(config.BASE_URL + "project/types");
    const experience_levels = await axios.get(config.BASE_URL + "experience-levels");
    const skills = await axios.get(config.BASE_URL + "skills");
    const locations = await axios.get(config.BASE_URL + "locations");
    const item = await getFetchData('teammers?include=detail,skills,positions,experiences,detail.location', getToken(context))
    console.log(item)
    return {
        props: {
            project_types: project_types.data.data.map(item => {
                return {label: item.name, value: item.id}
            }),
            experience_levels: experience_levels.data.data.map(item => {
                return {label: item.name, value: item.id}
            }),
            skills: skills.data.data.items.map(item => {
                return {label: item.name, value: item.id}
            }),
            locations: locations.data.data.items.map(item => {
                return {label: item.name, value: item.id}
            }),
            items: item.data,
        }
    }
}