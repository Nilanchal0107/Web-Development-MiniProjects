import React from "react"
import Toggle from "./Toggle/index"
import { BsStar, BsStarFill } from "react-icons/bs"

export default function Star({ onChange }) {
    return (
        <Toggle onToggle={onChange}>
            <Toggle.Button>
                <Toggle.On>
                    <BsStarFill className="star filled" />
                </Toggle.On>
                <Toggle.Off>
                    <BsStar className="star" />
                </Toggle.Off>
            </Toggle.Button>
        </Toggle>
    )
}