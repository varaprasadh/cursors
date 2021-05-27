/// <reference types="chrome"/>
import React, { useState,useEffect } from 'react'
import { render } from 'react-dom';
import styled from 'styled-components';
import { arrayBufferToBase64 } from '../helpers';
import { getObjectFromStorageLocal } from '../helpers/storage';

import { Page } from "./components/index";

const dummySites = [
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    },
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    },
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    },
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    },
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    },
    {
        title: "google.com",
        url: "www.google.com",
        icon: null
    }
]

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
`

const Right = styled.div`
    margin-left: auto;
    justify-self: end;
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
    background-color: #040e16;
    width: 1rem;
    height: 1rem;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover{
        background-color: #091722;
    }
`;


const TopSitesContainer = styled.div`
    display: flex;
    width: 600px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

const TopSiteCard = styled.a`
    width: 100px;
    background-color: white;
    filter: drop-shadow(2px 2px 1px black);
    margin: 0.1rem;
    padding: 0.2rem;
    text-decoration: none;
    border-radius: 0.2rem;
`;
const TopSiteTitle = styled.div`

`;


const ActionButton = ({icon,title}:any) => {
    return (
        <RoundedIcon title={title}>
            {icon}
        </RoundedIcon>
    )
};

const StyledSearchBar = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: white;
    filter: drop-shadow(1px 1px 2px #d8dada);
    border-radius: 0%.2rem;
`
const StyledInput = styled.input`
    flex: 1;
    border: none;
    &:focus{
        outline: none;
    }
`
const StyledSearchIcon = styled.img`
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    transition: all 0.1s ease;
    &:active{
        transform: scale(0.8);
    }
`;


const SearchBar = ({}) => {
    const [queryText, setQueryText] = useState('');

    return (
        <StyledSearchBar>
            <StyledInput type="text" value={queryText} onChange={e=>setQueryText(e.target.value)}/>
            <StyledSearchIcon src={"./images/search_icon.png"} alt="search"/>
        </StyledSearchBar>
    ); 
}

const TopSites = ({}) => {


    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    function TopSite ({ title, url, icon }:{ title:string,url:string, icon:any }) {
            return (
                <TopSiteCard key={url} href={url}>
                    <img src="" alt=""/>
                    <TopSiteTitle>{title}</TopSiteTitle>
                </TopSiteCard>
            )
    }
    useEffect(()=>{
        
        // chrome.topSites.get(async topSites => {
        //     topSites = topSites.slice(0, 8);
          
        //     const _sites:Array<any> = [];

        //     topSites.forEach( async site => {
        //         console.log(site);
        //         const _site = {
        //             title: site.title,
        //             url: site.url,
        //             icon: null
        //         };
        //         _sites.push(_site);
        //     })
        //     setSites(_sites as any);
        //     setLoading(false);
        // });
            setSites(dummySites as any);
            setLoading(false);
    }, [])
    if(loading){
        return <div>loading...</div>
    }
    return (
        <TopSitesContainer>
            {
                sites.map((site:any) => (
                    <TopSite title={site.title} url={site.url} icon={null}/>
                ))
            }
        </TopSitesContainer>
    )
}

function NewTab() {
    return (
       <Page>
           <TopSection>
                <div>clock</div>
               <Right>
                    <ActionButton icon={'⚙'} title={'Settings'}></ActionButton>
               </Right>
           </TopSection>
           <MiddleSection>
               <div style={{textAlign:'center'}}>
                    <SearchBar/>
                    <TopSites/>
               </div>
           </MiddleSection>
           <BottomSection>

           </BottomSection>
       </Page>
    )
}

render(<NewTab />, document.getElementById("app"));
