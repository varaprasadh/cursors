/// <reference types="chrome"/>
// @ts-nocheck
import React, { useState, useReducer, useEffect } from 'react'
import { render } from 'react-dom';
import styled, { css } from 'styled-components';
import OutsideClickHandler from 'react-outside-click-handler';

import { Page } from "./components/index";

import SearchBar from './components/SearchBar';
import { TopSites } from './components/Tiles';
import SettingsWindow, { AuthorInfoWindow, InfoWindow } from './SettingsWindow';
import { AppContext, reducer, initialState } from './Context';
import { wallpapers, gifs, gradients, ASSET_TYPES } from "./backgroundAssets";
import { getObjectFromStorageSync } from '../helpers/storage';

const TopSection = styled.section`
  /* clock + setting icon on right */
  padding: 1rem;
  display: flex;
`;
const MiddleSection = styled.section`
    /* main search bar + top sites */
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BottomSection = styled.section`
    /* author + info */
    display: flex;
    justify-content: center;
`;


const Right = styled.div`
    margin-left: auto;
    justify-self: end;
    display: flex;
`;

const RoundedIcon = styled.div`
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.5rem;
    color: white;
    width: 1rem;
    height: 1rem;
    position: relative;
    transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:active{
        transform: scale(0.8);
    }
`;

const ActionButton = ({ icon, title, children }: any) => {
    const [open, setOpen] = useState(false);
    return (
        <OutsideClickHandler onOutsideClick={()=>setOpen(false)}>
        <div style={{position:'relative'}}>
            <RoundedIcon title={title} onClick={e=>setOpen(!open)}>
                {icon}
            </RoundedIcon>
            {open && children}
        </div>
        </OutsideClickHandler>

    )
};


const StyledBackgroundImage = styled.img<{src:any}>`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;
`;





const StyledBackgroundGradient = styled.div<{ gradient:any}>`
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;
    background: ${props => props.gradient};
`;

function getBackground({type, key}:{type:number,key:number}):any{
    switch(type){
        case ASSET_TYPES.IMAGE: 
          return wallpapers.find(i=>i.key===key);
         break;
        case ASSET_TYPES.GRADIENT: 
         return gradients.find(i=>i.key === key);
         break;
        case ASSET_TYPES.GIF: 
         return gifs.find(i=>i.key === key);
         break;
        default:
            return wallpapers.find(i=>true);
    }
}

function PageBackground({}){
    const [store, dispatch ]= React.useContext(AppContext as any);
   
    const { type, key } = store.appBackground;
    const { value } = getBackground({type,key})

    console.log({
        value
    })
    if(type === ASSET_TYPES.IMAGE){
        return (
            <StyledBackgroundImage src={value}/>
        )
    }
    if(type === ASSET_TYPES.GRADIENT){
        return <StyledBackgroundGradient gradient={value}/>
    }
    if(type === ASSET_TYPES.GIF){
        return <StyledBackgroundImage src={value} />
    }

    return null;
}

const AppTitle = styled.div`
    font-size: 4rem;
    color: #fff;
    text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 40px #0ff,
        0 0 80px #0ff;
`
const AuthorSlogan = styled.div`
    margin-bottom: 0.5rem;
    font-size: 1rem;
    background: #ffffff;
    padding: 0.2rem 1rem;
    filter: drop-shadow(-2px -4px 6px black inset);
    box-shadow: 7px -3px 20px 3px #00b8ff inset;
    border-radius: 0.2rem;
`

function NewTab() {
    const [store, dispatch] = useReducer(reducer, initialState);
    // ts-ignore
    useEffect(async () => {
        const { appBackground = { type:ASSET_TYPES.GIF, key:1 } } = await getObjectFromStorageSync();
        dispatch({
            type: 'SET_BACKGROUND',
            payload: {
                type: appBackground.type,
                key: appBackground.key
            }
        })
       return ()=> {

       }

    }, [])
    return ( 
        <AppContext.Provider value={[store, dispatch]}>
        <Page relative style={{background:'black'}}>
            <PageBackground/>
            <TopSection>
                <Right>  
                    <ActionButton icon={'❓'} title={'Settings'}>
                        <AuthorInfoWindow/>
                    </ActionButton>
                    <ActionButton icon={'ℹ️'} title={'Settings'}>
                        <InfoWindow/>
                    </ActionButton>
                    <ActionButton icon={'⚙️'} title={'Settings'}>
                        <SettingsWindow />
                    </ActionButton>
                </Right>
            </TopSection>
            <MiddleSection> 
                <div style={{ textAlign: 'center' }}>
                    <AppTitle>Cursors</AppTitle>
                    <SearchBar />
                    <TopSites />
                </div>
            </MiddleSection>
            <BottomSection>
                <AuthorSlogan>
                    Made With ❤ by <a href="https://www.linkedin.com/in/varaprasadh">Varaprasadh</a>
                </AuthorSlogan>
            </BottomSection>
        </Page>
        </AppContext.Provider>
    )
}

render(<NewTab />, document.getElementById("app")); 