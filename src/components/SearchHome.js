import React, { useEffect, useState } from 'react'
import { Button, Input, InputGroup, Form } from 'rsuite';
import { useRouter } from "next/router";
import config, { NEXT_URL } from "../configuration";

function SearchHome({ token, getData }) {
    const [type, setType] = useState('')
    const [search, setSearch] = useState('');
    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} name="search" />
            <Button type="submit" className="search-input-btn ml-1">
                Search
            </Button>
        </InputGroup>
    );
    useEffect(async () => {
        const fetchType = await fetch(NEXT_URL + 'api/auth');
        const resType = await fetchType.json();
        setType(resType.user?.type)
    }, [])
    const submit = async (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }
        var link;
        if (type === "1") {
            link = "teammers?" + (body.search ? "search=" + body.search + "&include=project,type,position" :
                "include=project,type,position")
        } else
            link = "jobs?" + (body.search ? "search=" + body.search + "&include=project,type,position" :
                "include=project,type,position")
        let response = await fetch(config.BASE_URL + link);
        let resData = await response.json();
       resData.data.items ? getData(resData.data.items) : getData([]);
       return;
    }
    return (
        <div className="home-search">
            {
                <div className="wrapper">
                    <Form onSubmit={(bool, event) => submit(event)}>
                        <CustomInputGroupWidthButton
                            size="lg"
                            placeholder="Search"
                            className="search-input"
                        />
                    </Form>
                    {/*<div className="tags">*/}
                    {/*    <Button className="btn-custom-outline mb-2 active" color="blue" appearance="primary">*/}
                    {/*        Design*/}
                    {/*    </Button>*/}
                    {/*    <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">*/}
                    {/*        Development*/}
                    {/*    </Button>*/}
                    {/*    <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">*/}
                    {/*        Marketing*/}
                    {/*    </Button>*/}
                    {/*    <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">*/}
                    {/*        Branding*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            }
        </div>
    )
}

export default SearchHome
