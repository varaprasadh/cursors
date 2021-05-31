/// <reference types="chrome"/>
// @ts-nocheck
import React, { useState, useEffect, Ref, ReactChildren, createRef } from 'react'
import styled, { css } from 'styled-components';

import { wallpapers, gifs, gradients, ASSET_TYPES } from "./backgroundAssets"
import { preventSelectStyles } from './components';
import { AppContext } from './Context';

import myPhoto from "../icons/vara.jpeg";

const WindowContainer = styled.div`
   position: absolute;
   top: 100%;
   right: 20%;
   background-color: white;
   border-radius: 0.2rem;
`;

const StyledPanel = styled.div`
    min-width: 200px;
`;
const StyledPanelHeader = styled.div`
    font-weight: bold;
    background: #ebf7f7;
    padding: 0.5rem 1rem;
    border: 1px solid #929191;
    position: relative;
    cursor: pointer;
    ${preventSelectStyles};
    ${props => props.showToggleIcon && css`
        &:after,
        &:before {
            content: '';
            position: absolute;
            right: 25px;
            top: 50%;
            width: 22px;
            height: 2px;
            margin-top: -2px;
            background-color: #372717;
        };
        &:before {
            transform:  ${props => props.expanded ? 'rotate(deg)' : 'rotate(-90deg)'} ;
            transition: transform 0.35s cubic-bezier(0.65, 0.05, 0.36, 1);
        };
    `}

`;

const PanelBody = styled.div`
  overflow: hidden;
  will-change: height;
  transition: height 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
`

function Panel({ title, canToggle = true, children }: { title: any, children:any}){
    const [open, setOpen] = useState(true);
    const [height, setHeight] = useState(0);
    const ref = createRef();

    useEffect(()=>{
        // @ts-ignore file
        let timer = setTimeout(()=>{
            const height = ref.current.scrollHeight;
            setHeight(height);
        },100);

        return ()=>clearTimeout(timer);

    },[]);

    return (
        <StyledPanel>
            <StyledPanelHeader 
                showToggleIcon={canToggle}
                expanded={open}
                onClick={() => canToggle && setOpen(!open)}
            >
                <div>{title}</div>
            </StyledPanelHeader>
            <PanelBody
                ref={ref}
                style={{ height: `${open ?height : 0}px` }}
            >
                {children}
            </PanelBody>
        </StyledPanel>
    )
}

const StyledGradientOptionWrapper = styled.div`
    width: 5rem;
    height: 3rem;
    margin: 0.2rem;
    cursor: pointer;
    background: ${props => props.gradient};
    box-sizing: border-box;
    &:hover{
        border: 2px solid #000000;
    };
    ${preventSelectStyles}
`;
const StyledImageOptionWrapper = styled.img`
    width: 5rem;
    height: 3rem;
    margin: 0.2rem;
    cursor: pointer;
    box-sizing: border-box;
    &:hover{
        border: 2px solid #000000;
    };
    ${preventSelectStyles}
`;

function GradientOption({ gradient , onClick }){
    return  (
        <StyledGradientOptionWrapper gradient={gradient} onClick={onClick}>
            {/*  */}
        </StyledGradientOptionWrapper>
    )
};

function ImageOption({ source, onClick }){
    return  (
        <StyledImageOptionWrapper src={source} onClick={onClick}>
            {/*  */}
        </StyledImageOptionWrapper>
    )
};




const GradientsContainer = styled.div`
    margin: 0.5rem 0rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export default function SettingsWindow(){
    const [store, dispatch] = React.useContext(AppContext as any);
    const setBackground = (type, key) => {
        console.log("click click");
        dispatch({
            type:'SET_BACKGROUND',
            payload: {
                type,
                key
            }
        })
    }
    return (
        <WindowContainer>
            <Panel title={"Backgrounds"}>
                <GradientsContainer>
                    {
                        gradients.map(({ value, key }) => {
                            return (
                                <GradientOption 
                                    key={key} 
                                    gradient={value} 
                                    onClick={() => setBackground(ASSET_TYPES.GRADIENT, key)}
                                />
                            )
                        })
                    }
                </GradientsContainer>
            </Panel> 
            <Panel title={"Wallpapers"}>
                <GradientsContainer>
                    {
                        wallpapers.map(({ value, key }) => {
                            return (
                                <ImageOption 
                                    key={key} 
                                    source={value} 
                                    onClick={() => setBackground(ASSET_TYPES.IMAGE, key)}
                                />
                            )
                        })
                    }
                </GradientsContainer>
            </Panel> 
            <Panel title={"Gif"}>
                <GradientsContainer style={{padding:'0rem 1rem', justifyContent:'start'}}>
                    {
                        gifs.map(({ value, key }) => {
                            return (
                                <ImageOption 
                                    key={key} 
                                    source={value} 
                                    onClick={() => setBackground(ASSET_TYPES.GIF, key)}
                                />
                            )
                        })
                    }
                </GradientsContainer>
            </Panel> 
            <Panel title={"What's next ?"}>
                    <ul style={{paddingLeft:'2rem', lineHeight:'1.5rem'}}>
                        <li>More Gifs 🙋‍♂️  </li>
                        <li>Custom cursors 😋</li>
                        <li>Custom background! 🌈 </li>
                    </ul>
            </Panel> 
        </WindowContainer>
    )
}


export function InfoWindow(){
    return (
        <WindowContainer>
            <Panel title={"📃 About"} canToggle={false}>
                <p style={{padding:'0.5rem 1rem', lineHeight:'1.5rem'}}>
                    📣 This Extension is made for my lovely college <b>ANITS</b> on the occasion of yearly college festival 
                    named <b>"Cursors"</b> which is organized by 🖥 CSE department 
                    on <b>🕗2019 March.</b>
                    <br/>
                    <br/>
                    <strong>👋Thank You!</strong>
                </p>
            </Panel>
        </WindowContainer>
    )
}
export function AuthorInfoWindow(){
    const socialLinks = {
        instagram: "https://www.instagram.com/i_varaprasadh/",
        linkedin: "https://www.linkedin.com/in/varaprasadh"
    }
     
    return (
        <WindowContainer>
            <Panel title={"🔯 About Me"} canToggle={false}>
                <div style={{display:'flex', padding:"0.5rem 1rem"}}>
                    <img src={myPhoto} alt="varaprasadh's photo" style={{width:'8rem'}}/>
                    <div style={{marginLeft:'0.2rem',minWidth: "200px", lineHeight:'1.2rem'}}>
                        👋Hi! I'm <strong>Varaprasadh</strong>, most of the people calls me 
                        <strong><i>Vara.</i> </strong> I'm self-taught programmer(in my point of view 😜).
                        <br/>
                        if you want to talk with me then,
                        you can contact me through <strong><a href={socialLinks.linkedin}> LinkedIn</a></strong>
                        &nbsp;Or <strong><a href={socialLinks.instagram}>Instagram</a></strong>
                    </div>
                </div>
            </Panel>
        </WindowContainer>
    )
}