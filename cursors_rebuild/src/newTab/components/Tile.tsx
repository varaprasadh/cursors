/// <reference types="chrome"/>
import React, { useState, useEffect, Ref } from 'react'
import styled from 'styled-components';
import { preventSelectStyles } from '.';

import cursorIcon from "../../icons/cursor.png";

const TileContainer = styled.a`
    width: 100px;
    background-color: white;
    margin: 0.1rem;
    padding: 0.5rem  1rem;
    text-decoration: none;
    border-radius: 0.2rem;
    color: black;
    &:hover{
        background: #e6e8e8;
    };
    transition: scale 0.4s ease;
    &:active{
        transform: scale(0.9);
    }
    ${preventSelectStyles}
`;
const TileTitle = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1rem;
    padding: 0.1rem 0rem;
`;

const TileImage = styled.img`
    width: 2rem;
    height: 2rem;
    ${preventSelectStyles}
`

export default function Tile({ title, url, icon }: { title: string, url: string, icon: any }) {
    const imageRef: Ref<HTMLImageElement> = React.createRef();
    useEffect(() => {
        imageRef.current?.addEventListener('error', () => {
            imageRef.current?.removeEventListener('error', () => { });
            imageRef.current!.src = cursorIcon;
        });
        return () => {
            imageRef.current?.removeEventListener('error', () => { });
        }
    }, [])
    return (
        <TileContainer key={url} href={url}>
            <TileImage ref={imageRef} onError={e => (e.target as HTMLImageElement as any).src = { cursorIcon }} src={icon} alt={`tile-icon ${title}`} />
            <TileTitle title={title}>{title}</TileTitle>
        </TileContainer>
    )
}