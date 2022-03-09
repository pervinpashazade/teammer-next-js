import React, {useState} from 'react'
import { Button, Input, InputGroup , Form } from 'rsuite';

function SearchHome() {
    const [search , setSearch] = useState('');
    const CustomInputGroupWidthButton = ({ placeholder, ...props }) => (
        <InputGroup {...props} inside>
            <Input placeholder={placeholder} name="search"/>
            <Button type="submit" className="search-input-btn ml-1" onClick={toSearch}>
                Search
            </Button>
        </InputGroup>
    );
    const toSearch = () =>{

    }
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
