import React from 'react'
import { Button, Input, InputGroup } from 'rsuite';
import {useSelector} from "react-redux";

function SearchHome() {

    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} />
            <InputGroup.Button className="search-input-btn">
                Search
            </InputGroup.Button>
        </InputGroup>
    );
    const store = useSelector(store => store)
    return (
        <div className="home-search">
            {
                <div className="wrapper">
                    <CustomInputGroupWidthButton
                        size="lg"
                        placeholder="Search"
                        className="search-input"
                    />
                    <div className="tags">
                        <Button className="btn-custom-outline mb-2 active" color="blue" appearance="primary">
                            Design
                        </Button>
                        <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">
                            Development
                        </Button>
                        <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">
                            Marketing
                        </Button>
                        <Button className="btn-custom-outline mb-2" color="blue" appearance="primary">
                            Branding
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchHome
