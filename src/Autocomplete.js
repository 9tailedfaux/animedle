import React, { Component } from "react";
import {getSearchResults} from "./api";

export class Autocomplete extends Component {
    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    }

    onChange = (e) => {
        console.log('onChanges')

        const userInput = e.currentTarget.value

        this.setState({
            userInput
        })

        getSearchResults(1, userInput)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    activeOption: 0,
                    filteredOptions: res.data.Page.media,
                    showOptions: true,
                })
            })
    }

    onClick = (e) => {
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: e.currentTarget.innerText
        })
    }

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showOptions: false,
                userInput: filteredOptions[activeOption]
            })
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return
            }
            this.setState({ activeOption: activeOption - 1 })
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                console.log(activeOption)
                return
            }
            this.setState({ activeOption: activeOption + 1 })
        }
    }
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeOption, filteredOptions, showOptions, userInput
            }
        } = this
        let optionList
        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className={"options"}>
                        {filteredOptions.map((option, index) => {
                            let className
                            if (index === activeOption) {
                                className = 'option-active'
                            }
                            return (
                                <li className={className} key={option.id} onClick={onClick}>
                                    {option.title.userPreferred}
                                </li>
                            )
                        })}
                    </ul>
                )
            }
        } else {
            optionList = (
                <div className={"no-options"}>
                    <em>No results</em>
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className={"search"}>
                    <input
                        type={"text"}
                        className={"search-box"}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                    <input type={"submit"} value={""} className={"search-btn"}/>
                    {optionList}
                </div>
            </React.Fragment>
        )
    }
}

export default Autocomplete