import React, {useState} from 'react'
import {Button, Input, InputGroup, Form} from 'rsuite';
import {useRouter} from "next/router";
import config from "../configuration";

function SearchHome({token , getData}) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const CustomInputGroupWidthButton = ({placeholder, ...props}) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} name="search"/>
            <Button type="submit" className="search-input-btn ml-1" onClick={toSearch}>
                Search
            </Button>
        </InputGroup>
    );
    const submit = async (event) => {
        let data = new FormData(event.target);
        let body = {};
        for (let [key, value] of data.entries()) {
            body[key] = value;
        }
            let link = body.search ? "search=" + body.search + "&include=project,type,position" : "include=project,type,position"
            let response = await fetch(config.BASE_URL + "jobs?" + link);
            let resData = await response.json();
            getData(resData.data.items)
    }
    const toSearch = (e) => {

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
